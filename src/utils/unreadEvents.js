export const addUnreadFlag = (events = {type: "FeatureCollection", features: []}, unreadEventIds = []) => {
  const features = events.features.map(event => {
    const unread = `${unreadEventIds.includes(event.properties.id)}`
    return {...event, properties: {...event.properties, unread } }
  })

  return {...events, features};
}

export const getMapUnreadBasedValue = (unreadValue, fallbackValue) => ([
  'match',
  ['get', 'unread'],
  'true',
  unreadValue,
  fallbackValue,
]);
