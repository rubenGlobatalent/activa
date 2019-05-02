import React, { useState } from 'react'
import logoTec from '../../assets/img/tec.png'
import logoAyunt from '../../assets/img/ayunt.png'
import logoPolo from '../../assets/img/polo.png'
import logoAndtech from '../../assets/img/andtech.png'
import logoRce from '../../assets/img/rce.png'
import logoPromalaga from '../../assets/img/promalaga.png'
import imgPortada from '../../assets/img/portada.jpg'

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
    },
    logosRow: {
        width: '70%',
        margin: '20px auto 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    logoContainer: {
        width: '30%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
};

export default function Help(props) {

    const [active, setActive] = useState('first');
    const buttonClickHandler = () => {
        if(active === 'first') {
            setActive('second');
        } else {
            props.displayStepsAfterHelp();
            setActive('first');
        }
    };

    if (props.visible) {
        const firstTabClass = (active === 'first') ? 'is-active' : '';
        const secondTabClass = (active === 'second') ? 'is-active' : '';
        return (
            <div className="modal is-active animated fadeIn faster">
                <div className="modal-background" onClick={() => props.toggleComponent('help')}></div>
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
                        <button className="delete" onClick={() => props.toggleComponent('help')}></button>
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
                                <br/>
                                <article>
                                    <h3 className="title is-size-6" style={style.h3}>¿CONOCES LUGARES EN EL ESPACIO PÚBLICO DONDE REALIZAR ACTIVIDADES DEPORTIVAS?</h3>
                                    <p style={style.p}>
                                        <strong>¡Registra una actividad!</strong> No dudes en registrar los puntos de actividad deportiva que conozcas para compartir y ayudar a otr@s ciudadan@s a conocer nuevos lugares <strong>¡Vamos a potenciar la actividad deportiva en la ciudad!</strong>
                                    </p>
                                </article>
                                <div style={style.imgPortadaContainer}>
                                    <img src={imgPortada} alt='portada' />
                                </div>
                                <div>
                                    <div style={style.logosRow}>
                                        <div style={style.logoContainer}>
                                            <img src={logoTec} alt="" />
                                        </div>
                                        <div style={style.logoContainer}>
                                            <img src={logoAyunt} alt="" />
                                        </div>
                                    </div>
                                    <div style={style.logosRow}>
                                        <div style={style.logoContainer}>
                                            <img src={logoPolo} alt="" />
                                        </div>
                                        <div style={style.logoContainer}>
                                            <img src={logoAndtech} alt="" />
                                        </div>
                                    </div>
                                    <div style={style.logosRow}>
                                        <div style={style.logoContainer}>
                                            <img src={logoRce} alt="" />
                                        </div>
                                        <div style={style.logoContainer}>
                                            <img src={logoPromalaga} alt="" />
                                        </div>
                                    </div>
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
                        <button className="button helpButton" onClick={buttonClickHandler}>Siguiente</button>
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