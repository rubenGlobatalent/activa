import React from 'react'

export default function Help(props) {
    if (props.visible) {
        return (
            <div className="modal is-active">
                <div className="modal-background" onClick={() => props.toggleComponent('help')}></div>
                <article className="modal-card">
                    <header className="modal-card-head">
                        <h2 className="modal-card-title is-size-5 has-text-weight-light">Ayuda</h2>
                        <button className="delete" onClick={() => props.toggleComponent('help')}></button>
                    </header>
                    <section className="modal-card-body">
                        <article>
                            <h3 className="title is-size-6">¿QUIERES HACER DEPORTE AL AIRE LIBRE EN TU CIUDAD?</h3>
                            <p>
                                <strong>Málaga Activa</strong> es una plataforma digital de consulta para todos los ciudadan@s malagueñ@s donde puedes encontrar las zonas urbanas idóneas y de acceso libre para practicar tu deporte favorito sin que dependas de polideportivos, gimnasios ni centros de acceso restringido.
                        </p>
                        </article>
                        <br/>
                        <article>
                            <h3 className="title is-size-6">¿CONOCES LUGARES EN EL ESPACIO PÚBLICO DONDE REALIZAR ACTIVIDADES DEPORTIVAS?</h3>
                            <p>
                                <strong>¡Registra una actividad!</strong> No dudes en registrar los puntos de actividad deportiva que conozcas para compartir y ayudar a otr@s ciudadan@s a conocer nuevos lugares <strong>¡Vamos a potenciar la actividad deportiva en la ciudad!</strong>
                        </p>
                        </article>
                    </section>
                    <footer className="modal-card-foot buttons is-centered">
                        <button className="button" onClick={() => props.toggleComponent('help')}>Aceptar</button>
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