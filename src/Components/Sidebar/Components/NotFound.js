import React from 'react'
import { Link } from '@reach/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const NotFound = props => {
    return (
        <article className="card animated fadeIn faster" style={{ zIndex: 10, maxHeight: "75vh", overflowY: "scroll", position: "absolute", top: "4.5rem", left: "0.7rem", width: "20rem" }}>
            <header className="card-header">
                <h2 className="is-size-6 card-header-title">
                    Not found
        </h2>
                <Link to='/' className="card-header-icon">
                    <span className="icon">
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </Link>
            </header>

            <div style={{ padding: "0 1rem 1rem 1rem" }}>
                <div className="card-content">
                    Not found
        </div>
            </div>
        </article>
    )
}

export default NotFound