import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faMinus } from '@fortawesome/free-solid-svg-icons'

export default function Sidebar(props) {

    const [expanded, setExpanded] = useState(true)

    if (props.visible) {

        const image = props.data.image ?
            <figure className="card-image image is-4by3">
                <img src={props.data.image} alt="Placeholder image" />
            </figure> : null,
            description = props.data.description ?
                <section className="content">{props.data.description}</section > : null
            ;

        console.log(props.data)

        return (
            <article className="card animated fadeIn faster" style={{ zIndex: 1, position: "absolute", top: "4.5rem", left: "1rem" }}>
                <header className="card-header">
                    <h2 className="is-size-6 card-header-title">
                        {props.data.name ? props.data.name : props.data.sport}
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

                <div style={{ display: expanded ? "block" : "none" }}>
                    {image}

                    <div className="card-content">
                        {description}
                    </div>
                </div>

                <footer className="card-footer">
                    <div className="card-footer-item">
                        <button className="button is-danger">
                            Eliminar iniciativa
                        </button>
                    </div>
                </footer>
            </article>
        )
    }
    else {
        return (
            null
        )
    }

}