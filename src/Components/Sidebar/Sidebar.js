import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faMinus, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFacebook, faYoutube } from "@fortawesome/free-brands-svg-icons"
import { NotificationManager } from 'react-notifications'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { Link, navigate } from '@reach/router'
import * as firebase from 'firebase'
import uuidv4 from 'uuid/v4'

import Comments from './Components/Comments'

const style = {
    footer: {
        display: 'block'
    }
}

const mapStateToProps = state => ({
    activities: state.activities,
    user: state.user
})

const Edit = props => {

    const [confirmation, setConfirmation] = useState(false)

    const removePoint = async () => {
        try {
            firebase.firestore().collection('sports').doc(props.data.id).delete()
            NotificationManager.success('Actividad eliminada con éxito.')
        }
        catch (error) {
            console.error(error)
            NotificationManager.error('Ha ocurrido un error al eliminar la actividad.')
        }
        finally {
            navigate('/')
        }

    }

    if (confirmation) {
        return (
            <footer className="card-footer" style={style.footer}>

                <div className="card-footer-item">
                    <div className="buttons">
                        <button className="button is-danger is-small" onClick={removePoint}>
                            Confirmar
                    </button>
                        <button className="button is-light is-small" onClick={() => setConfirmation(false)}>
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
                    <button className="button is-danger is-small" onClick={() => setConfirmation(true)}>
                        Eliminar deporte
                    </button>
                    <button className="button is-primary is-small">
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
                <img src={props.data.image} alt="" style={{ objectFit: 'contain' }} />
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
            const safeCollection = collection ? collection : {},
                selected = Object.entries(safeCollection).filter(entry => entry[1]).map(entry => {
                    return (
                        <span key={uuidv4()} className={`tag`}>{t(`${collectionName}.${entry[0]}`)}</span>
                    )
                })
            return selected
        },
            showCollection = collection => {
                if (!collection) {
                    return false
                }
                else if (Object.values(collection).filter(value => value).length === 0) {
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
        [data, setData] = useState(undefined)

    useEffect(() => {
        setData(props.activities.features.find(feature => feature.properties.id === props.id))
    }, [props.id])

    if (data) {
        const image = data.properties.image ? <Image data={{ ...data.properties }} /> : null,
            description = data.properties.description ? <Description className="content" data={data.properties.description} /> : null,
            details = (data.properties.facebook || data.properties.twitter || data.properties.youtube || data.properties.email || data.properties.phone) ? <Details data={{ ...data.properties }} /> : null,
            footer = props.user ? (props.user.uid === data.properties.creatorUID || props.user.uid === 'poV55zFFd9aepcRuZWhYnV8RD1a2' ? <Edit /> : null) : null;

        return (
            <article className="card animated fadeIn faster" style={{ zIndex: 10, maxHeight: "75vh", overflowY: "scroll", position: "absolute", top: "4.5rem", left: "0.7rem", width: "20rem" }}>
                <header className="card-header">
                    <h2 className="is-size-6 card-header-title">
                        {data.properties.name ? data.properties.name : data.properties.sport}
                    </h2>
                    <div className="card-header-icon" onClick={() => setExpanded(!expanded)}>
                        <span className="icon">
                            <FontAwesomeIcon icon={faMinus} />
                        </span>
                    </div>
                    <Link to='/' className="card-header-icon">
                        <span className="icon">
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </Link>
                </header>

                <div style={{ display: expanded ? "block" : "none", padding: "0 1rem 1rem 1rem" }}>
                    {image}

                    <div className="card-content">
                        <Basics data={data.properties} />
                        {description}
                        {details}
                        <Comments activity={data.properties.id} />
                    </div>
                </div>
                {footer}
            </article>
        )
    }

    else {
        return (
            <article className="card animated fadeIn faster" style={{ zIndex: 10, maxHeight: "75vh", overflowY: "scroll", position: "absolute", top: "4.5rem", left: "0.7rem", width: "20rem" }}>
                hola
            </article>
        )
    }



}

export default connect(
    mapStateToProps,
    null
)(Sidebar)