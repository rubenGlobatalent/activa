import React, { useRef, useState, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import { connect } from 'react-redux'
import { navigate } from "@reach/router"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import * as turf from '@turf/turf'

import { store, selectActivity } from '../../redux/store'
import sports from '../../assets/data/sports.json'

const reqSvgs = require.context('../../assets/icons', true, /\.png$/)
const sportsIcons = sports.list.map(sport => ({
    ...sport,
    icon: reqSvgs(`./${sport.key}.png`)
}))

const style = {
    map: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: '100%'
    }
},
    mapStateToProps = state => ({
        activities: state.activities,
        districts: state.districts
    })

const Map = props => {

    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);

    useEffect(() => {
        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN

        const handleInteraction = (e, data) => {

            let properties = e.features[0].properties,
                geometry,
                feature
            if (properties.pointInLine) {
                geometry = data.features.find(feature => feature.properties.id === properties.id).geometry
                feature = turf.lineString(geometry.coordinates, properties)
            }
            else {
                geometry = e.features[0].geometry
                if (geometry.type === 'Point') {
                    feature = turf.point(geometry.coordinates, properties)
                }
                else if (geometry.type === 'LineString') {
                    feature = turf.lineString(geometry.coordinates, properties)
                }
            }

            navigate(`/activity/${feature.properties.id}`)
        },
            initializeMap = ({ setMap, mapContainer, sources }) => {
                const map = new mapboxgl.Map({
                    container: mapContainer.current,
                    style: 'mapbox://styles/mapbox/light-v9',
                    center: [-4.4214, 36.7213],
                    zoom: 12,
                    attributionControl: false
                }),
                    attribution = new mapboxgl.AttributionControl({ customAttribution: ['Developed by <a href="https://cartometrics.com" target="_blank"><strong>Cartometrics</strong></a>'] }),
                    navigation = new mapboxgl.NavigationControl(),
                    draw = new MapboxDraw({
                        controls: {
                            combine_features: false,
                            uncombine_features: false,
                            polygon: false
                        }
                    }),
                    activitiesTypes = ['pointActivities', 'pointInLineActivities', 'lineActivities']


                map.on("load", () => {
                    setMap(map)
                    map.addControl(attribution, 'bottom-right')
                    map.addControl(navigation, 'bottom-right')
                    map.addControl(draw, 'bottom-right')

                    sportsIcons.forEach(icon => {
                        map.loadImage(icon.icon, (error, image) => {
                            if (error) throw error;
                            map.addImage(icon.name, image);
                        })
                    })

                    let layers = map.getStyle().layers;
                    let labelLayerId;
                    for (let i = 0; i < layers.length; i++) {
                        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
                            labelLayerId = layers[i].id;
                            break;
                        }
                    }

                    map.addLayer({
                        'id': '3d-buildings',
                        'source': 'composite',
                        'source-layer': 'building',
                        'filter': ['==', 'extrude', 'true'],
                        'type': 'fill-extrusion',
                        'minzoom': 15,
                        'paint': {
                            'fill-extrusion-color': '#aaa',
                            'fill-extrusion-height': [
                                'interpolate', ['linear'], ['zoom'],
                                15, 0,
                                15.05, ['get', 'height']
                            ],
                            'fill-extrusion-base': [
                                'interpolate', ['linear'], ['zoom'],
                                15, 0,
                                15.05, ['get', 'min_height']
                            ],
                            'fill-extrusion-opacity': 0.6
                        }
                    }, labelLayerId)

                    map.addSource('activities', {
                        type: 'geojson',
                        data: sources.activities
                    })

                    map.addSource('districts', {
                        type: 'geojson',
                        data: sources.districts
                    })

                    map.addLayer({
                        id: 'districts',
                        source: 'districts',
                        type: 'fill',
                        'paint': {
                            'fill-color': '#00aec7',
                            'fill-opacity': 0.2
                        },
                        filter: ['match', ['get', 'name'], ['none'], true, false]
                    })

                    map.addLayer({
                        id: 'lineActivities',
                        source: 'activities',
                        type: 'line',
                        'layout': {
                            'line-join': 'round',
                            'line-cap': 'round'
                        },
                        'paint': {
                            'line-color': '#AAA',
                            'line-width': 2
                        }
                    })

                    map.addLayer({
                        id: 'pointActivities',
                        source: 'activities',
                        type: 'symbol',
                        "layout": {
                            "icon-image": ['get', 'sport'],
                            "icon-size": 0.75,
                            "icon-allow-overlap": true
                        },
                        "filter": ["==", ['get', 'pointInLine'], false]
                    })

                    map.addLayer({
                        id: 'pointInLineActivities',
                        source: 'activities',
                        type: 'symbol',
                        "layout": {
                            "icon-image": ['get', 'sport'],
                            "icon-size": 0.75,
                            "icon-allow-overlap": false
                        },
                        "filter": ["==", ['get', 'pointInLine'], true]
                    })

                    map.on('draw.create', e => {
                        const feature = e.features[0]
                        store.dispatch(selectActivity(feature))
                        navigate('/new')
                    })

                    activitiesTypes.forEach(activityType => {
                        map.on('mouseenter', activityType, () => {
                            map.getCanvas().style.cursor = 'pointer'
                        })

                        map.on('mouseleave', activityType, () => {
                            map.getCanvas().style.cursor = ''
                        })

                        map.on('click', activityType, e => handleInteraction(e, props.activities))

                        map.on('touchend', activityType, e => handleInteraction(e, props.activities))
                    })
                })

            }

        initializeMap({
            setMap,
            mapContainer,
            sources: {
                districts: props.districts,
                activities: props.activities
            }
        })

    }, []);

    return (
        <div style={style.map} ref={el => (mapContainer.current = el)} >
            {props.children}
            <div className="mapboxgl-control-container" >
                <div className="mapboxgl-ctrl-bottom-right" style={{ marginBottom: '13.75rem' }}>
                    <div className="mapboxgl-ctrl-group mapboxgl-ctrl">
                        <button className="icon legend is-size-5" onClick={() => props.toggleComponent('legend')}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect(
    mapStateToProps,
    null
)(Map)