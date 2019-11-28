import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload, faEnvelope, faExternalLinkAlt, faMapMarked, faSitemap, faCalendar, faClock } from '@fortawesome/free-solid-svg-icons'
import { NotificationManager } from 'react-notifications'
import uuidv4 from 'uuid/v4'
import { useTranslation } from 'react-i18next'
import { navigate } from "@reach/router"
import { connect } from 'react-redux'
// OPTIMIZE IMPORTS
import * as turf from '@turf/turf'
import * as firebase from 'firebase'
import Header from './Components/Header'
import ImagePreview from './Components/ImagePreview'
import FileName from './Components/FileName'
import AskRegistration from './Components/AskRegistration'

const mapStateToProps = state => ({
    selected: state.selected,
    user: state.user,
    events: state.events
})

const Event = props => {

    // Hooks
    const { t } = useTranslation('general', { useSuspense: false }),
        [name, setName] = useState(''),
        [date, setDate] = useState(''),
        [image, setImage] = useState(null),
        [schedule, setSchedule] = useState(''),
        [place, setPlace] = useState(''),
        [description, setDescription] = useState(''),
        [link, setLink] = useState(''),
        [email, setEmail] = useState(''),
        [organizer, setOrganizer] = useState(''),
        [terms, setTerms] = useState(false),
        [geometry, setGeometry] = useState([0, 0]),
        [progress, setProgress] = useState(false)

    const feature = props.events.features.find(feature => feature.properties.id === props.id)
    useEffect(() => {
        let data
        if (feature) {
            data = feature
        }
        else if (props.selected && props.id === props.id) {
            data = props.selected
        }
        if (data) {
            setName(data.properties.name || '')
            setDate(data.properties.date || '')
            setImage(data.properties.image || null)
            setPlace(data.properties.place || '')
            setDescription(data.properties.description || '')
            setLink(data.properties.link || '')
            setEmail(data.properties.email || '')
            setOrganizer(data.properties.organizer || '')
            setGeometry(data.geometry.coordinates)
        }
    }, [feature, props.selected])

    const saveData = (uid, ref, data) => {
        if (uid) {
            return ref.doc(uid).update(data)
        }
        else {
            return ref.add(data)
        }
    },
        submitData = async event => {
            event.preventDefault();
            try {
                setProgress(true)
                const storageRef = firebase.storage().ref().child(`image/${uuidv4()}`),
                    databaseRef = firebase.firestore().collection(`events`),
                    properties = {
                        name: name,
                        organizer: organizer,
                        description: description.length > 0 ? description.replace(/\r?\n/g, '<br/>') : '',
                        email: email,
                        creatorUID: props.user.uid,
                        date: new Date(date).toISOString(),
                        schedule: schedule,
                        place: place,
                        link: link
                    }

                let data

                if (image) {
                    switch (typeof image) {
                        case 'string':
                            data = turf.point(props.selected.geometry.coordinates, { ...properties, image: image })
                            break;
                        case 'object':
                            const upload = await storageRef.put(image),
                                url = await upload.ref.getDownloadURL()
                            data = turf.point(props.selected.geometry.coordinates, { ...properties, image: url })
                            break;
                    }
                }
                else {
                    data = turf.point(geometry, properties)
                }
                await saveData(false, databaseRef, data)
                setProgress(false)
                NotificationManager.success(t('eventsForm.eventSuccess'))
            }
            catch (error) {
                console.error(error)
                setProgress(false)
                NotificationManager.error(t('eventsForm.eventError'))
            }
            finally {
                navigate('/')
            }
        },
        clearData = () => {
            setName('')
            setDate('')
            setImage(null)
            setSchedule('')
            setPlace('')
            setDescription('')
            setLink('')
            setEmail('')
            setOrganizer('')
            setTerms(false)
            setProgress(false)
        }

    if (props.user) {
        return (
            <div className="modal is-active animated fadeIn faster">
                <div className="modal-background" onClick={() => navigate('/')}></div>
                <form className="modal-card" onSubmit={submitData}>
                    <Header type={'Event'}/>
                    <section className="modal-card-body">
                        <div className="field">
                            <label className="label">{t('eventsForm.nameTitle')}</label>
                            <div className="control is-expanded">
                                <input required className="input" type="text" placeholder={t('eventsForm.namePlaceholder')} value={name} onChange={e => setName(e.target.value)} />
                            </div>
                        </div>

                        <div className="columns is-vcentered">
                            <div className="column">
                                <div className="field">
                                    <div className="control is-expanded has-icons-left">
                                        <input className="input" type="email" placeholder={t('eventsForm.emailPlaceholder')} value={email} onChange={e => setEmail(e.target.value)} />
                                        <span className="icon is-small is-left">
                                            <FontAwesomeIcon icon={faEnvelope} />
                                        </span>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control is-expanded has-icons-left">
                                        <input className="input" type="url" placeholder={t('eventsForm.linkPlaceholder')} value={link} onChange={e => setLink(e.target.value)} />
                                        <span className="icon is-small is-left">
                                            <FontAwesomeIcon icon={faExternalLinkAlt} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="column">
                                <ImagePreview file={image} />
                                <hr className="is-invisible" />
                                <div className="file has-name is-boxed columns is-centered">
                                    <label className="file-label">
                                        <input className="file-input" type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} />
                                        <span className="file-cta">
                                            <span className="file-icon">
                                                <FontAwesomeIcon icon={faUpload} />
                                            </span>
                                            <span className="file-label">
                                                Elige una imagen
                                           </span>
                                        </span>
                                        <FileName file={image} />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">{t('eventsForm.descriptionTitle')}</label>
                            <div className="control">
                                <textarea required className="textarea" placeholder={t('eventsForm.descriptionPlaceholder')} value={description} onChange={e => setDescription(e.target.value)}></textarea>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="field column">
                                <label className="label">{t('eventsForm.placeTitle')}</label>
                                <div className="control has-icons-left is-expanded">
                                    <input required className="input" type="text" placeholder={t('eventsForm.placePlaceholder')} value={place} onChange={e => setPlace(e.target.value)} />
                                    <span className="icon is-small is-left">
                                        <FontAwesomeIcon icon={faMapMarked} />
                                    </span>
                                </div>
                            </div>
                            <div className="field column">
                                <label className="label">{t('eventsForm.organizerTitle')}</label>
                                <div className="control has-icons-left is-expanded">
                                    <input className="input" type="text" placeholder={t('eventsForm.organizerPlaceholder')} value={organizer} onChange={e => setOrganizer(e.target.value)} />
                                    <span className="icon is-small is-left">
                                        <FontAwesomeIcon icon={faSitemap} />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="field column">
                                <label className="label">{t('eventsForm.dateTitle')}</label>
                                <div className="control has-icons-left is-expanded">
                                    <input required type="date" className="input" value={date} onChange={e => setDate(e.target.value)} />
                                    <span className="icon is-small is-left">
                                        <FontAwesomeIcon icon={faCalendar} />
                                    </span>
                                </div>
                            </div>
                            <div className="field column">
                                <label className="label">{t('eventsForm.scheduleTitle')}</label>
                                <div className="control has-icons-left is-expanded">
                                    <input className="input" type="time" placeholder={t('eventsForm.schedulePlaceholder')} value={schedule} onChange={e => setSchedule(e.target.value)} />
                                    <span className="icon is-small is-left">
                                        <FontAwesomeIcon icon={faClock} />
                                    </span>
                                </div>
                                <div className="control has-icons-left is-expanded">
                                    <input className="input" type="time" placeholder={t('eventsForm.schedulePlaceholder')} value={schedule} onChange={e => setSchedule(e.target.value)} />
                                    <span className="icon is-small is-left">
                                        <FontAwesomeIcon icon={faClock} />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <label className="checkbox">
                                    <input type="checkbox" required defaultChecked={terms} onChange={e => setTerms(e.target.checked)} />
                                    {` `}Acepto los <a target="_blank" rel="noopener noreferrer" href="https://www.uma.es/secretariageneral/newsecgen/index.php?option=com_content&view=article&id=259:reglamento-de-proteccion-de-datos-de-caracter-personal-de-la-universidad-de-malaga&catid=13&Itemid=124">términos y condiciones</a> y permito que mis datos aparezcan en la web
                                </label>
                            </div>
                        </div>
                    </section>
                    <footer className="modal-card-foot buttons is-centered">
                        <div className="field is-grouped">
                            <div className="control">
                                <button type='submit' className={`button is-primary ${progress ? 'is-loading' : ''}`}>{t('eventsForm.send')}</button>
                            </div>
                            <div className="control">
                                <button type="reset" className={`button is-text ${progress ? 'is-loading' : ''}`} onClick={clearData}>{t('eventsForm.clear')}</button>
                            </div>
                        </div>
                    </footer>
                </form>
            </div>
        )
    }

    else return <AskRegistration type='Event'/>

}

export default connect(
    mapStateToProps,
    null
)(Event)