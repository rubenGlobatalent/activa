import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faFacebook, faYoutube } from "@fortawesome/free-brands-svg-icons"
import { faUpload } from '@fortawesome/free-solid-svg-icons'

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
        [file, setFile] = useState(null);

    // Conditional rendering
    const imageName = file ? <span className="file-name"> {file.name} </span> : null,
        imagePreview = file ? <figure className="image is-square"><img src={URL.createObjectURL(file)} alt={file.name} /></figure> : null,
        scheduleClass = type === 'periodic' ? "field animated fadeIn faster column" : "field animated fadeOut faster column";

    if (props.visible) {
        const sports = props.data.map(sport => {
            return (
                <option key={sport.name} value={sport.name}>{sport.name}</option>
            )
        })
        return (
            <div className="modal is-active">
                <div className="modal-background" onClick={() => props.toggleComponent('form')}></div>
                <form className="modal-card">
                    <header className="modal-card-head">
                        <h2 className="modal-card-title is-size-5 has-text-weight-light">Añade una iniciativa</h2>
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
                                            <input type="radio" name="type" value="periodic" onChange={e => setType(e.target.value)} />
                                            {` `}Periódica
                                </label>
                                    </div>
                                    <div className="is-fullwidth">
                                        <label className="radio">
                                            <input type="radio" name="type" value="punctual" onChange={e => setType(e.target.value)} />
                                            {` `}Puntual
                                </label>
                                    </div>
                                </div>
                            </div>

                            <div className={scheduleClass}>
                                <div className="control">
                                    <textarea className="textarea" placeholder="Descripción" value={schedule} rows="3" onChange={e => setSchedule(e.target.target)}></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Describe brevemente la actividad que realizas</label>
                            <div className="control">
                                <textarea className="textarea" placeholder="Descripción" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                            </div>
                        </div>

                        <div className="columns">
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
                                <div className="file has-name is-boxed">
                                    <label className="file-label">
                                        <input className="file-input" type="file" capture="environment" accept="image/*" onChange={e => setFile(e.target.files[0])} />
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
                                    <input type="checkbox" />
                                    {` `}Soy el responsable de la organización de la actividad
                                </label>
                            </div>
                        </div>


                        <div className="field">
                            <div className="control">
                                <label className="checkbox">
                                    <input type="checkbox" />
                                    {` `}Acepto los <a href="/">términos y condiciones</a> y permito que mis datos aparezcan en la web.
                                </label>
                            </div>
                        </div>

                    </section>

                    <footer className="modal-card-foot buttons is-centered">
                        <div className="field is-grouped">
                            <div className="control">
                                <button type='submit' className="button" onClick={() => console.log('File is', file)}>Enviar</button>
                            </div>
                            <div className="control">
                                <button className="button is-text">Borrar</button>
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