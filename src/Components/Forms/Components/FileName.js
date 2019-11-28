import React from 'react'

const FileName = props => {
    if (props.file) {
        const name = typeof props.file === 'string' ? props.file : props.file.name
        return <span className="file-name"> {name} </span>
    }
    else return null
}

export default FileName