import React from 'react'

const Description = props => {
    if (props.data) {
        return (
            <>
                <p className="has-text-weight-bold">Descripción de la actividad:</p>
                <p className="content" dangerouslySetInnerHTML={{ __html: props.data }} style={{ overflowWrap: 'break-word' }}></p>
            </>
        )
    }
    else return null
}

export default Description