import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import { NotificationContainer } from 'react-notifications'
import { Steps } from 'intro.js-react'
// OPTIMIZE IMPORTS
import firebase from 'firebase'
import * as turf from '@turf/turf';

import Header from './Components/Header/Header'
import Dashboard from './Components/Dashboard/Dashboard'
import Help from './Components/Help/Help'
import Sidebar from './Components/Sidebar/Sidebar'
import DistrictFilter from './Components/DistrictFilter/DistrictFilter'
import ActivityFilter from './Components/ActivityFilter/ActivityFilter'
import Form from './Components/Form/Form'
import sports from './assets/data/sports.json'
import districts from './assets/data/districts.json'

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA'

firebase.initializeApp({
  apiKey: "AIzaSyATMuKsWD1n7aeeyOYO1aVZvkFIc9bHNQA",
  authDomain: "recomendador-534fb.firebaseapp.com",
  databaseURL: "https://recomendador-534fb.firebaseio.com",
  projectId: "recomendador-534fb",
  storageBucket: "recomendador-534fb.appspot.com",
  messagingSenderId: "428207234830"
})

const data = {
  "type": "FeatureCollection",
  "features": [
    { "type": "Feature", "properties": { "sport": "Cycling", "type":"punctual", "id": "abc" }, "geometry": { "type": "LineString", "coordinates": [[-4.445852597663771, 36.711033630771375], [-4.445135690452562, 36.70989852768696], [-4.44442834200417, 36.708866181302831], [-4.444179814170952, 36.708482337233505], [-4.443037542014427, 36.706907531059549], [-4.441785344085517, 36.704990999114919], [-4.441159245121063, 36.704025564070498], [-4.440767335845603, 36.703523729022649], [-4.440442337909856, 36.703275201189435], [-4.439405212144308, 36.70218072284699], [-4.438635731737612, 36.701425580584512], [-4.436222144126545, 36.70028808780939], [-4.436226923507953, 36.700283308428006], [-4.436226923507953, 36.700283308428006]] } },
    { "type": "Feature", "properties": { "sport": "Cycling", "type":"punctual", "id": "aasda" }, "geometry": { "type": "LineString", "coordinates": [[-4.436375084331603, 36.700359778530533], [-4.436293834847666, 36.700531836261227], [-4.436150453405424, 36.700543784714746], [-4.436045307014447, 36.700574850693897], [-4.43598795443755, 36.700615475435868], [-4.435861300830237, 36.700586799147416], [-4.435777661655596, 36.700586799147416], [-4.435737036913627, 36.700589188838123], [-4.435679684336731, 36.700617865126567], [-4.435455053410553, 36.700472093993625], [-4.434974725579043, 36.700916576464572], [-4.434975293102768, 36.700916304027999]] } },
    { "type": "Feature", "properties": { "sport": "Cycling", "type":"punctual", "id": "dasx" }, "geometry": { "type": "LineString", "coordinates": [[-4.419635257898319, 36.717488975711646], [-4.418508275974476, 36.717327978293959], [-4.413819226184201, 36.718615957635492], [-4.4131148624818, 36.717871344578668], [-4.413094737804588, 36.717569474420493], [-4.415227953589005, 36.71396715719964], [-4.415187704234582, 36.714027531231274]] } },
    { "type": "Feature", "properties": { "sport": "Parkour", "type":"punctual", "id": "oajdoa" }, "geometry": { "type": "Point", "coordinates": [-4.444313611851205, 36.692268466360197] } },
    { "type": "Feature", "properties": { "sport": "Parkour", "type":"punctual", "id": "oisdoa" }, "geometry": { "type": "Point", "coordinates": [-4.42565667861847, 36.716594997677795] } },
    { "type": "Feature", "properties": { "sport": "Parkour", "type":"punctual", "id": "kasjda" }, "geometry": { "type": "Point", "coordinates": [-4.426302749097907, 36.716551047305046] } },
    { "type": "Feature", "properties": { "sport": "Parkour", "type":"punctual", "id": "adasdaj" }, "geometry": { "type": "Point", "coordinates": [-4.415655762280471, 36.718832696936552] } },
    { "type": "Feature", "properties": { "sport": "Running", "type":"punctual", "id": "aodakspd" }, "geometry": { "type": "LineString", "coordinates": [[-4.445560873316006, 36.684192697265239], [-4.445037631708508, 36.685118432416971], [-4.444886696629421, 36.685198931125818], [-4.444474140746586, 36.685923419505428], [-4.444494265423797, 36.685943544182642], [-4.444031397847933, 36.686818967641337], [-4.443860338091636, 36.68688940401158], [-4.443427657531589, 36.687684328761435], [-4.443437719870195, 36.687815139163305], [-4.442914478262696, 36.688740874315037], [-4.442713231490582, 36.688841497701091], [-4.442159802867266, 36.68979741986864], [-4.442159802867266, 36.689908105593304], [-4.441988743110969, 36.690230100428685], [-4.441797558677459, 36.690350848491953], [-4.44167177944489, 36.690612469295708], [-4.441691904122102, 36.690778497882704], [-4.441224005376935, 36.691573422632551], [-4.441068039128546, 36.691628765494883], [-4.440650452076408, 36.692363316213104], [-4.440675607922922, 36.692519282461497], [-4.440509579335928, 36.692780903265245], [-4.440353613087539, 36.692841277296878], [-4.439915901358189, 36.693590921523004], [-4.439714654586073, 36.694053789098867], [-4.439538563660473, 36.694114163130507], [-4.439105883100426, 36.694778277478484], [-4.439105883100426, 36.694959399573385], [-4.4388845116511, 36.69526126973156], [-4.438703389556196, 36.695331706101797], [-4.438230459641727, 36.696015945126987], [-4.438230459641727, 36.696176942544675], [-4.437687093357018, 36.696981929633139], [-4.437505971262114, 36.697022178987559], [-4.436962604977404, 36.697766792044384], [-4.435574002249814, 36.699678636379474], [-4.435332506123276, 36.699598137670627], [-4.435030635965103, 36.699598137670627], [-4.434889763224623, 36.699759135088321], [-4.434809264515777, 36.699960381860436], [-4.434869638547411, 36.700222002664184], [-4.433320038402128, 36.702435717157449], [-4.431126448586077, 36.705373920030326], [-4.429466162716129, 36.70727570202682], [-4.426477648150224, 36.710606336105322], [-4.42648771048883, 36.710626460782528]] } },
    { "type": "Feature", "properties": { "sport": "Running", "type":"punctual", "id": "pakdpaos" }, "geometry": { "type": "LineString", "coordinates": [[-4.4264273364572, 36.710646585459735], [-4.426296526055325, 36.715979624920777], [-4.426205965007876, 36.717851219901434], [-4.426165715653453, 36.718153090059609], [-4.425873907833886, 36.718917827793646], [-4.425733035093406, 36.719581942141623], [-4.425622349368743, 36.720286305844027], [-4.425672661061771, 36.720950420192004], [-4.425823596140858, 36.721845968327912], [-4.426477648150231, 36.725971527156283]] } },
    { "type": "Feature", "properties": { "sport": "Running", "type":"punctual", "id": "opaidpas" }, "geometry": { "type": "LineString", "coordinates": [[-4.42565253638456, 36.711713193351962], [-4.425783346786434, 36.714591022193197], [-4.425753159770617, 36.715738128794257], [-4.425682723400377, 36.716683988623195], [-4.425607255860834, 36.717740534176791], [-4.425521725982685, 36.718465022556408], [-4.425320479210571, 36.719204604443931], [-4.425129294777061, 36.720095121410537], [-4.425229918163119, 36.721121479948323], [-4.425642474045953, 36.726041963526527]] } },
    { "type": "Feature", "properties": { "sport": "Running", "type":"punctual", "id": "oadpapdas" }, "geometry": { "type": "LineString", "coordinates": [[-4.419601725065577, 36.717632737370501], [-4.418882293083513, 36.717288661205167], [-4.413658591300696, 36.718649326040811], [-4.413017358447117, 36.717804775453168], [-4.41300171862142, 36.717742216150384], [-4.415206934044705, 36.714223255368545], [-4.414534421539732, 36.713691501294846], [-4.413032998272812, 36.710188180338697], [-4.413001718621418, 36.709586047049356], [-4.413181576616934, 36.708905714631534], [-4.413650771387846, 36.708100263608138]] } },
    { "type": "Feature", "properties": { "sport": "Yoga", "type":"punctual", "id": "ioadkjaos" }, "geometry": { "type": "Point", "coordinates": [-4.413995311857809, 36.712571574445178] } },
    { "type": "Feature", "properties": { "sport": "Yoga", "type":"punctual", "id": "odioapda" }, "geometry": { "type": "Point", "coordinates": [-4.432187840371991, 36.706106176787976] } },
    { "type": "Feature", "properties": { "sport": "Yoga", "type":"punctual", "id": "jdaodsjao" }, "geometry": { "type": "Point", "coordinates": [-4.435970785809722, 36.699692364750348] } }
  ]
};


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
      element: '.navbar-color-on-scroll',
      intro: 'Bienvenido a PIC Málaga. En esta barra encontrarás los filtros necesarios para buscar las iniciativas creadas en la ciudad.',
    },
    {
      element: '.mapbox-gl-draw_point',
      intro: 'Utiliza el lápiz para añadir la iniciativa al mapa. Antes deberás estar registrado en la plataforma.',
    },

  ];

class App extends Component {

  constructor(props) {
    super(props);
    this.toggleComponent = this.toggleComponent.bind(this)
    this.updateFilters = this.updateFilters.bind(this)
    this.clearFilters = this.clearFilters.bind(this)
    this.state = {
      header: {
        visible: false
      },
      activityFilter: {
        visible: false,
        data: [],
        selected: []
      },
      districtFilter: {
        visible: false,
        data: [],
        selected: []
      },
      help: {
        visible: false
      },
      dashboard: {
        visible: false
      },
      sidebar: {
        visible: true
      },
      form: {
        visible: false,
        data: [],
        feature: turf.feature({type: 'Point', coordinates: [0,0]})
      },
      steps: {
        visible: true
      },
      data: {
        activities: turf.featureCollection([]),
        districts: districts,
        sports: sports.list.map(sport => sport.name).sort((a, b) => a.localeCompare(b))
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

  clearFilters = () => {
    this.setState({ activityFilter: {...this.state.activityFilter, selected: [], visible: false }, districtFilter: {...this.state.districtFilter, selected: [], visible: false } })
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user: user })
      } else {
        this.setState({ user: null })
      }
    });

    this.setState({
      activityFilter: {
        ...this.state.activityFilter,
        data: this.state.data.sports,
      },
      districtFilter: {
        ...this.state.districtFilter,
        data: this.state.data.districts.features.map(district => district.properties.name).sort((a, b) => a.localeCompare(b))
      },
      form: {
        ...this.state.form,
        data: this.state.data.sports
      },
      data: {
        ...this.state.data,
        activities: data
      }
    })

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/light-v9',
      center: [-4.4214, 36.7213],
      zoom: 12
    });

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
        data: this.state.data.activities
      });

      this.map.addSource('districts', {
        type: 'geojson',
        data: this.state.data.districts
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

      this.map.addLayer({
        id: 'pointActivities',
        source: 'activities',
        type: 'circle',
        paint: {
          'circle-radius': {
            'base': 1.75,
            'stops': [[12, 2], [22, 180]]
          },

          'circle-color': [
            'match',
            ['get', 'sport'],
            'Cycling', '#fbb03b',
            'Parkour', '#223b53',
            'Running', '#e55e5e',
            'Yoga', '#3bb2d0',
            '#Ff8326'
          ]
        }
      });

      ['pointActivities', 'lineActivities'].forEach(activityType => {
        this.map.on('mouseenter', activityType, () => {
          this.map.getCanvas().style.cursor = 'pointer';
        });

        this.map.on('mouseleave', activityType, () => {
          this.map.getCanvas().style.cursor = '';
        });

        this.map.on('click', activityType, e => {
          let featureProperties = e.features[0].properties;
          console.log(featureProperties)
        });
      })

      this.map.on('draw.create', e => {
        let newFeature = e.features[0];
        this.setState({form: {...this.state.form, feature: newFeature, visible: !this.state.form.visible}})
      });
    });
  }

  componentDidUpdate() {
    if (this.map.getSource('activities') !== undefined) {
      let activityFilter = null,
        districtFilter = ['match', ['get', 'name'], 'none', true, false],
        sourceData = this.state.data.activities;

      if (this.state.districtFilter.selected.length > 0) {
        districtFilter = ['match', ['get', 'name'], [...this.state.districtFilter.selected], true, false];

        const districtsCollection = turf.featureCollection(
          this.state.data.districts.features
            .filter(district => this.state.districtFilter.selected.includes(district.properties.name))
        ),

          linesID = Array.from(new Set(turf.pointsWithinPolygon(
            turf.explode(
              turf.featureCollection(
                this.state.data.activities.features
                  .filter(feature => feature.geometry.type === 'LineString')
              )
            ),
            districtsCollection
          ).features.map(feature => feature.properties.id))),

          lines = this.state.data.activities.features.filter(feature => linesID.includes(feature.properties.id)),

          points = turf.pointsWithinPolygon(
            turf.featureCollection(this.state.data.activities.features.filter(feature => feature.geometry.type === 'Point')),
            districtsCollection
          ).features;

        sourceData = turf.featureCollection([...lines, ...points])
      }

      if (this.state.activityFilter.selected.length > 0) {
        activityFilter = ['match', ['get', 'sport'], [...this.state.activityFilter.selected], true, false];
      }

      this.map.getSource('activities').setData(sourceData);

      this.map.setFilter('districts', districtFilter);

      ['pointActivities', 'lineActivities'].forEach(layer => {
        this.map.setFilter(layer, activityFilter)
      })

    }
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    return (
      <div style={style.map} ref={el => this.mapContainer = el} >
        <Header
          {...this.state.header}
          user={{ ...this.state.user }}
          toggleComponent={this.toggleComponent}
        />
        <Dashboard
          {...this.state.dashboard}
          user={{ ...this.state.user }}
          toggleComponent={this.toggleComponent}
        />
        <Help
          {...this.state.help}
          toggleComponent={this.toggleComponent}
        />
        <DistrictFilter
          {...this.state.districtFilter}
          toggleComponent={this.toggleComponent}
          updateFilters={this.updateFilters}
          clearFilters={this.clearFilters}
        />
        <ActivityFilter
          {...this.state.activityFilter}
          toggleComponent={this.toggleComponent}
          updateFilters={this.updateFilters}
          clearFilters={this.clearFilters}
        />
        <Sidebar
          {...this.state.sidebar}
          toggleComponent={this.toggleComponent}
        />
        <Form
          {...this.state.form}
          toggleComponent={this.toggleComponent}
        />
        <NotificationContainer />
        <Steps
          enabled={this.state.steps.visible}
          steps={steps}
          initialStep={initialStep}
          onExit={() => this.toggleComponent('steps')}
        />
      </div>
    );
  }
}

export default App;