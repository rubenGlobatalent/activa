import React, { Component } from 'react'
import ReactGA from 'react-ga'
import mapboxgl from 'mapbox-gl'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import { NotificationContainer } from 'react-notifications'
import { Steps } from 'intro.js-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { Router } from "@reach/router"
import { store, setActivities, setUser, selectActivity } from './redux/store'
// OPTIMIZE IMPORTS
import firebase from 'firebase'
import * as turf from '@turf/turf'

import Header from './Components/Header/Header'
import Dashboard from './Components/User/User'
import Help from './Components/Help/Help'
import Sidebar from './Components/Sidebar/Sidebar'
import Districts from './Components/Filters/Districts'
import Activities from './Components/Filters/Activities'
import Form from './Components/Form/Form'
import Legend from './Components/Legend/Legend'
import sports from './assets/data/sports.json'

ReactGA.initialize(process.env.REACT_APP_GA_ID)
ReactGA.pageview(window.location.pathname + window.location.search)

const reqSvgs = require.context('./assets/icons', true, /\.png$/)
const sportsIcons = sports.list.map(sport => ({
  ...sport,
  icon: reqSvgs(`./${sport.key}.png`)
}))

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET
})

const mapStateToProps = state => ({
  activities: state.activities,
  districts: state.districts,
  selectedActivity: state.selectedActivity,
})

const style = {
  map: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '100%'
  }
};

const initialStep = 0,
  steps = [
    {
      element: '.navbar.is-fixed-top',
      intro: 'Bienvenido a Activa Málaga. En esta barra podrás seleccionar los filtros de actividad deportiva y distrito, así como iniciar sesión o registrarte.',
    },
    {
      element: '.mapbox-gl-draw_point',
      intro: 'Con este botón podrás registrar los puntos de interés donde realizas la actividad deportiva.',
    },
    {
      element: '.mapbox-gl-draw_line',
      intro: 'Si tu actividad deportiva implica un recorrido podrás crearlo mediante una sucesión de puntos. Haz doble click, o pulsa dos veces, para terminar de dibujar el recorrido.',
    },
    {
      element: '.mapbox-gl-draw_trash',
      intro: 'Utiliza este botón para eliminar un punto o recorrido que estés creando.',
    },
    {
      element: '.icon.legend',
      intro: 'Pulsando este botón podrás visualizar una leyenda que relaciona los iconos representados en el mapa con cada actividad deportiva.',
    }
  ];

class App extends Component {

  constructor(props) {
    super(props);
    this.toggleComponent = this.toggleComponent.bind(this)
    this.updateFilters = this.updateFilters.bind(this)
    this.deleteDrawnPoint = this.deleteDrawnPoint.bind(this)
    this.displayStepsAfterHelp = this.displayStepsAfterHelp.bind(this)
    this.editFeature = this.editFeature.bind(this)
    this.state = {
      activityFilter: {
        data: [],
        selected: []
      },
      districtFilter: {
        data: [],
        selected: []
      },
      sidebar: {
        visible: false,
        data: {},
        geom: {}
      },
      form: {
        visible: false,
        data: [],
        feature: turf.feature({ type: 'Point', coordinates: [0, 0] })
      },
      steps: {
        visible: false
      },
      legend: {
        visible: false
      },
      data: {
        sports: sports.list.map(sport => sport.name)
      },
      user: null,
    }
  }

  toggleComponent = component => {
    this.setState({ [component]: { ...this.state[component], visible: !this.state[component].visible } })
  };

  updateFilters = (component, selected) => {
    this.setState({ [component]: { ...this.state[component], selected: selected, visible: !this.state[component].visible } })
  };

  clearFilters = component => {
    this.setState({ [component]: { ...this.state[component], selected: [], visible: false } })
  };

  displayStepsAfterHelp = () => {
    this.setState({ steps: { visible: true } })
  }

  stepsOnExit = () => {
    this.setState({ steps: { visible: false } })
  }

  deleteDrawnPoint = id => {
    this.draw.delete(id)
  }

  editFeature = feature => {
    this.setState({ form: { ...this.state.form, feature: feature, visible: !this.state.form.visible }, sidebar: { ...this.state.sidebar, visible: !this.state.sidebar.visible } })
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        store.dispatch(setUser({displayName: user.displayName, email: user.email, uid: user.uid}))
        this.setState({ user: user })
      } else {
        store.dispatch(setUser(null))
        this.setState({ user: null })
      }
    });

    firebase.firestore().collection('sports').onSnapshot(async querySnapshot => {
      const snapshot = await querySnapshot,

        features = snapshot.docs.map(doc => {
          let data = doc.data()
          data.properties.id = doc.id
          data.properties.pointInLine = false
          if (turf.getType(data) === 'LineString') {
            data.geometry.coordinates = Object.values(data.geometry.coordinates)
          }

          return data
        }),

        exploded = features
          .filter(feature => turf.getType(feature) === 'LineString')
          .map(feature => turf.explode(feature).features)
          .flat()
          // Deep clone properties to be able to set pointInLine property immutably
          .map(feature => {
            const propertiesDeepClone = { ...feature.properties }
            feature.properties = propertiesDeepClone
            return feature
          })
          /* Add property pointInLine to be able to separate the pointActivities layer
          from the pointInLineActivities layer */
          .map(feature => {
            feature.properties.pointInLine = true
            return feature
          })

      store.dispatch(setActivities(turf.featureCollection([...features, ...exploded])))
    })

    this.setState({
      activityFilter: {
        ...this.state.activityFilter,
        data: this.state.data.sports,
      },
      districtFilter: {
        ...this.state.districtFilter,
        data: this.props.districts.features.map(district => district.properties.name).sort((a, b) => a.localeCompare(b))
      },
      form: {
        ...this.state.form,
        data: this.state.data.sports
      },
      data: {
        ...this.state.data,
      }
    })

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/light-v9',
      center: [-4.4214, 36.7213],
      zoom: 12,
      attributionControl: false
    });

    this.map.addControl(new mapboxgl.AttributionControl({ customAttribution: ['Developed by <a href="https://cartometrics.com" target="_blank"><strong>Cartometrics</strong></a>'] }), 'bottom-right');

    this.map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    this.draw = new MapboxDraw({
      controls: {
        combine_features: false,
        uncombine_features: false,
        polygon: false
      }
    });

    this.map.addControl(this.draw, 'bottom-right');

    this.map.on('load', () => {

      let layers = this.map.getStyle().layers;
      let labelLayerId;
      for (let i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
          labelLayerId = layers[i].id;
          break;
        }
      }

      this.map.addLayer({
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
      }, labelLayerId);

      this.map.addSource('activities', {
        type: 'geojson',
        data: this.props.activities
      });

      this.map.addSource('districts', {
        type: 'geojson',
        data: this.props.districts
      });

      this.map.addLayer({
        id: 'districts',
        source: 'districts',
        type: 'fill',
        'paint': {
          'fill-color': '#00aec7',
          'fill-opacity': 0.2
        },
        filter: ['match', ['get', 'name'], ['none'], true, false]
      });

      this.map.addLayer({
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
      });

      sportsIcons.forEach(icon => {
        this.map.loadImage(icon.icon, (error, image) => {
          if (error) throw error;
          this.map.addImage(icon.name, image);
        })
      })
      this.map.addLayer({
        id: 'pointActivities',
        source: 'activities',
        type: 'symbol',
        "layout": {
          "icon-image": ['get', 'sport'],
          "icon-size": 0.75,
          "icon-allow-overlap": true
        },
        "filter": ["==", ['get', 'pointInLine'], false]
      });

      this.map.addLayer({
        id: 'pointInLineActivities',
        source: 'activities',
        type: 'symbol',
        "layout": {
          "icon-image": ['get', 'sport'],
          "icon-size": 0.75,
          "icon-allow-overlap": false
        },
        "filter": ["==", ['get', 'pointInLine'], true]
      });

      ['pointActivities', 'pointInLineActivities', 'lineActivities'].forEach(activityType => {
        this.map.on('mouseenter', activityType, () => {
          this.map.getCanvas().style.cursor = 'pointer';
        });

        this.map.on('mouseleave', activityType, () => {
          this.map.getCanvas().style.cursor = '';
        });

        this.map.on('click', activityType, e => {
          let properties = e.features[0].properties,
            geometry,
            feature
          if (properties.pointInLine) {
            geometry = this.props.activities.features.find(feature => feature.properties.id === properties.id).geometry
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

          store.dispatch(selectActivity(feature))

          this.setState({ sidebar: { visible: true } })
        });

        this.map.on('touchend', activityType, e => {
          let properties = e.features[0].properties;
          this.setState({ sidebar: { data: properties, visible: true } })
        });
      })

      this.map.on('draw.create', e => {
        let feature = e.features[0];
        store.dispatch(selectActivity(feature))
        this.setState({ form: { ...this.state.form, visible: !this.state.form.visible } })
      });
    });
  }

  componentDidUpdate() {
    if (this.map.getSource('activities') !== undefined) {
      let activityFilter = null,
        districtFilter = ['match', ['get', 'name'], 'none', true, false],
        sourceData = this.props.activities;

      if (this.state.districtFilter.selected.length > 0) {
        districtFilter = ['match', ['get', 'name'], [...this.state.districtFilter.selected], true, false];

        const districtsCollection = turf.featureCollection(
          this.props.districts.features
            .filter(district => this.state.districtFilter.selected.includes(district.properties.name))
        ),

          linesID = Array.from(new Set(turf.pointsWithinPolygon(
            turf.explode(
              turf.featureCollection(
                this.props.activities.features
                  .filter(feature => feature.geometry.type === 'LineString')
              )
            ),
            districtsCollection
          ).features.map(feature => feature.properties.id))),

          lines = this.props.activities.features.filter(feature => linesID.includes(feature.properties.id)),

          points = turf.pointsWithinPolygon(
            turf.featureCollection(this.props.activities.features.filter(feature => feature.geometry.type === 'Point')),
            districtsCollection
          ).features;

        sourceData = turf.featureCollection([...lines, ...points])
      }

      if (this.state.activityFilter.selected.length > 0) {
        activityFilter = ['match', ['get', 'sport'], [...this.state.activityFilter.selected], true, false];
      }

      this.map.getSource('activities').setData(sourceData);

      this.map.setFilter('districts', districtFilter);

      const pointActivitiesFilter = ["==", ['get', 'pointInLine'], false];
      const pointInLineActivitiesFilter = ["==", ['get', 'pointInLine'], true];

      if (activityFilter === null) {
        this.map.setFilter('lineActivities', activityFilter);
        this.map.setFilter('pointActivities', pointActivitiesFilter);
        this.map.setFilter('pointInLineActivities', pointInLineActivitiesFilter);
      } else {
        this.map.setFilter('lineActivities', activityFilter);
        this.map.setFilter('pointActivities', ['all', activityFilter, pointActivitiesFilter]);
        this.map.setFilter('pointInLineActivities', ['all', activityFilter, pointInLineActivitiesFilter]);
      }

    }
  }

  componentWillUnmount() {
    this.map.remove();
  }
  render() {
    return (
      <div style={style.map} ref={el => this.mapContainer = el} >
        <Header />
        <NotificationContainer />
        <Router>
          <Dashboard path='/user' />
          <Help path='/help' displayStepsAfterHelp={this.displayStepsAfterHelp} />
          <Districts
            {...this.state.districtFilter}
            updateFilters={this.updateFilters}
            clearFilters={this.clearFilters}
            path='/districts'
          />
          <Activities
            {...this.state.activityFilter}
            updateFilters={this.updateFilters}
            clearFilters={this.clearFilters}
            path='/activities'
          />
        </Router>

        {this.state.sidebar.visible ? <Sidebar {...this.state.sidebar} toggleComponent={this.toggleComponent} editFeature={this.editFeature} /> : null}

        <Form
          {...this.state.form}
          toggleComponent={this.toggleComponent}
          deleteDrawnPoint={this.deleteDrawnPoint}
        />
        <Steps
          enabled={this.state.steps.visible}
          steps={steps}
          initialStep={initialStep}
          onExit={this.stepsOnExit}
          options={{
            nextLabel: 'Siguiente',
            prevLabel: 'Anterior',
            skipLabel: 'Saltar',
            doneLabel: 'Hecho'
          }}
        />
        <Legend
          {...this.state.legend}
          toggleComponent={this.toggleComponent}
        />
        {/* TEMPORAL, CONVERT TO COMPONENT ALONG WITH MAP */}
        <div className="mapboxgl-control-container" >
          <div className="mapboxgl-ctrl-bottom-right" style={{ marginBottom: '13.75rem' }}>
            <div className="mapboxgl-ctrl-group mapboxgl-ctrl">
              <button className="icon legend is-size-5" onClick={() => this.toggleComponent('legend')}>
                <FontAwesomeIcon icon={faInfoCircle} />
              </button>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(App)