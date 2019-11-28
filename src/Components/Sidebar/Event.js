import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faMinus } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { Link } from '@reach/router'

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
        [data, setData] = useState(undefined),
        { t } = useTranslation('general', { useSuspense: false })

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
                        <Description data={data.properties.description} />
                    </div>
                </div>
                <Footer user={props.user} id={data.properties.id} creatorUID={data.properties.creatorUID} collection={'events'} />
            </article>
        )
    }

    else return <NotFound />
}

export default connect(
    mapStateToProps,
    null
)(Event)