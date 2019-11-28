import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faFacebook, faYoutube } from "@fortawesome/free-brands-svg-icons"
import { faUpload, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { NotificationManager } from 'react-notifications'
import uuidv4 from 'uuid/v4'
import { useTranslation } from 'react-i18next'
import { navigate } from "@reach/router"
import { connect } from 'react-redux'
// OPTIMIZE IMPORTS
import * as turf from '@turf/turf'
import * as firebase from 'firebase'
import AskRegistration from './Components/AskRegistration'
import Header from './Components/Header'
import FileName from './Components/FileName'
import ImagePreview from './Components/ImagePreview'

const mapStateToProps = state => ({
    selected: state.selected,
    user: state.user,
    activities: state.activities,
    categories: state.categories_activities
})

const defaultFeature = {
    safe: false,
    large: false,
    natural: false,
    lineal: false,
    near: false,
    gathering: false,
    suitable: false,
    quiet: false,
    rest: false,
    noVehicles: false
},
    defaultImprovements = {
        pavement: false,
        furniture: false,
        accesibility: false,
        sportsFacilities: false,
        lighting: false,
        restZones: false,
        safety: false,
        allOk: false
    },
    defaultFurniture = {
        fountains: false,
        bench: false,
        shadow: false,
        greenZones: false,
        bikeParking: false,
        stretching: false,
        lightningImprovements: false,
        restrooms: false,
        allOk: false
    }

const Form = props => {
    const { t } = useTranslation('general', { useSuspense: false })

    // Hooks
    const [name, setName] = useState(''),
        [sport, setSport] = useState(''),
        [organization, setOrganization] = useState(''),
        [schedule, setSchedule] = useState(''),
        [description, setDescription] = useState(''),
        [type, setType] = useState(''),
        [twitter, setTwitter] = useState(''),
        [facebook, setFacebook] = useState(''),
        [youtube, setYoutube] = useState(''),
        [file, setFile] = useState(null),
        [organizer, setOrganizer] = useState(false),
        [terms, setTerms] = useState(false),
        [progress, setProgress] = useState(false),
        [email, setEmail] = useState(''),
        [feature, setFeature] = useState(defaultFeature),
        [improvements, setImprovements] = useState(defaultImprovements),
        [urbanFurniture, setUrbanFurniture] = useState(defaultFurniture),
        [phone, setPhone] = useState(''),
        [featureGeometry, setFeatureGeometry] = useState([])

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
            setProgress(true)
            const storageRef = firebase.storage().ref().child(`image/${uuidv4()}`),
                databaseRef = firebase.firestore().collection(`sports`);

            let geometry = featureGeometry,
                properties = {
                    name: name.length > 0 ? name : false,
                    sport: sport,
                    organization: organization.length > 0 ? organization : false,
                    schedule: schedule.length > 0 ? schedule : false,
                    description: description.length > 0 ? description.replace(/\r?\n/g, '<br/>') : false,
                    type: type,
                    twitter: twitter.length > 0 ? twitter : false,
                    facebook: facebook.length > 0 ? facebook : false,
                    youtube: youtube.length > 0 ? youtube : false,
                    organizer: organizer,
                    image: file ? file : false,
                    email: email.length > 0 ? email : false,
                    phone: phone.length > 0 ? phone : false,
                    creatorUID: props.user.uid,
                    improvements: improvements,
                    urbanFurniture: urbanFurniture,
                    feature: feature
                };

            if (file) {
                storageRef.put(file)
                    .on('state_changed',
                        snapshot => {
                            // setProgress(100.0 * snapshot.bytesTransferred / snapshot.totalBytes)
                        },
                        error => {
                            console.error(error)
                        },
                        async () => {
                            try {
                                const downloadURL = await storageRef.getDownloadURL(),
                                    feature = turf.feature(geometry, { ...properties, image: downloadURL });

                                if (turf.getType(feature) === 'LineString') {
                                    feature.geometry.coordinates = { ...feature.geometry.coordinates }
                                }

                                await saveData(props.selected.properties.id, databaseRef, feature)

                                setProgress(false)
                                NotificationManager.success('Actividad creada con éxito.')
                                clearForm()
                            }
                            catch (error) {
                                console.error(error)
                                NotificationManager.error('Ha ocurrido un error al crear la actividad.')
                            }
                            finally {
                                navigate('/')
                            }
                        }
                    )
            }

            else {
                try {
                    const feature = turf.feature(geometry, properties)
                    if (turf.getType(feature) === 'LineString') {
                        feature.geometry.coordinates = { ...feature.geometry.coordinates }
                    }
                    const response = await saveData(props.selected.properties.id, databaseRef, feature)


                    setProgress(false)
                    NotificationManager.success('Actividad creada con éxito.')
                    clearForm()
                }
                catch (error) {
                    console.error(error)
                    NotificationManager.error('Ha ocurrido un error al crear la actividad.')
                }
                finally {
                    navigate('/')
                }

            }
        },
        clearForm = () => {
            // Until we do have a more elegant way to select all hooks, we will have
            // to set them one by one by hand
            setName('')
            setSport('')
            setOrganization('')
            setSchedule('')
            setDescription('')
            setType('puntual')
            setTwitter('')
            setFacebook('')
            setYoutube('')
            setFile(null)
            setOrganizer(false)
            setTerms(false)
            setProgress(false)
            setEmail('')
            setPhone('')
            setFeature(defaultFeature)
            setImprovements(defaultImprovements)
            setUrbanFurniture(defaultFurniture)
        },
        renderTags = (collection, setCollection, collectionName) => {
            const collectionComponent = Object.entries(collection)
                .map(entry => {
                    const name = entry[0],
                        status = entry[1]
                    return (
                        <li key={uuidv4()} className={`tag ${status ? `is-primary` : ``}`} onClick={() => setCollection({ ...collection, [name]: !status })} >{t(`${collectionName}.${name}`)}</li>
                    )
                })
            return collectionComponent
        },
        setData = data => {
            setName(data.properties.name || '')
            setSport(data.properties.sport ? data.properties.sport : '')
            setOrganization(data.properties.organization ? data.properties.organization : '')
            setSchedule(data.properties.schedule ? data.properties.schedule : '')
            setDescription(data.properties.description ? data.properties.description : '')
            setType(data.properties.type ? data.properties.type : '')
            setTwitter(data.properties.twitter ? data.properties.twitter : '')
            setFacebook(data.properties.facebook ? data.properties.facebook : '')
            setYoutube(data.properties.youtube ? data.properties.youtube : '')
            setFile(data.properties.image ? data.properties.image : null)
            setOrganizer(data.properties.organizer ? data.properties.organizer : false)
            setEmail(data.properties.email ? data.properties.email : '')
            setPhone(data.properties.phone ? data.properties.phone : '')
            setFeature(data.properties.feature ? JSON.parse(data.properties.feature) : defaultFeature)
            setImprovements(data.properties.improvements ? JSON.parse(data.properties.improvements) : defaultImprovements)
            setUrbanFurniture(data.properties.furniture ? JSON.parse(data.properties.furniture) : defaultFurniture)
            setFeatureGeometry(data.geometry)
        }

        const featureToEdit = props.activities.features.find(feature => feature.properties.id === props.id)
        useEffect(() => {
            let data
            if (featureToEdit) {
                console.log(featureToEdit)
                data = featureToEdit
            }
            else if (props.selected && props.id === props.id) {
                data = props.selected
            }
            if (data) {
                setData(data)
            }
        }, [featureToEdit, props.selected])

    // Conditional rendering
    const imageName = file ? <span className="file-name"> {file.name} </span> : null,
        scheduleField = type === 'periódica' ?
            <div className="field column animated zoomIn faster">
                <div className="control">
                    <textarea className="textarea" placeholder="Horario de la actividad" value={schedule} rows="2" onChange={e => setSchedule(e.target.value)}></textarea>
                </div>
            </div> : null,
        submitButtonClass = progress ? "button is-loading" : "button";

    if (props.user) {
        const sports = props.categories.map(sport => {
            return (
                <option key={sport} value={sport}>{sport}</option>
            )
        })
        return (
            <div className="modal is-active animated fadeIn faster">
                <div className="modal-background"></div>
                <form className="modal-card" onSubmit={submitData}>
                    <Header type={'Activity'} />

                    <section className="modal-card-body">
                        <div className="field">
                            <label className="label">Nombre de la actividad</label>
                            <div className="control is-expanded">
                                <input className="input" type="text" placeholder="Personaliza el nombre de tu actividad (ej. paseos nocturnos de patinaje)" value={name} onChange={e => setName(e.target.value)} />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Deporte *</label>
                            <div className="control is-expanded">
                                <div className="select is-fullwidth">
                                    <select required value={sport} onChange={e => setSport(e.target.value)}>
                                        <option disabled value=''>Selecciona el deporte que se practica </option>
                                        {sports}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Club o asociación a la que pertenece</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Escribe tu club/asociación si formas parte de alguno" value={organization} onChange={e => setOrganization(e.target.value)} />
                            </div>
                        </div>

                        <div className="columns is-vcentered">
                            <div className="field column">
                                <label className="label">Tipo de actividad *</label>
                                <div className="control">
                                    <div className="is-fullwidth">
                                        <label className="radio">
                                            <input type="radio" required checked={type === 'periódica'} name="type" value="periódica" onChange={e => setType(e.target.value)} />
                                            {` `}Periódica
                                </label>
                                    </div>
                                    <div className="is-fullwidth">
                                        <label className="radio">
                                            <input type="radio" required name="type" checked={type === 'puntual'} value="puntual" onChange={e => setType(e.target.value)} />
                                            {` `}Puntual
                                </label>
                                    </div>
                                </div>
                            </div>
                            {scheduleField}
                        </div>

                        <div className="columns is-multiline">
                            <div className="column">
                                <h5 className="subtitle is-size-7 has-text-weight-bold">¿Cuál es la cualidad que más te gusta de este espacio?</h5>
                                <ul className="tags">
                                    {renderTags(feature, setFeature, 'feature')}
                                </ul>
                            </div>

                            <div className="column">
                                <h5 className="subtitle is-size-7 has-text-weight-bold">¿Qué mejoras introducirías en este espacio?</h5>
                                <ul className="tags">
                                    {renderTags(improvements, setImprovements, 'improvements')}
                                </ul>
                            </div>

                            <div className="column">
                                <h5 className="subtitle is-size-7 has-text-weight-bold">¿Qué mejoras introducirías en el mobiliario urbano?</h5>
                                <ul className="tags">
                                    {renderTags(urbanFurniture, setUrbanFurniture, 'urbanFurniture')}
                                </ul>
                            </div>

                        </div>

                        <div className="field">
                            <label className="label">Comentarios sobre tu actividad deportiva</label>
                            <div className="control">
                                <textarea required className="textarea" placeholder="Entorno natural, condiciones técnicas adecuadas (pavimento), tranquilidad, sensación de seguridad, punto de encuentro con otros deportistas, no hay ruidos molestos, buen estado de instalaciones, mobiliario urbano idóneo (fuentes, bancos, alumbrado público, zonas de sombra)..." value={description} onChange={e => setDescription(e.target.value)}></textarea>
                            </div>
                        </div>

                        <div className="columns is-vcentered">
                            <div className="column">
                                <div className="field">
                                    <div className="control is-expanded has-icons-left">
                                        <input className="input" type="url" placeholder="Twitter" value={twitter} onChange={e => setTwitter(e.target.value)} pattern="http(s)?:\/\/(?:www\.)?twitter\.com\/.+" title="Introduce una cuenta de Twitter válida." />
                                        <span className="icon is-small is-left">
                                            <FontAwesomeIcon icon={faTwitter} />
                                        </span>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control is-expanded has-icons-left">
                                        <input className="input" type="url" placeholder="Facebook" value={facebook} onChange={e => setFacebook(e.target.value)} pattern="http(s)?:\/\/(?:www\.)?facebook\.com\/.+" title="Introduce una cuenta de Facebook válida." />
                                        <span className="icon is-small is-left">
                                            <FontAwesomeIcon icon={faFacebook} />
                                        </span>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control is-expanded has-icons-left">
                                        <input className="input" type="url" placeholder="Youtube" value={youtube} onChange={e => setYoutube(e.target.value)} pattern="^(http(s)?:\/\/(?:www\.)?youtu(be|.be)?(\.com)?\/.+" title="Introduce una cuenta de Youtube válida." />
                                        <span className="icon is-small is-left">
                                            <FontAwesomeIcon icon={faYoutube} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="column">
                                <ImagePreview file={file} />
                                <hr className="is-invisible" />
                                <div className="file has-name is-boxed columns is-centered">
                                    <label className="file-label">
                                        <input className="file-input" type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
                                        <span className="file-cta">
                                            <span className="file-icon">
                                                <FontAwesomeIcon icon={faUpload} />
                                            </span>
                                            <span className="file-label">
                                                Elige una imagen
                                           </span>
                                        </span>
                                        <FileName file={file} />
                                    </label>
                                </div>
                            </div>
                        </div>


                        <div className="field">
                            <div className="control">
                                <label className="checkbox">
                                    <input type="checkbox" defaultChecked={organizer} onChange={e => setOrganizer(e.target.checked)} />
                                    {` `}Soy responsable de la organización de la actividad
                                </label>
                            </div>
                        </div>

                        <div className={organizer ? `animated fadeIn` : `is-sr-only`}>
                            <div className="field">
                                <div className="control is-expanded has-icons-left">
                                    <input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                                    <span className="icon is-small is-left">
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </span>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control is-expanded has-icons-left">
                                    <input className="input" type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
                                    <span className="icon is-small is-left">
                                        <FontAwesomeIcon icon={faPhone} />
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="field">
                            <div className="control">
                                <label className="checkbox">
                                    <input type="checkbox" required defaultChecked={terms} onChange={e => setTerms(e.target.checked)} />
                                    {` `}Acepto los <a target="_blank" rel="noopener noreferrer" href="https://www.uma.es/secretariageneral/newsecgen/index.php?option=com_content&view=article&id=259:reglamento-de-proteccion-de-datos-de-caracter-personal-de-la-universidad-de-malaga&catid=13&Itemid=124">términos y condiciones</a> y permito que mis datos aparezcan en la web *
                                </label>
                            </div>
                        </div>

                    </section>

                    <footer className="modal-card-foot buttons is-centered">
                        <div className="field is-grouped">
                            <div className="control">
                                <button type='submit' className={submitButtonClass}>Enviar</button>
                            </div>
                            <div className="control">
                                <button type="reset" className="button is-text" onClick={clearForm}>Borrar</button>
                            </div>
                        </div>
                    </footer>
                </form>
            </div>
        )
    }

    else return <AskRegistration type={'Activity'}/>

}

export default connect(
    mapStateToProps,
    null
)(Form)