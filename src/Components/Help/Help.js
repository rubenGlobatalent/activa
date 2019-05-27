import React, { useState } from 'react'
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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons"

const style = {
    modalCardHead: {
        borderBottom: 'none'
    },
    modalCard: {
        height: 'calc(100vh - 40px)'
    },
    tabs: {
        width: '100%',
        marginBottom: '0'
    },
    h3: {
        marginBottom: '1rem'
    },
    p: {
        fontSize: '1rem',
        textAlign: 'justify'
    },
    imgPortadaContainer: {
        margin: '25px auto'
    }
};

export default function Help(props) {

    const [active, setActive] = useState('first');
    const buttonClickHandler = (close) => {
        if (close) {
            props.displayStepsAfterHelp();
        }
        if (active === 'first') {
            setActive('second');
        }
        else {
            props.displayStepsAfterHelp();
            setActive('first');
        }
    };

    if (props.visible) {
        const firstTabClass = (active === 'first') ? 'is-active' : '';
        const secondTabClass = (active === 'second') ? 'is-active' : '';
        return (
            <div className="modal is-active animated fadeIn faster">
                <div className="modal-background"></div>
                <article className="modal-card" style={style.modalCard}>
                    <header className="modal-card-head" style={style.modalCardHead}>
                        <div className="tabs is-centered is-fullwidth" style={style.tabs}>
                            <ul>
                                <li className={firstTabClass}>
                                    {/* eslint-disable-next-line */}
                                    <a onClick={() => setActive('first')}>Málaga Activa</a>
                                </li>
                                <li className={secondTabClass}>
                                    {/* eslint-disable-next-line */}
                                    <a onClick={() => setActive('second')}>Actividades deportivas</a>
                                </li>
                            </ul>
                        </div>
                        <button className="delete" onClick={() => buttonClickHandler(true)}></button>
                    </header>
                    <section className="modal-card-body">
                        {(active === 'first') ? (
                            <React.Fragment>
                                <article>
                                    <h3 className="title is-size-6" style={style.h3}>¿QUIERES HACER DEPORTE AL AIRE LIBRE EN TU CIUDAD?</h3>
                                    <p style={style.p}>
                                        <strong>Málaga Activa</strong> es una plataforma digital de consulta para todos los ciudadan@s malagueñ@s donde puedes encontrar las zonas urbanas idóneas y de acceso libre para practicar tu deporte favorito sin que dependas de polideportivos, gimnasios ni centros de acceso restringido.
                                    </p>
                                </article>
                                <br />
                                <article>
                                    <h3 className="title is-size-6" style={style.h3}>¿CONOCES LUGARES EN EL ESPACIO PÚBLICO DONDE REALIZAR ACTIVIDADES DEPORTIVAS?</h3>
                                    <p style={style.p}>
                                        <strong>¡Registra una actividad!</strong> No dudes en registrar los puntos de actividad deportiva que conozcas para compartir y ayudar a otr@s ciudadan@s a conocer nuevos lugares <strong>¡Vamos a potenciar la actividad deportiva en la ciudad!</strong>
                                    </p>
                                </article>
                                <picture className="image">
                                    <img src={imgPortada} alt='portada' />
                                </picture>
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
                                <div className="columns container is-fluid is-vcentered is-centered is-multiline">
                                    <picture className="image column">
                                        <img src={logoVice} alt="" />
                                    </picture>
                                    <picture className="image column">
                                        <img src={logoRce} alt="" />
                                    </picture>

                                    <picture className="image column">
                                        <img src={logoInteractividad} alt="" />
                                    </picture>
                                    <picture className="image column">
                                        <img src={logoTec} alt="" />
                                    </picture>

                                    <picture className="image column">
                                        <img src={logoAndtech} alt="" />
                                    </picture>
                                    <picture className="image column">
                                        <img src={cartometrics} alt="" />
                                    </picture>

                                    <picture className="image column">
                                        <img src={logoPolo} alt="" />
                                    </picture>
                                    <picture className="image column">
                                        <img src={logoAyunt} alt="" />
                                    </picture>
                                    <picture className="image column">
                                        <img src={logoPromalaga} alt="" />
                                    </picture>
                                </div>
                            </React.Fragment>
                        ) : (
                                <article>
                                    <h3 className="title is-size-6" style={style.h3}>¿QUÉ ACTIVIDADES DEPORTIVAS QUEREMOS REPRESENTAR?</h3>
                                    <p style={style.p}>
                                        Aquellas que tengan un libre acceso y se desarrollen en el espacio público de la ciudad.
                                </p>
                                </article>
                            )}
                    </section>
                    <footer className="modal-card-foot buttons is-centered">
                        <button className="button helpButton" onClick={() => buttonClickHandler(false)}>Siguiente</button>
                    </footer>
                </article>
            </div>
        )
    }
    else {
        return (
            null
        )
    }

}