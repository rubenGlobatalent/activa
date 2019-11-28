import React from 'react'

const ImagePreview = props => {
    if (props.file) {
        const src = typeof props.file === 'string' ? props.file : URL.createObjectURL(props.file)
        return <picture className="image is-128by128 animated zoomIn faster"><img src={src} alt='' /></picture>
    }

    else return null
}

export default ImagePreview