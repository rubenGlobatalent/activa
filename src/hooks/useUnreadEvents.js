import { useMemo } from 'react'

const useUnreadEvents = ({ user, events, sessionViewedEvents }) => {
    return useMemo(() => {
        if (!user || !user.uid) return []
        const currentViewEvents = sessionViewedEvents || []
        const unreadEvents = events.features.filter(event => {
            return (
                user.uid !== event.properties.creatorUID &&
                !currentViewEvents.includes(event.properties.id) &&
                new Date(event.properties.modifiedDate) >= new Date(user.lastConnection)
            )
        })

        return unreadEvents.map(({ properties: { id } }) => id)
    }, [user, events, sessionViewedEvents])
}

export default useUnreadEvents
