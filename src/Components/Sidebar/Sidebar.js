import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faMinus, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFacebook, faYoutube } from "@fortawesome/free-brands-svg-icons"
import { NotificationManager } from 'react-notifications'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import * as firebase from 'firebase'

import Comments from './Components/Comments'

const style = {
    footer: {
        display: 'block'
    }
}

const mapStateToProps = state => ({
    districts: state.districts,
    selectedActivity: state.selectedActivity
})

const Edit = props => {
    const removePoint = async () => {
        try {
            firebase.firestore().collection('sports').doc(props.data.id).delete()
            NotificationManager.success('Actividad eliminada con éxito.')
            props.toggleComponent('sidebar')
        }
        catch (error) {
            console.error(error)
            props.toggleComponent('sidebar')
            NotificationManager.error('Ha ocurrido un error al eliminar la actividad.')
        }
    }

    const data = { ...props.data, urbanFurniture: JSON.parse(props.data.urbanFurniture), improvements: JSON.parse(props.data.improvements), feature: JSON.parse(props.data.feature) }

    if (props.confirmation) {
        return (
            <footer className="card-footer" style={style.footer}>

                <div className="card-footer-item">
                    <div className="buttons">
                        <button className="button is-danger is-small" onClick={removePoint}>
                            Confirmar
                    </button>
                        <button className="button is-light is-small" onClick={props.toggleConfirmation}>
                            Cancelar
                    </button>
                    </div>


                </div>
            </footer>

        )
    }

    else {
        return (
            <footer className="card-footer" style={style.footer}>

                <div className="buttons is-centered">
                    <button className="button is-danger is-small" onClick={props.toggleConfirmation}>
                        Eliminar deporte
                    </button>
                    <button className="button is-primary is-small" onClick={() => props.editFeature({ type: "Feature", properties: data, geometry: props.geom })}>
                        Editar deporte
                    </button>
                </div>
            </footer>

        )
    }

},
    Image = props => {
        return (
            <picture className="card-image image is-square">
                <img src={props.data.image} style={{ objectFit: 'contain' }} />
            </picture>
        )
    },
    Description = props => {
        return (
            <>
                <p className="has-text-weight-bold">Descripción de la actividad:</p>
                <p className="content" dangerouslySetInnerHTML={{ __html: props.data }} style={{ overflowWrap: 'break-word' }}></p >
            </>
        )
    },
    Basics = props => {
        const { t } = useTranslation('general', { useSuspense: false });

        const selectedTags = (collection, collectionName) => {
            const safeCollection = collection ? JSON.parse(collection) : {},
                selected = Object.entries(safeCollection).filter(entry => entry[1]).map(entry => {
                    return (
                        <span className={`tag`}>{t(`${collectionName}.${entry[0]}`)}</span>
                    )
                })
            return selected
        },
            showCollection = collection => {
                if (!collection) {
                    return false
                }
                else if (Object.values(JSON.parse(collection)).filter(value => value).length === 0) {
                    return false
                }
                else {
                    return true
                }

            }
        return (
            <>
                <p><span className="has-text-weight-bold">Deporte: </span>{props.data.sport}</p>
                <br />
                <div><span className="has-text-weight-bold">¿Cuándo se practica?: </span>{props.data.type === 'puntual' ?
                    <p>Puntualmente</p> :
                    <p>{props.data.schedule}</p>
                }
                    <br />
                </div>
                <div className={showCollection(props.data.feature) ? `` : `is-sr-only`}>
                    <p><span className="has-text-weight-bold">Cualidades del espacio:</span></p>
                    <div className="tags">{selectedTags(props.data.feature, 'feature')}</div>
                    <div></div>
                </div>
                <div className={showCollection(props.data.improvements) ? `` : `is-sr-only`}>
                    <p><span className="has-text-weight-bold">Mejoras para el espacio:</span></p>
                    <div className="tags">{selectedTags(props.data.improvements, 'improvements')}</div>
                    <div></div>
                </div>
                <div className={showCollection(props.data.urbanFurniture) ? `` : `is-sr-only`}>
                    <p><span className="has-text-weight-bold">Mejoras para el mobiliario urbano:</span></p>
                    <div className="tags">{selectedTags(props.data.urbanFurniture, 'urbanFurniture')}</div>
                    <div></div>
                </div>
            </>
        )
    },
    Details = props => {
        return (
            <div className="box has-background-white-bis is-paddingless">
                <h2 className="title is-size-6 has-background-grey-lighter" style={{ paddingLeft: "0.25rem" }}>Contacto</h2>
                <div className="subtitle is-size-7">
                    {props.data.facebook ? <div><a href={props.data.facebook} target="_blank" rel="noopener noreferrer"><span className="icon"><FontAwesomeIcon icon={faFacebook} /></span>Facebook</a></div> : null}
                    {props.data.twitter ? <div><a href={props.data.twitter} target="_blank" rel="noopener noreferrer"><span className="icon"><FontAwesomeIcon icon={faTwitter} /></span>Twitter</a></div> : null}
                    {props.data.youtube ? <div><a href={props.data.youtube} target="_blank" rel="noopener noreferrer"><span className="icon"><FontAwesomeIcon icon={faYoutube} /></span>Youtube</a></div> : null}
                    {props.data.email ? <div><a href={`mailto:${props.data.email}`} target="_blank" rel="noopener noreferrer"><span className="icon"><FontAwesomeIcon icon={faEnvelope} /></span>Correo</a></div> : null}
                    {props.data.phone ? <div><a href={`tel:${props.data.email}`} target="_blank" rel="noopener noreferrer"><span className="icon"><FontAwesomeIcon icon={faPhone} /></span>Teléfono</a></div> : null}
                    <br />
                </div>

            </div>
        )
    }


const Sidebar = props => {
    const [expanded, setExpanded] = useState(true),
        [confirmation, setConfirmation] = useState(false)

    const toggleConfirmation = () => {
        setConfirmation(!confirmation)
    }

    const image = props.selectedActivity.properties.image ? <Image data={{ ...props.selectedActivity.properties }} /> : null,
        description = props.selectedActivity.properties.description ? <Description className="content" data={props.selectedActivity.properties.description} /> : null,
        details = (props.selectedActivity.properties.facebook || props.selectedActivity.properties.twitter || props.selectedActivity.properties.youtube || props.selectedActivity.properties.email || props.selectedActivity.properties.phone) ? <Details data={{ ...props.selectedActivity.properties }} /> : null,
        footer = firebase.auth().currentUser ? (firebase.auth().currentUser.uid === props.selectedActivity.properties.creatorUID || firebase.auth().currentUser.uid === 'poV55zFFd9aepcRuZWhYnV8RD1a2' ? <Edit toggleComponent={props.toggleComponent} confirmation={confirmation} toggleConfirmation={toggleConfirmation} editFeature={props.editFeature} data={props.selectedActivity.properties} geom={props.selectedActivity.geometry} /> : null) : null;


    return (
        <article className="card animated fadeIn faster" style={{ zIndex: 10, maxHeight: "75vh", overflowY: "scroll", position: "absolute", top: "4.5rem", left: "0.7rem", width: "20rem" }}>
            <header className="card-header">
                <h2 className="is-size-6 card-header-title">
                    {props.selectedActivity.properties.name ? props.selectedActivity.properties.name : props.selectedActivity.properties.sport}
                </h2>
                <div className="card-header-icon" onClick={() => setExpanded(!expanded)}>
                    <span className="icon">
                        <FontAwesomeIcon icon={faMinus} />
                    </span>
                </div>
                <div className="card-header-icon" onClick={() => props.toggleComponent('sidebar')}>
                    <span className="icon">
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </div>
            </header>

            <div style={{ display: expanded ? "block" : "none", padding: "0 1rem 1rem 1rem" }}>
                {image}

                <div className="card-content">
                    <Basics data={props.selectedActivity.properties} />
                    {description}
                    {details}
                    <Comments activity={props.selectedActivity.properties.id} />
                    {/* <RichEditor/> */}

                </div>
            </div>

            {footer}
        </article>
    )

}

export default connect(
    mapStateToProps,
    null
)(Sidebar)