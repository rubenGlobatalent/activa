import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faMinus, faEnvelope, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { Link } from '@reach/router'
import { format } from 'date-fns'

import Description from './Components/Description'
import Image from './Components/Image'
import NotFound from './Components/NotFound'
import Footer from './Components/Footer'

const mapStateToProps = state => ({
    events: state.events,
    user: state.user
})


const Event = props => {
    const [expanded, setExpanded] = useState(true),
        [data, setData] = useState(undefined)

    const feature = props.events.features.find(feature => feature.properties.id === props.id)

    useEffect(() => {
        setData(feature)
    }, [feature])

    if (data) {
        console.log(data)

        return (
            <article className="card animated fadeIn faster" style={{ zIndex: 10, maxHeight: "75vh", overflowY: "scroll", position: "absolute", top: "4.5rem", left: "0.7rem", width: "20rem" }}>
                <header className="card-header">
                    <h2 className="is-size-6 card-header-title">
                        {data.properties.name}
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
                    <Image data={data.properties.image} />
                    <div className="card-content">
                        <p>
                            <span className="has-text-weight-bold">Cuándo:</span> <time dateTime={data.properties.date}>{format(new Date(data.properties.date), 'dd/MM/yyyy')}</time>
                        </p>
                        <p>
                            <span className="has-text-weight-bold">Donde:</span> {data.properties.place}
                        </p>
                        <p className={`${data.properties.organizer ? '' : 'is-sr-only'}`}>
                            <span className="has-text-weight-bold">Quien la organiza:</span> {data.properties.organizer}
                        </p>
                        <Description data={data.properties.description} />
                        <div className={`box has-background-white-bis is-paddingless ${(!data.properties.email && !data.properties.link) ? 'is-sr-only' : ''}`}>
                            <h2 className="title is-size-6 has-background-grey-lighter" style={{ paddingLeft: "0.25rem" }}>Enlaces de interes</h2>
                            <div className="subtitle is-size-7">
                                {data.properties.email ? <div><a href={`mailto:${data.properties.email}`} target="_blank" rel="noopener noreferrer"><span className="icon"><FontAwesomeIcon icon={faEnvelope} /></span>Correo</a></div> : null}
                                {data.properties.link ? <div><a href={data.properties.link} target="_blank" rel="noopener noreferrer"><span className="icon"><FontAwesomeIcon icon={faExternalLinkAlt} /></span>Inscripción</a></div> : null}
                                <br />
                            </div>

                        </div>
                    </div>
                </div>
                <Footer user={props.user} id={data.properties.id} creatorUID={data.properties.creatorUID} collection={'events'} type={'Event'} />
            </article>
        )
    }

    else return <NotFound />
}

export default connect(
    mapStateToProps,
    null
)(Event)