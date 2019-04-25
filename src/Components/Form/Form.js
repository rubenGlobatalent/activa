import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faFacebook, faYoutube } from "@fortawesome/free-brands-svg-icons"
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { NotificationManager } from 'react-notifications'
import uuidv4 from 'uuid/v4'
// OPTIMIZE IMPORTS
import * as turf from '@turf/turf'
import * as firebase from 'firebase'


export default function Form(props) {

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

        submitData = async event => {
            event.preventDefault();
            setProgress(true)
            const storageRef = firebase.storage().ref().child(`image/${uuidv4()}`),
                databaseRef = firebase.firestore().collection('sports');

            let geometry = turf.getGeom(props.feature),
                properties = {
                    name: name.length > 0 ? name : null,
                    sport: sport,
                    organization: organization.length > 0 ? organization : null,
                    schedule: schedule.length > 0 ? schedule : null,
                    description: description.length > 0 ? description : null,
                    type: type,
                    twitter: twitter.length > 0 ? twitter : null,
                    facebook: facebook.length > 0 ? facebook : null,
                    youtube: youtube.length > 0 ? youtube : null,
                    organizer: organizer,
                    image: file
                };
            if (file) {
                storageRef.put(file)
                    .on('state_changed',
                        snapshot => {
                            // setProgress(100.0 * snapshot.bytesTransferred / snapshot.totalBytes)
                        },
                        error => {
                            console.log(error)
                        },
                        async () => {
                            try {
                                const downloadURL = await storageRef.getDownloadURL()
                                await databaseRef.add(turf.feature(geometry, { ...properties, image: downloadURL }))
                                setProgress(false)
                                NotificationManager.success('Actividad creada con éxito.')
                                props.toggleComponent('form')
                                clearForm()
                            }
                            catch (error) {
                                console.log(error)
                                props.toggleComponent('form')
                                NotificationManager.error('Ha ocurrido un error al crear la actividad.')
                            }
                        }
                    )
            }

            else {
                try {
                    await databaseRef.add(turf.feature(geometry, properties))
                    setProgress(false)
                    NotificationManager.success('Actividad creada con éxito.')
                    props.toggleComponent('form')
                    clearForm()
                }
                catch (error) {
                    console.log(error)
                    props.toggleComponent('form')
                    NotificationManager.error('Ha ocurrido un error al crear la actividad.')
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

        }

    // Conditional rendering
    const imageName = file ? <span className="file-name"> {file.name} </span> : null,
        imagePreview = file ? <figure className="image is-128by128 animated zoomIn faster"><img src={URL.createObjectURL(file)} alt={file.name} /></figure> : null,
        scheduleField = type === 'periódica' ?
            <div className="field column animated zoomIn faster">
                <div className="control">
                    <textarea className="textarea" placeholder="Horario de la actividad" value={schedule} rows="2" onChange={e => setSchedule(e.target.value)}></textarea>
                </div>
            </div> : null,
        submitButtonClass = progress ? "button is-loading" : "button";

    if (props.visible) {
        const sports = props.data.map(sport => {
            return (
                <option key={sport} value={sport}>{sport}</option>
            )
        })
        return (
            <div className="modal is-active animated fadeIn faster">
                <div className="modal-background" onClick={() => props.toggleComponent('form')}></div>
                <form className="modal-card" onSubmit={submitData}>
                    <header className="modal-card-head">
                        <h2 className="modal-card-title is-size-5 has-text-weight-light">Añade una actividad</h2>
                        <button className="delete" onClick={() => props.toggleComponent('form')}></button>
                    </header>

                    <section className="modal-card-body">
                        <div className="field">
                            <label className="label">Nombre</label>
                            <div className="control is-expanded">
                                <input className="input" type="text" placeholder="Nombre de la actividad" value={name} onChange={e => setName(e.target.value)} />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Deporte</label>
                            <div className="control is-expanded">
                                <div className="select is-fullwidth">
                                    <select required value={sport} onChange={e => setSport(e.target.value)}>
                                        <option disabled value=''>Selecciona el deporte que se practica</option>
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
                                <label className="label">Tipo de actividad</label>
                                <div className="control">
                                    <div className="is-fullwidth">
                                        <label className="radio">
                                            <input type="radio" required name="type" value="periódica" onChange={e => setType(e.target.value)} />
                                            {` `}Periódica
                                </label>
                                    </div>
                                    <div className="is-fullwidth">
                                        <label className="radio">
                                            <input type="radio" required name="type" value="puntual" onChange={e => setType(e.target.value)} />
                                            {` `}Puntual
                                </label>
                                    </div>
                                </div>
                            </div>
                            {scheduleField}

                        </div>

                        <div className="field">
                            <label className="label">Describe brevemente la actividad que realizas</label>
                            <div className="control">
                                <textarea className="textarea" placeholder="Descripción" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                            </div>
                        </div>

                        <div className="columns is-vcentered">
                            <div className="column">
                                <div className="field">
                                    <div className="control is-expanded has-icons-left">
                                        <input className="input" type="text" placeholder="Twitter" value={twitter} onChange={e => setTwitter(e.target.value)} />
                                        <span className="icon is-small is-left">
                                            <FontAwesomeIcon icon={faTwitter} />
                                        </span>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control is-expanded has-icons-left">
                                        <input className="input" type="text" placeholder="Facebook" value={facebook} onChange={e => setFacebook(e.target.value)} />
                                        <span className="icon is-small is-left">
                                            <FontAwesomeIcon icon={faFacebook} />
                                        </span>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control is-expanded has-icons-left">
                                        <input className="input" type="text" placeholder="Youtube" value={youtube} onChange={e => setYoutube(e.target.value)} />
                                        <span className="icon is-small is-left">
                                            <FontAwesomeIcon icon={faYoutube} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="column">
                                {imagePreview}
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
                                        {imageName}
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


                        <div className="field">
                            <div className="control">
                                <label className="checkbox">
                                    <input type="checkbox" required defaultChecked={terms} onChange={e => setTerms(e.target.checked)} />
                                    {` `}Acepto los <a href="/">términos y condiciones</a> y permito que mis datos aparezcan en la web.
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
                                <button className="button is-text" onClick={clearForm}>Borrar</button>
                            </div>
                        </div>
                    </footer>
                </form>
            </div>
        )
    }
    else {
        return (
            null
        )
    }

}