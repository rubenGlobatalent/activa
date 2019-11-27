import React from 'react'

const Image = props => {
    if (props.data) {
        return (
            <picture className="card-image image is-square">
                <img src={props.data} alt="" style={{ objectFit: 'contain' }} />
            </picture>
        )
    }
    else return null
}

export default Image