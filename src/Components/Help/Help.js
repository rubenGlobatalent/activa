import React from 'react'
import { navigate } from '@reach/router'
import logoTec from '../../assets/img/tec.png'
import logoAyunt from '../../assets/img/ayunt.png'
import logoPolo from '../../assets/img/polo.png'
import logoAndtech from '../../assets/img/andtech.png'
import logoRce from '../../assets/img/rce.png'
import logoPromalaga from '../../assets/img/promalaga.png'
import logoVice from '../../assets/img/vice.png'
import imgPortada from '../../assets/img/main.gif'
import cartometrics from '../../assets/img/cartometrics.png'
import logoInteractividad from '../../assets/img/interactividad.png'
import logoGeotecnologia from '../../assets/img/geotecnologia.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons"

const style = {
    modalCard: {
        height: 'calc(100vh - 40px)'
    },
    tabs: {
        width: '100%',
        marginBottom: '0'
    },
    h3: {
        marginTop: '.5rem',
        marginBottom: '1rem'
    },
    p: {
        fontSize: '1rem',
        textAlign: 'justify'
    },
    imgPortadaContainer: {
        margin: '25px 0 0'
    },
    imgPortada: {
        display: 'block',
        margin: '0 auto'
    },
    logosRow2: {
        width: '50%',
        margin: '20px auto 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    logosRow3: {
        width: '80%',
        margin: '20px auto 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    logoContainer2: {
        width: '45%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoContainer3: {
        width: '30%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
};

const Help = props => {

    const buttonClickHandler = () => {
        props.displayStepsAfterHelp();
        navigate('/')
    };

    return (
        <div className="modal is-active animated fadeIn faster">
            <div className="modal-background"></div>
            <article className="modal-card" style={style.modalCard}>
                <header className="modal-card-head">
                    <h2 className="modal-card-title is-size-5 has-text-weight-light">Activa Málaga</h2>
                    <button className="delete" onClick={buttonClickHandler}></button>
                </header>
                <section className="modal-card-body">
                    <article>
                        <h3 className="title is-size-6" style={style.h3}>¿QUIERES HACER DEPORTE AL AIRE LIBRE EN TU CIUDAD?</h3>
                        <p style={style.p}>
                            <strong>Activa Málaga</strong> es una plataforma digital de consulta para todos los ciudadan@s malagueñ@s donde puedes encontrar las zonas urbanas idóneas y de acceso libre para practicar tu deporte favorito sin que dependas de polideportivos, gimnasios ni centros de acceso restringido.
                            </p>
                    </article>
                    <br />
                    <article>
                        <h3 className="title is-size-6" style={style.h3}>¿CONOCES LUGARES EN EL ESPACIO PÚBLICO DONDE REALIZAR ACTIVIDADES DEPORTIVAS?</h3>
                        <p style={style.p}>
                            <strong>¡Registra una actividad!</strong> No dudes en registrar los puntos de actividad deportiva que conozcas para compartir y ayudar a otr@s ciudadan@s a conocer nuevos lugares <strong>¡Vamos a potenciar la actividad deportiva en la ciudad!</strong>
                        </p>
                    </article>
                    <div style={style.imgPortadaContainer}>
                        <img src={imgPortada} style={style.imgPortada} alt='portada' />
                    </div>
                    <section className="has-text-centered is-size-6">
                        <h6>Contáctanos</h6>
                        <a href="mailto:info@teciudadania.uma.es"><span className="icon">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </span></a>
                        <a href="https://twitter.com/teciudadania?lang=es" target="_blank" rel="noopener noreferrer"><span className="icon">
                            <FontAwesomeIcon icon={faTwitter} />
                        </span></a>
                        <a href="https://www.facebook.com/teciudadania.ciudadania.1" target="_blank" rel="noopener noreferrer"><span className="icon">
                            <FontAwesomeIcon icon={faFacebook} />
                        </span></a>
                        <a href="https://www.instagram.com/teciudadania/?hl=es" target="_blank" rel="noopener noreferrer"><span className="icon">
                            <FontAwesomeIcon icon={faInstagram} />
                        </span></a>
                    </section>
                    <div className="columns is-centered">
                        <a target="_blank" rel="noopener noreferrer" href="https://www.uma.es/secretariageneral/newsecgen/index.php?option=com_content&view=article&id=259:reglamento-de-proteccion-de-datos-de-caracter-personal-de-la-universidad-de-malaga&catid=13&Itemid=124" className="is-3 column">Términos y condiciones</a>
                    </div>
                    <div>
                        <div style={style.logosRow2}>
                            <picture style={style.logoContainer2}>
                                <img src={logoRce} alt="" />
                            </picture>
                            <picture style={style.logoContainer2}>
                                <img src={logoVice} alt="" />
                            </picture>
                        </div>
                        <div style={style.logosRow3}>
                            <picture style={style.logoContainer3}>
                                <img src={logoTec} alt="" />
                            </picture>
                            <picture style={style.logoContainer3}>
                                <img src={logoGeotecnologia} alt="" />
                            </picture>
                            <picture style={style.logoContainer3}>
                                <img src={logoInteractividad} alt="" />
                            </picture>
                        </div>
                        <div style={style.logosRow2}>
                            <picture style={style.logoContainer2}>
                                <img src={logoAndtech} alt="" />
                            </picture>
                            <picture style={style.logoContainer2}>
                                <img src={cartometrics} alt="" />
                            </picture>
                        </div>
                        <div style={style.logosRow3}>
                            <picture style={style.logoContainer3}>
                                <img src={logoPolo} alt="" />
                            </picture>
                            <picture style={style.logoContainer3}>
                                <img src={logoAyunt} alt="" />
                            </picture>
                            <picture style={style.logoContainer3}>
                                <img src={logoPromalaga} alt="" />
                            </picture>
                        </div>
                    </div>
                </section>
                <footer className="modal-card-foot buttons is-centered">
                    <button className="button helpButton" onClick={buttonClickHandler}>Siguiente</button>
                </footer>
            </article>
        </div>
    )

}

export default Help