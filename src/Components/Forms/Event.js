import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload, faEnvelope, faExternalLinkAlt, faMapMarked, faSitemap, faCalendar } from '@fortawesome/free-solid-svg-icons'
import { NotificationManager } from 'react-notifications'
import uuidv4 from 'uuid/v4'
import { useTranslation } from 'react-i18next'
import { navigate } from "@reach/router"
import { connect } from 'react-redux'
// OPTIMIZE IMPORTS
import * as turf from '@turf/turf'
import * as firebase from 'firebase'

import { store, selectActivity, addActivity } from '../../redux/store'

const mapStateToProps = state => ({
    selected: state.selected,
    user: state.user,
    categories: state.categories_activities,
    events: state.events
})


const FileName = props => {
    if (props.file) return <span className="file-name"> {props.file.name} </span>

    else return null
},
    ImagePreview = props => {
        if (props.file) return <picture className="image is-128by128 animated zoomIn faster"><img src={URL.createObjectURL(props.file)} alt={props.file.name} /></picture>
        else return null
    }

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
        [progress, setProgress] = useState(false)

    const feature = props.events.features.find(feature => feature.properties.id === props.id)
    useEffect(() => {
        if (feature) {
            const data = feature.properties
            setName(data.name || '')
            setDate(data.date || '')
            setImage(data.image || null)
            setPlace(data.place || '')
            setDescription(data.description || '')
            setLink(data.link || '')
            setEmail(data.email || '')
            setOrganizer(data.organizer || '')
        }
    }, [feature])

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
            location = [0,0],
            properties = {
                name: name,
                organizer: organizer,
                description: description.length > 0 ? description.replace(/\r?\n/g, '<br/>') : '',
                email: email,
                creatorUID: props.user.uid,
                date: new Date(date).toISOString()
            },
            data = turf.point(location, properties)

            await saveData(null, databaseRef, data)

            NotificationManager.success('Evento creado con éxito.')
            
        }
        catch (error) {
            console.error(error)
            NotificationManager.error('Ha ocurrido un error al crear el evento.')
        }
        finally {
            navigate('/')
        }
    },
        clearData = () => {

        }

    if (props.user) {
        return (
            <div className="modal is-active animated fadeIn faster">
                <div className="modal-background" onClick={() => navigate('/')}></div>
                <form className="modal-card" onSubmit={submitData}>
                    <header className="modal-card-head">
                        <h2 className="modal-card-title is-size-5 has-text-weight-light">{t('addAnEvent')}</h2>
                        <button className="delete" onClick={() => navigate('/')}></button>
                    </header>

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
                                <label className="label">{t('eventsForm.organizerTitle')}</label>
                                <div className="control has-icons-left is-expanded">
                                    <input className="input" type="text" placeholder={t('eventsForm.organizerPlaceholder')} value={organizer} onChange={e => setOrganizer(e.target.value)} />
                                    <span className="icon is-small is-left">
                                        <FontAwesomeIcon icon={faSitemap} />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>
                    <footer className="modal-card-foot buttons is-centered">
                        <div className="field is-grouped">
                            <div className="control">
                                <button type='submit' className={`button is-primary ${progress ? 'is-loading' : ''}`}>Enviar</button>
                            </div>
                            <div className="control">
                                <button type="reset" className={`button is-text ${progress ? 'is-loading' : ''}`} onClick={clearData}>Borrar</button>
                            </div>
                        </div>
                    </footer>
                </form>
            </div>
        )
    }

    else {
        return (
            <div className="modal is-active animated fadeIn faster">
                <div className="modal-background" onClick={() => navigate('/')}></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <h2 className="modal-card-title is-size-5 has-text-weight-light">Regístrate</h2>
                        <button className="delete" onClick={() => navigate('/')}></button>
                    </header>

                    <section className="modal-card-body">
                        <p className="is-size-6 has-text-centered has-text-weight-bold">Debes de estar registrado para añadir una actividad</p>
                    </section>

                    <footer className="modal-card-foot buttons is-centered">
                        <div className="field is-grouped">
                            <div className="control">
                                <button className='button is-primary' onClick={() => {
                                    navigate('/')
                                    NotificationManager.info('Tu actividad NO ha sido registrada. Creala de nuevo si quieres añadirla a nuestra base de datos')
                                }}>Cerrar</button>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        )
    }

}

export default connect(
    mapStateToProps,
    null
)(Event)