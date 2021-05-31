import React from 'react'
import { format } from 'date-fns'

const EventSchedule = ({ day = '', start = '', end = '' }) => {
    if (!day) return null

    const renderSchedule = () => {
        if (!start && !end) return null

        return start && end ? (
            <>
                <span>{' de '}</span>
                <time>{start}</time>
                <span>{' a '}</span>
                <time>{end}</time>
            </>
        ) : (
            <>
                <span>{' a las '}</span>
                <time>{start || end}</time>
            </>
        )
    }

    return (
        <>
            <time dateTime={day}>{format(new Date(day), 'dd/MM/yyyy')}</time>

            {renderSchedule()}
        </>
    )
}

export default EventSchedule
