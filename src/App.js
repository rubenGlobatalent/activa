import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import * as firebase from 'firebase';
require('dotenv').config();

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

firebase.initializeApp({
  apiKey: 'AIzaSyAPcJPwwsRESS3m5NNvA5PaXTNRkSo3_AM',
  authDomain: 'catedras-uma.firebaseapp.com',
  databaseURL: 'https://catedras-uma.firebaseio.com',
  projectId: 'catedras-uma',
  storageBucket: 'catedras-uma.appspot.com',
  messagingSenderId: '657639469404'
});
firebase.firestore().settings({ timestampsInSnapshots: true });
const data = {
  "type": "FeatureCollection",
  "features": [
    { "type": "Feature", "properties": { "id": 21, "activity": "Ciclismo" }, "geometry": { "type": "MultiLineString", "coordinates": [[[-4.445852597663771, 36.711033630771375], [-4.445135690452562, 36.70989852768696], [-4.44442834200417, 36.708866181302831], [-4.444179814170952, 36.708482337233505], [-4.443037542014427, 36.706907531059549], [-4.441785344085517, 36.704990999114919], [-4.441159245121063, 36.704025564070498], [-4.440767335845603, 36.703523729022649], [-4.440442337909856, 36.703275201189435], [-4.439405212144308, 36.70218072284699], [-4.438635731737612, 36.701425580584512], [-4.436222144126545, 36.70028808780939], [-4.436226923507953, 36.700283308428006], [-4.436226923507953, 36.700283308428006]]] } },
    { "type": "Feature", "properties": { "id": 22, "activity": "Ciclismo" }, "geometry": { "type": "MultiLineString", "coordinates": [[[-4.436375084331603, 36.700359778530533], [-4.436293834847666, 36.700531836261227], [-4.436150453405424, 36.700543784714746], [-4.436045307014447, 36.700574850693897], [-4.43598795443755, 36.700615475435868], [-4.435861300830237, 36.700586799147416], [-4.435777661655596, 36.700586799147416], [-4.435737036913627, 36.700589188838123], [-4.435679684336731, 36.700617865126567], [-4.435455053410553, 36.700472093993625], [-4.434974725579043, 36.700916576464572], [-4.434975293102768, 36.700916304027999]]] } },
    { "type": "Feature", "properties": { "id": 25, "activity": "Ciclismo" }, "geometry": { "type": "MultiLineString", "coordinates": [[[-4.419635257898319, 36.717488975711646], [-4.418508275974476, 36.717327978293959], [-4.413819226184201, 36.718615957635492], [-4.4131148624818, 36.717871344578668], [-4.413094737804588, 36.717569474420493], [-4.415227953589005, 36.71396715719964], [-4.415187704234582, 36.714027531231274]]] } },
    { "type": "Feature", "properties": { "id": 6, "activity": "Parkour" }, "geometry": { "type": "Point", "coordinates": [-4.444313611851205, 36.692268466360197] } },
    { "type": "Feature", "properties": { "id": 7, "activity": "Parkour" }, "geometry": { "type": "Point", "coordinates": [-4.42565667861847, 36.716594997677795] } },
    { "type": "Feature", "properties": { "id": 8, "activity": "Parkour" }, "geometry": { "type": "Point", "coordinates": [-4.426302749097907, 36.716551047305046] } },
    { "type": "Feature", "properties": { "id": 12, "activity": "Parkour" }, "geometry": { "type": "Point", "coordinates": [-4.415655762280471, 36.718832696936552] } },
    { "type": "Feature", "properties": { "id": 23, "activity": "Running" }, "geometry": { "type": "MultiLineString", "coordinates": [[[-4.445560873316006, 36.684192697265239], [-4.445037631708508, 36.685118432416971], [-4.444886696629421, 36.685198931125818], [-4.444474140746586, 36.685923419505428], [-4.444494265423797, 36.685943544182642], [-4.444031397847933, 36.686818967641337], [-4.443860338091636, 36.68688940401158], [-4.443427657531589, 36.687684328761435], [-4.443437719870195, 36.687815139163305], [-4.442914478262696, 36.688740874315037], [-4.442713231490582, 36.688841497701091], [-4.442159802867266, 36.68979741986864], [-4.442159802867266, 36.689908105593304], [-4.441988743110969, 36.690230100428685], [-4.441797558677459, 36.690350848491953], [-4.44167177944489, 36.690612469295708], [-4.441691904122102, 36.690778497882704], [-4.441224005376935, 36.691573422632551], [-4.441068039128546, 36.691628765494883], [-4.440650452076408, 36.692363316213104], [-4.440675607922922, 36.692519282461497], [-4.440509579335928, 36.692780903265245], [-4.440353613087539, 36.692841277296878], [-4.439915901358189, 36.693590921523004], [-4.439714654586073, 36.694053789098867], [-4.439538563660473, 36.694114163130507], [-4.439105883100426, 36.694778277478484], [-4.439105883100426, 36.694959399573385], [-4.4388845116511, 36.69526126973156], [-4.438703389556196, 36.695331706101797], [-4.438230459641727, 36.696015945126987], [-4.438230459641727, 36.696176942544675], [-4.437687093357018, 36.696981929633139], [-4.437505971262114, 36.697022178987559], [-4.436962604977404, 36.697766792044384], [-4.435574002249814, 36.699678636379474], [-4.435332506123276, 36.699598137670627], [-4.435030635965103, 36.699598137670627], [-4.434889763224623, 36.699759135088321], [-4.434809264515777, 36.699960381860436], [-4.434869638547411, 36.700222002664184], [-4.433320038402128, 36.702435717157449], [-4.431126448586077, 36.705373920030326], [-4.429466162716129, 36.70727570202682], [-4.426477648150224, 36.710606336105322], [-4.42648771048883, 36.710626460782528]]] } },
    { "type": "Feature", "properties": { "id": 30, "activity": "Running" }, "geometry": { "type": "MultiLineString", "coordinates": [[[-4.4264273364572, 36.710646585459735], [-4.426296526055325, 36.715979624920777], [-4.426205965007876, 36.717851219901434], [-4.426165715653453, 36.718153090059609], [-4.425873907833886, 36.718917827793646], [-4.425733035093406, 36.719581942141623], [-4.425622349368743, 36.720286305844027], [-4.425672661061771, 36.720950420192004], [-4.425823596140858, 36.721845968327912], [-4.426477648150231, 36.725971527156283]]] } },
    { "type": "Feature", "properties": { "id": 31, "activity": "Running" }, "geometry": { "type": "MultiLineString", "coordinates": [[[-4.42565253638456, 36.711713193351962], [-4.425783346786434, 36.714591022193197], [-4.425753159770617, 36.715738128794257], [-4.425682723400377, 36.716683988623195], [-4.425607255860834, 36.717740534176791], [-4.425521725982685, 36.718465022556408], [-4.425320479210571, 36.719204604443931], [-4.425129294777061, 36.720095121410537], [-4.425229918163119, 36.721121479948323], [-4.425642474045953, 36.726041963526527]]] } },
    { "type": "Feature", "properties": { "id": 33, "activity": "Running" }, "geometry": { "type": "MultiLineString", "coordinates": [[[-4.419601725065577, 36.717632737370501], [-4.418882293083513, 36.717288661205167], [-4.413658591300696, 36.718649326040811], [-4.413017358447117, 36.717804775453168], [-4.41300171862142, 36.717742216150384], [-4.415206934044705, 36.714223255368545], [-4.414534421539732, 36.713691501294846], [-4.413032998272812, 36.710188180338697], [-4.413001718621418, 36.709586047049356], [-4.413181576616934, 36.708905714631534], [-4.413650771387846, 36.708100263608138]]] } },
    { "type": "Feature", "properties": { "id": null, "activity": "Yoga" }, "geometry": { "type": "Point", "coordinates": [-4.413995311857809, 36.712571574445178] } },
    { "type": "Feature", "properties": { "id": null, "activity": "Yoga" }, "geometry": { "type": "Point", "coordinates": [-4.432187840371991, 36.706106176787976] } },
    { "type": "Feature", "properties": { "id": null, "activity": "Yoga" }, "geometry": { "type": "Point", "coordinates": [-4.435970785809722, 36.699692364750348] } }
  ]
}

class Header extends Component {
  render() {
    const logged = this.props.email ? <span>{this.props.email} </span> : '';
    const buttons = this.props.buttons.map((button, key) => {
      return (
        <li className='nav-item'>
          <button type='button' className='btn btn-primary' key={key} onClick={() => this.props.handler({ type: 'filter', title: button.name, id: button.id, options: button.filters })}>{button.name}</button>
        </li>
      );

    });
    return (
      <header>
        <nav className='navbar navbar-color-on-scroll fixed-top navbar-expand-lg'>
          <div className='container'>
            <div className='navbar-translate'>
              <a className='navbar-brand' href='/'>
              <img class='logoImg' src={process.env.PUBLIC_URL + 'assets/img/logo.png'} style={{height: "39px",paddingRight: "6px"}}/>
                {this.props.title} </a>
              <button className='navbar-toggler' type='button' aria-expanded='false' aria-label='Toggle navigation'>
                <span className='sr-only'>Toggle navigation</span>
                <span className='navbar-toggler-icon'></span>
                <span className='navbar-toggler-icon'></span>
                <span className='navbar-toggler-icon'></span>
              </button>
            </div>
            <div className='collapse navbar-collapse'>
              <ul className='navbar-nav ml-auto'>
                {buttons}
                {/* <li className='nav-item'>

                  <form className="form-inline ml-auto nav-item">
                    <div className="form-group has-black">
                      <input type="text" className="form-control" placeholder="Search" />
                    </div>
                    <span className="btn btn-black btn-raised btn-fab btn-round">
                      <i className="material-icons">search</i>
                    </span>
                  </form>
                </li> */}
                <li className='nav-item'>
                  <a className='nav-link' onClick={() => this.props.handler({ type: 'help', title: 'Málaga Activa', subtitle: '¿QUIERES HACER DEPORTE AL AIRE LIBRE EN TU CIUDAD? ¿CONOCES LUGARES EN EL ESPACIO PÚBLICO DONDE REALIZAR ACTIVIDADES DEPORTIVAS?', description: '“Atlas de Málaga Activa” se trata de una plataforma digital que identifica zonas urbanas con actividad deportiva recreativa, desarrollada fuera de los equipamientos deportivos reglados, para la consulta de cualquier ciudadano. Si eres amante de una práctica deportiva y no conoces lugares donde poder desarrollarla en la ciudad, consulta la plataforma para ver los puntos donde actualmente se realiza. En el caso de conocer otros, no dudes en registrarlos para compartir y ayudar a otros ciudadanos a conocer nuevos lugares, con el objetivo final de potenciar el deporte en el espacio público de la ciudad de  Málaga.', })}>
                    <i className='material-icons'>help</i>
                  </a>
                </li>
                <li className='nav-item'><a className='nav-link' onClick={() => this.props.handler({ type: 'login', title: 'Accede o crea tu cuenta' })}><i className='material-icons'>person</i>{logged}</a></li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    )
  }
}

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleLogin(event) {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
          .then(response => {
            this.props.userLog({ email: response.user.email, uid: response.user.uid });
            this.props.handler(false);
            NotificationManager.success('¡Cuenta creada!')
          })
          .catch(error => {
            NotificationManager.error('Ha habido un error al acceder. Comprueba tu conexión e intenta acceder de nuevo')
          })
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(response => {
              this.props.userLog({ email: response.user.email, uid: response.user.uid });
              this.props.handler(false);
              NotificationManager.success('¡Autenticación correcta!')
            })
            .catch (error => {
              NotificationManager.error('La contraseña no es correcta')
            })
        }
        else {
          NotificationManager.error('No se ha podido crear la cuenta');
        }
      });
    event.preventDefault();
  }

  handleLogout(event) {
    firebase.auth().signOut().then(() => {
      this.props.userLog({ email: null, uid: null });
      this.props.handler(false);
    }).catch((error) => {
      NotificationManager.error('Algo salio mal...')
    });
    NotificationManager.success('Desconectado. ¡Vuelve pronto!');
    event.preventDefault();
  }

  render() {
    const modalHeader = <div className='modal-header'> <h5 className='modal-title'>{this.props.title}</h5><button type='button' className='close' aria-label='Close' onClick={() => this.props.handler(false)}><span aria-hidden='true'>&times;</span></button></div>;

    if (this.props.email) {
      return (
        <form onSubmit={this.handleLogout}>
          <div className='modal fade show' style={{ display: 'block', overflow: 'auto' }} tabIndex='-1'>
            <div className='modal-dialog modal-login' role='document'>
              <div className='modal-content'>
                <div className='card card-signup card-plain'>
                  {modalHeader}
                  <div className='modal-body' style={{ textAlign: 'center' }}>
                    <h4 style={{ fontWeight: 'bold' }}>¡Hola!</h4>
                    <h6>Estas registrado cómo {this.props.email}</h6>
                    <input className='btn btn-primary justify-content-center' type='submit' value='Desconectar' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      )
    }
    else {
      return (
        <form onSubmit={this.handleLogin}>
          <div className='modal fade show' style={{ display: 'block', overflow: 'auto' }} tabIndex='-1'>
            <div className='modal-dialog modal-login' role='document'>
              <div className='modal-content'>
                <div className='card card-signup card-plain'>
                  {modalHeader}
                  <div className='modal-body'>
                    <h6>Introduce tu correo y tu contraseña para acceder. Si no tienes una cuenta, se creara automáticamente.</h6>
                    <div className='form-row'>
                      <div className='form-group col-md-6'>
                        <label htmlFor='email'>Email</label>
                        <input type='text' className='form-control' id='email' placeholder='hola@example.com' value={this.state.email} onChange={this.handleChange} />
                      </div>
                      <div className='form-group col-md-6'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' className='form-control' id='password' placeholder='Introduce tu contraseña' value={this.state.password} onChange={this.handleChange} />
                      </div>
                    </div>
                    {/* <div className='form-row'>
            <div className='form-group col-md-12'>
              <label for='email4'>Nombre</label>
              <input type='text' className='form-control' id='email4' placeholder='Arbolitos Unidos' />
            </div>
        </div> */}
                    {/* <div className='form-row'>
            <div className='form-group col-md-8'>
            <label for='address'>Dirección</label>
            <input type='text' className='form-control' id='address' placeholder='Calle de la Piruleta 1, Bloque 2, Puerta 4' />
          </div>
          <div className='form-group col-md-4'>
              <label for='password4'>CP</label>
              <input type='text' className='form-control' id='password4' placeholder='https://test.com' />
            </div>
        </div> */}
                    {/* <div className='form-row'>
          <div className='form-group col-md-3'>
              <label for='password4'>CIF</label>
              <input type='text' className='form-control' id='password4' placeholder='https://test.com' />
            </div>
            <div className='form-group col-md-3'>
              <label for='inputState'>Télefono</label>
              <input type='text' className='form-control' id='password4' placeholder='https://test.com' />
            </div>
            <div className='form-group col-md-3'>
              <label for='inputState'>Web</label>
              <input type='text' className='form-control' id='password4' placeholder='https://test.com' />
            </div>
            <div className='form-group col-md-3'>
              <label for='inputState'>Ámbito</label>
              <select id='inputState' className='form-control'>
                <option selected>Elige una</option>
                <option>...</option>
              </select>
            </div>
          </div> */}
                    {/* <div className='form-group'>
            <label for='exampleFormControlTextarea1'>Hoja de ruta</label>
            <textarea className='form-control' id='exampleFormControlTextarea1' rows='3'></textarea>
          </div> */}
                    <div className='modal-footer justify-content-center'>
                      <input className='btn btn-primary justify-content-center' type='submit' value='Acceder' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      )
    }
  }
}

class Help extends Component {
  render() {
    const modalHeader = <div className='modal-header'> <h5 className='modal-title'>{this.props.title}</h5><button type='button' className='close' aria-label='Close' onClick={() => this.props.handler(false)}><span aria-hidden='true'>&times;</span></button></div>;
    return (
      <div className='modal fade show' style={{ display: 'block', overflow: 'auto' }} tabIndex='-1' role='dialog' aria-labelledby='ModalLabel' aria-hidden='true'>
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            {modalHeader}
            <div className='modal-body'>
              <h6>{this.props.subtitle}</h6>
              <p className='text-justify'>{this.props.description}</p>
              <div className='container'>
                <div className='row'>
                  <div className='col-md-6 col-lg-6 col-sm-6 text-center'>
                    <a href='https://www.uma.es/rce/info/107549/catedra-de-tecnologias-emergentes-para-la-ciudadania/'><img className='img-responsive' src='/assets/img/tec.png' /></a>
                  </div>
                  <div className='col-md-6 col-lg-6 col-sm-6 text-center'>
                  <a href='http://www.malaga.eu/'><img className='img-responsive' src='/assets/img/ayunt.png' /></a>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-6 col-lg-6 col-sm-6 text-center'>
                    <a href='https://www.polodigital.eu/'><img className='img-responsive' src='/assets/img/polo.png' /></a>
                  </div>
                  <div className='col-md-6 col-lg-6 col-sm-6 text-center'>
                    <a href='http://www.andaluciatech.org/'><img className='img-responsive' src='/assets/img/andtech.png' /></a>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-md-6 col-lg-6 col-sm-6 text-center'>
                    <a href='https://www.uma.es/rce/'><img className='img-responsive' src='/assets/img/rce.png' /></a>
                  </div>
                  <div className='col-md-6 col-lg-6 col-sm-6 text-center'>
                    <a href='https://www.promalaga.es/'><img className='img-responsive' src='/assets/img/promalaga.png' /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class FilterPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmission = this.handleSubmission.bind(this);
    this.restoreFilters = this.restoreFilters.bind(this);


  }

  restoreFilters() {
    this.props.handler(false);
    this.props.removeFilters();
  }

  handleChange(event) {
    this.setState({ [event.target.id]: (this.state[event.target.id] === null || this.state[event.target.id] === undefined) ? true : !this.state[event.target.id] });
  }

  handleSubmission(event) {
    this.props.handleFilters({[this.props.id]: Object.keys(this.state)})
    this.props.handler(false);
    event.preventDefault();
  }

  render() {
    const header = <div className='modal-header'> <h5 className='modal-title'>{this.props.title}</h5><button type='button' className='close' aria-label='Close' onClick={() => this.props.handler(false)}><span aria-hidden='true'>&times;</span></button></div>;
    const options = this.props.options.map(option => {
      return (
        <div className='form-check'>
          <label className='form-check-label'>
            <input className='form-check-input' type='checkbox' id={option} value={option} onChange={this.handleChange}/> {option}
            <span className='form-check-sign'>
              <span className='check'></span>
            </span>
          </label>
        </div>
      )
    });

    return (
      <form onSubmit={this.handleSubmission}>
        <div className='modal fade show' style={{ display: 'block', overflow: 'auto' }} tabIndex='-1' role='dialog' aria-labelledby='ModalLabel' aria-hidden='true'>
          <div className='modal-dialog' role='document'>
            <div className='modal-content'>
              {header}
              <div className='modal-body'>
                <h6>Selecciona que quieres visualizar</h6>
                {options}
              </div>
              <div className='modal-footer justify-content-center'>
                <input className='btn btn-primary justify-content-center' type='submit' value='Filtrar' />
                <button type='button' className='btn btn-primary' onClick={() => this.restoreFilters()}>Eliminar TODOS los filtros</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

class Modal extends Component {
  render() {

    const modalHeader = <div className='modal-header'> <h5 className='modal-title'>{this.props.title}</h5><button type='button' className='close' aria-label='Close' onClick={() => this.props.handler(false, 'Tu iniciativa NO ha sido registrada. Creala de nuevo si quieres añadirla a nuestra base de datos', this.props.data.id)}><span aria-hidden='true'>&times;</span></button></div>;

    if (this.props.type === 'help') {
      return (
        <Help title={this.props.title} subtitle={this.props.subtitle} description={this.props.description} handler={this.props.handler} />
      )
    }
    else if (this.props.type === 'login') {
      return (
        <Dashboard title={this.props.title} handler={this.props.handler} userLog={this.props.userLog} email={this.props.email} />
      )
    }

    else if (this.props.type === 'filter') {

      return (
        <FilterPanel title={this.props.title} removeFilters={this.props.removeFilters} id={this.props.id} handleFilters={this.props.handleFilters} handler={this.props.handler} options={this.props.options} />
      )
    }

    else if (this.props.type === 'edit') {
      if (this.props.email) {
        return (
          <div className='modal fade show' style={{ display: 'block', overflow: 'auto' }} tabIndex='-1' role='dialog' aria-labelledby='ModalLabel' aria-hidden='true'>
            <div className='modal-dialog' role='document'>
              <div className='modal-content'>
                {modalHeader}
                <div className='modal-body'>
                  <h6>Rellena todos los campos para añadir tu iniciativa.</h6>
                  <Form collection={this.props.collection} handler={this.props.handler} data={this.props.data} />
                </div>
              </div>
            </div>
          </div>
        )
      }
      else {
        return (
          <div className='modal fade show' style={{ display: 'block', overflow: 'auto' }} tabIndex='-1' role='dialog' aria-labelledby='ModalLabel' aria-hidden='true'>
            <div className='modal-dialog' role='document'>
              <div className='modal-content'>
                {modalHeader}
                <div className='modal-body'>
                  <h6>Tienes que estar registrado para añadir iniciativas</h6>
                </div>
              </div>
            </div>
          </div>
        )
      }
    }

    else {
      return null;
    }
  }
}

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      web: '',
      address: '',
      purpose: '',
      action: '',
      area: '',
      enabler: '',
      description: '',
      image: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmission = this.handleSubmission.bind(this);
  }


  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmission(event) {
    let data = this.props.data;
    data.properties = {
      name: this.state.activity,
      web: this.state.web,
      address: this.state.address,
      initiative: this.state.purpose,
      action: this.state.action,
      area: this.state.area,
      enabler: this.state.enabler,
      description: this.state.description,
      image: this.state.image
    }
    firebase.firestore().collection(this.props.collection).add(data)
      .then(() => {
        this.props.handler(false);
        NotificationManager.success('Deporte añadido con éxito. ¡Gracias por colaborar!');
      })
      .catch((error) => {
        NotificationManager.error('Ha ocurrido un error al crear tu contribución.');
      });
    event.preventDefault();
  }

  render() {
    return (
      <form className='form' onSubmit={this.handleSubmission}>
        <div className='form-row'>
          <div className='form-group col-md-6'>
            <label htmlFor='name'>Nombre del deporte</label>
            <input type='text' className='form-control' id='activity' placeholder='¿Cómo se llama el deporte que prácticas?' value={this.state.activity} onChange={this.handleChange} />
          </div>
          <div className='form-group col-md-6'>
            <label htmlFor='web'>Web</label>
            <input type='text' className='form-control' id='web' placeholder='¿Tenéis un sitio web para planificar quedadas deportivas? https://example.com' value={this.state.web} onChange={this.handleChange} />
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor='address'>Dirección</label>
          <input type='text' className='form-control' id='address' placeholder='Calle de la Piruleta 1, Bloque 2, Puerta 4' value={this.state.address} onChange={this.handleChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Descripción</label>
          <textarea className='form-control' placeholder='Describe aqui porque este es un buen sitio para hacer deporte' id='description' rows='3' value={this.state.description} onChange={this.handleChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='image'>¿Alguna imagen?</label>
          <input type='text' className='form-control' id='image' placeholder='Pon el enlace a la imagen del sitio para que la gente vea que increible es!!' value={this.state.image} onChange={this.handleChange} />
        </div>
        <div className='modal-footer justify-content-center'>
          <input className='btn btn-primary justify-content-center' type='submit' value='Enviar' />
        </div>
      </form>
    );
  }
}

class Sidebar extends Component {
  render() {
    if (this.props.show) {
      const url = this.props.url == null ? null : <a href={this.props.url} target='_blank' rel="noopener noreferrer" className='card-link'><i className='material-icons'>link</i>Website</a>,
        twitter = this.props.twitter == null ? null : <a href={this.props.twitter} target='_blank' rel="noopener noreferrer" className='card-link'><i className='material-icons'>link</i>Twitter</a>,
        phone = this.props.phone == null ? null : <a href={this.props.phone} target='_blank' rel="noopener noreferrer" className='card-link'><i className='material-icons'>phone</i>Teléfono</a>;

      return (
        <div className='card card-sidebar' style={{ overflow: 'auto' }}>
        <div className='modal-header'> <h5 className='modal-title'>{this.props.title}</h5><button type='button' className='close' aria-label='Close' onClick={this.props.closeSidebar}><span aria-hidden='true'>&times;</span></button></div>
          <img className='card-img-top' src={this.props.img} />
          <div className='card-body'>
            <h6 className='card-subtitle mb-2 text-muted'>{this.props.address}</h6>
            <p className='card-text'>{this.props.description}</p>
            {url}
            {/* {twitter} */}
          </div>
        </div>
      )
    }
    else {
      return null
    }
  }
}

class App extends Component {

  constructor(props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this)
    this.userLog = this.userLog.bind(this)
    this.handleFilters = this.handleFilters.bind(this)
    this.composeFilters = this.composeFilters.bind(this)
    this.removeFilters = this.removeFilters.bind(this)
    this.closeSidebar = this.closeSidebar.bind(this)
    this.state = {
      modal: {
        title: 'Málaga activa',
        subtitle: '¿QUIERES HACER DEPORTE AL AIRE LIBRE EN TU CIUDAD? ¿CONOCES LUGARES EN EL ESPACIO PÚBLICO DONDE REALIZAR ACTIVIDADES DEPORTIVAS?',
        description: '“Atlas de Málaga Activa” se trata de una plataforma digital que identifica zonas urbanas con actividad deportiva recreativa, desarrollada fuera de los equipamientos deportivos reglados, para la consulta de cualquier ciudadano. Si eres amante de una práctica deportiva y no conoces lugares donde poder desarrollarla en la ciudad, consulta la plataforma para ver los puntos donde actualmente se realiza. En el caso de conocer otros, no dudes en registrarlos para compartir y ayudar a otros ciudadanos a conocer nuevos lugares, con el objetivo final de potenciar el deporte en el espacio público de la ciudad de  Málaga.',
        type: 'help',
        id: '',
        options: ''
      },
      site: {
        title: 'Málaga Áctiva',
        collection: 'initiatives',
        buttons: [{ 'name': 'Actividad', id: 'activity', filters: ['Running', 'Parkour', 'Ciclismo', 'Yoga'] }]
      },
      user: {
      },
      satelliteImage: false,
      featureData: {
        show: false
      },
      map: {
        filter: {}
      }
    }
  }

  closeSidebar() {
    this.setState({featureData: {show: false}})
  }

  toggleModal(options, notification, id) {
    this.setState({ modal: options, featureData: { show: false } })
    if (notification) {
      NotificationManager.info(notification)
      this.draw.delete(id)
    }
  }
  
  handleFilters(conditions) {
    const filters = this.state.map.filter;
    filters[Object.keys(conditions)[0]] = Object.values(conditions)[0];
    this.setState({map: { filter: filters } } )
  }

  userLog(userInfo) {
    this.setState({ user: userInfo })
  }

  removeFilters() {
    this.setState({map: {filter : {}}})
  }

  composeFilters(filterObject) {
    const matches = 
      Object.entries(filterObject).map((filterComponent) => {
        if (filterComponent[1].length < 1) {
          return
        }
        else {
          const filterField = filterComponent[0],
          filterTargets = filterComponent[1].map((target) => {
            return([target,true])
          }).reduce((a, b) => a.concat(b), []);
          return(['match',['get',filterField],...filterTargets,false])
        }
      }).filter( element => element !== undefined)
    return(['all',...matches])
  }

  // _toggle(satelliteImage) {
  //   if (satelliteImage) {
  //     this.map.setStyle('mapbox://styles/mapbox/satellite-v9');
  //   }
  //     this.map.setStyle('mapbox://styles/mapbox/light-v9');
  //   else {
  //   }
  // }

  componentDidUpdate() {
    //   this.toggle(this.state.satelliteImage);
    //   this.map.on('style.load', () => {
    //     this.map.addLayer(data);
    //     this.map.setFilter('route', this.state.filter);
    //   });
    this.map.setFilter('pointActivities', this.composeFilters(this.state.map.filter));
    this.map.setFilter('lineActivities', this.composeFilters(this.state.map.filter));
    // if(this.map.getSource('userSelected') !== undefined) {
    //   this.map.setFilter('userSelected', this.composeFilters(this.state.map.filter));
    //   this.map.setFilter('selectedFeatures', this.composeFilters(this.state.map.filter));
    // }
  }

  componentDidMount() {
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
        trash: false,
        line_string: false,
        polygon: false
      }
    })
    
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
          'fill-extrusion-opacity': .6
        }
      }, labelLayerId);

      this.map.addSource('activities', {
        type: 'geojson',
        data: data
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
            ['get', 'activity'],
            'Ciclismo', '#fbb03b',
            'Parkour', '#223b53',
            'Running', '#e55e5e',
            'Yoga', '#3bb2d0',
            '#Ff8326'
          ]
        }
      });

      // firebase.firestore().collection(this.state.site.collection).get().then(querySnapshot => {
      //   let template = {
      //     "type": "FeatureCollection",
      //     "features": []
      //   }
      //   querySnapshot.forEach(doc => {
      //     template.features.push(doc.data())
      //   });

      //   this.map.addLayer({
      //     id: 'userActivities',
      //     source: {
      //       type: 'geojson',
      //       data: template
      //     },
      //     type: 'circle',
      //     paint: {
      //       'circle-radius': {
      //         'base': 1.75,
      //         'stops': [[12, 2], [22, 180]]
      //       },

      //       'circle-color': [
      //         'match',
      //         ['get', 'name'],
      //         'Ciclismo', '#fbb03b',
      //         'Parkour', '#223b53',
      //         'Running', '#e55e5e',
      //         'Yoga', '#3bb2d0',
      //         '#Ff8326'
      //       ]
      //     }
      //   });

      // });

      ['pointActivities', 'userActivities', 'lineActivities'].forEach(activityType => {
        this.map.on('mouseenter', activityType, () => {
          this.map.getCanvas().style.cursor = 'pointer';
        });

        this.map.on('mouseleave', activityType, () => {
          this.map.getCanvas().style.cursor = '';
        });

        this.map.on('click', activityType, e => {
          let featureProperties = e.features[0].properties;
          this.setState({ featureData: { activity: featureProperties.activity, show: true, img: featureProperties.img, description: featureProperties.description, url: featureProperties.url, twitter: featureProperties.twitter, address: featureProperties.address } })
          console.log(this.state)
        });
      })

      this.map.on('draw.create', e => {
        let newPoint = e.features[0];
        this.toggleModal({ type: 'edit', title: 'Añade una iniciativa', data: newPoint });

      });
    });
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    const style = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: '100%'
    };

    return (
      <div style={style} ref={el => this.mapContainer = el} >
        <Header title={this.state.site.title} buttons={this.state.site.buttons} handler={this.toggleModal} email={this.state.user.email} />
        <Modal type={this.state.modal.type} removeFilters={this.removeFilters} title={this.state.modal.title} id={this.state.modal.id} subtitle={this.state.modal.subtitle} description={this.state.modal.description} email={this.state.user.email} handler={this.toggleModal} handleFilters={this.handleFilters} userLog={this.userLog} options={this.state.modal.options} data={this.state.modal.data} collection={this.state.site.collection} />
        <Sidebar title={this.state.featureData.activity} img={this.state.featureData.img} description={this.state.featureData.description} address={this.state.featureData.address} email={this.state.featureData.email} url={this.state.featureData.url} twitter={this.state.featureData.twitter} show={this.state.featureData.show} closeSidebar={this.closeSidebar} />
        <NotificationContainer/>
      </div>
    );
  }
}
// IMPORTANTE, SON LOS FILTROS DE LOS BOTONES
// [{ name: 'Iniciativas', filters: ['Accesibilidad', 'Arte urbano', 'Autogestión', 'Cuidado', 'Culto', 'Cultura', 'Deporte', 'Derechos sociales', 'Diversidad', 'Educación', 'Integración', 'Igualdad', 'Mediación', 'Medio ambiente', 'Migración', 'Movilidad sostenible', 'Patrimonio sociocultural', 'Política social', 'Regeneración urbana', 'Salud'] }, { name: 'Acción', filters: ["Taller", "Digital", "Reunión", "Acción", "Exposición", "Difusión"] }, { name: 'Área de actuación', filters: ["Casa de la cultura", "Espacios virtuales", "Huerto urbano", "Solares vacíos", "Itinerarios urbanos", "Banco de recursos", "Escuela ciudadana", "Lugares de encuentro", "Coworking"] }, { name: 'Facilitador', filters: ["Administración pública", "Asociación de vecinos/as", "Asamblea local", "Movimiento ciudadano", "Colectivo tradicional", "Obra social"] }, { name: 'Distritos', filters: ['foo', 'bar'] }]

// const data_sport = {
//   "type": "FeatureCollection",
//   "features": [
//   { "type": "Feature", "properties": { "id": 21, "name":"Ciclismo" }, "geometry": { "type": "MultiLineString", "coordinates": [ [ [ -4.445852597663771, 36.711033630771375 ], [ -4.445135690452562, 36.70989852768696 ], [ -4.44442834200417, 36.708866181302831 ], [ -4.444179814170952, 36.708482337233505 ], [ -4.443037542014427, 36.706907531059549 ], [ -4.441785344085517, 36.704990999114919 ], [ -4.441159245121063, 36.704025564070498 ], [ -4.440767335845603, 36.703523729022649 ], [ -4.440442337909856, 36.703275201189435 ], [ -4.439405212144308, 36.70218072284699 ], [ -4.438635731737612, 36.701425580584512 ], [ -4.436222144126545, 36.70028808780939 ], [ -4.436226923507953, 36.700283308428006 ], [ -4.436226923507953, 36.700283308428006 ] ] ] } },
//   { "type": "Feature", "properties": { "id": 22, "name":"Ciclismo" }, "geometry": { "type": "MultiLineString", "coordinates": [ [ [ -4.436375084331603, 36.700359778530533 ], [ -4.436293834847666, 36.700531836261227 ], [ -4.436150453405424, 36.700543784714746 ], [ -4.436045307014447, 36.700574850693897 ], [ -4.43598795443755, 36.700615475435868 ], [ -4.435861300830237, 36.700586799147416 ], [ -4.435777661655596, 36.700586799147416 ], [ -4.435737036913627, 36.700589188838123 ], [ -4.435679684336731, 36.700617865126567 ], [ -4.435455053410553, 36.700472093993625 ], [ -4.434974725579043, 36.700916576464572 ], [ -4.434975293102768, 36.700916304027999 ] ] ] } },
//   { "type": "Feature", "properties": { "id": 25, "name":"Ciclismo" }, "geometry": { "type": "MultiLineString", "coordinates": [ [ [ -4.419635257898319, 36.717488975711646 ], [ -4.418508275974476, 36.717327978293959 ], [ -4.413819226184201, 36.718615957635492 ], [ -4.4131148624818, 36.717871344578668 ], [ -4.413094737804588, 36.717569474420493 ], [ -4.415227953589005, 36.71396715719964 ], [ -4.415187704234582, 36.714027531231274 ] ] ] } },
//   { "type": "Feature", "properties": { "id": 6, "name": "Parkour" }, "geometry": { "type": "Point", "coordinates": [ -4.444313611851205, 36.692268466360197 ] } },
//   { "type": "Feature", "properties": { "id": 7 , "name": "Parkour"}, "geometry": { "type": "Point", "coordinates": [ -4.42565667861847, 36.716594997677795 ] } },
//   { "type": "Feature", "properties": { "id": 8, "name": "Parkour" }, "geometry": { "type": "Point", "coordinates": [ -4.426302749097907, 36.716551047305046 ] } },
//   { "type": "Feature", "properties": { "id": 12, "name": "Parkour" }, "geometry": { "type": "Point", "coordinates": [ -4.415655762280471, 36.718832696936552 ] } },
//   { "type": "Feature", "properties": { "id": 23, "name": "Running"}, "geometry": { "type": "MultiLineString", "coordinates": [ [ [ -4.445560873316006, 36.684192697265239 ], [ -4.445037631708508, 36.685118432416971 ], [ -4.444886696629421, 36.685198931125818 ], [ -4.444474140746586, 36.685923419505428 ], [ -4.444494265423797, 36.685943544182642 ], [ -4.444031397847933, 36.686818967641337 ], [ -4.443860338091636, 36.68688940401158 ], [ -4.443427657531589, 36.687684328761435 ], [ -4.443437719870195, 36.687815139163305 ], [ -4.442914478262696, 36.688740874315037 ], [ -4.442713231490582, 36.688841497701091 ], [ -4.442159802867266, 36.68979741986864 ], [ -4.442159802867266, 36.689908105593304 ], [ -4.441988743110969, 36.690230100428685 ], [ -4.441797558677459, 36.690350848491953 ], [ -4.44167177944489, 36.690612469295708 ], [ -4.441691904122102, 36.690778497882704 ], [ -4.441224005376935, 36.691573422632551 ], [ -4.441068039128546, 36.691628765494883 ], [ -4.440650452076408, 36.692363316213104 ], [ -4.440675607922922, 36.692519282461497 ], [ -4.440509579335928, 36.692780903265245 ], [ -4.440353613087539, 36.692841277296878 ], [ -4.439915901358189, 36.693590921523004 ], [ -4.439714654586073, 36.694053789098867 ], [ -4.439538563660473, 36.694114163130507 ], [ -4.439105883100426, 36.694778277478484 ], [ -4.439105883100426, 36.694959399573385 ], [ -4.4388845116511, 36.69526126973156 ], [ -4.438703389556196, 36.695331706101797 ], [ -4.438230459641727, 36.696015945126987 ], [ -4.438230459641727, 36.696176942544675 ], [ -4.437687093357018, 36.696981929633139 ], [ -4.437505971262114, 36.697022178987559 ], [ -4.436962604977404, 36.697766792044384 ], [ -4.435574002249814, 36.699678636379474 ], [ -4.435332506123276, 36.699598137670627 ], [ -4.435030635965103, 36.699598137670627 ], [ -4.434889763224623, 36.699759135088321 ], [ -4.434809264515777, 36.699960381860436 ], [ -4.434869638547411, 36.700222002664184 ], [ -4.433320038402128, 36.702435717157449 ], [ -4.431126448586077, 36.705373920030326 ], [ -4.429466162716129, 36.70727570202682 ], [ -4.426477648150224, 36.710606336105322 ], [ -4.42648771048883, 36.710626460782528 ] ] ] } },
//   { "type": "Feature", "properties": { "id": 30, "name": "Running"}, "geometry": { "type": "MultiLineString", "coordinates": [ [ [ -4.4264273364572, 36.710646585459735 ], [ -4.426296526055325, 36.715979624920777 ], [ -4.426205965007876, 36.717851219901434 ], [ -4.426165715653453, 36.718153090059609 ], [ -4.425873907833886, 36.718917827793646 ], [ -4.425733035093406, 36.719581942141623 ], [ -4.425622349368743, 36.720286305844027 ], [ -4.425672661061771, 36.720950420192004 ], [ -4.425823596140858, 36.721845968327912 ], [ -4.426477648150231, 36.725971527156283 ] ] ] } },
//   { "type": "Feature", "properties": { "id": 31, "name": "Running" }, "geometry": { "type": "MultiLineString", "coordinates": [ [ [ -4.42565253638456, 36.711713193351962 ], [ -4.425783346786434, 36.714591022193197 ], [ -4.425753159770617, 36.715738128794257 ], [ -4.425682723400377, 36.716683988623195 ], [ -4.425607255860834, 36.717740534176791 ], [ -4.425521725982685, 36.718465022556408 ], [ -4.425320479210571, 36.719204604443931 ], [ -4.425129294777061, 36.720095121410537 ], [ -4.425229918163119, 36.721121479948323 ], [ -4.425642474045953, 36.726041963526527 ] ] ] } },
//   { "type": "Feature", "properties": { "id": 33, "name": "Running" }, "geometry": { "type": "MultiLineString", "coordinates": [ [ [ -4.419601725065577, 36.717632737370501 ], [ -4.418882293083513, 36.717288661205167 ], [ -4.413658591300696, 36.718649326040811 ], [ -4.413017358447117, 36.717804775453168 ], [ -4.41300171862142, 36.717742216150384 ], [ -4.415206934044705, 36.714223255368545 ], [ -4.414534421539732, 36.713691501294846 ], [ -4.413032998272812, 36.710188180338697 ], [ -4.413001718621418, 36.709586047049356 ], [ -4.413181576616934, 36.708905714631534 ], [ -4.413650771387846, 36.708100263608138 ] ] ] } },
//   { "type": "Feature", "properties": { "id": null, "name": "Yoga" }, "geometry": { "type": "Point", "coordinates": [ -4.413995311857809, 36.712571574445178 ] } },
//   { "type": "Feature", "properties": { "id": null, "name": "Yoga" }, "geometry": { "type": "Point", "coordinates": [ -4.432187840371991, 36.706106176787976 ] } },
//   { "type": "Feature", "properties": { "id": null, "name": "Yoga" }, "geometry": { "type": "Point", "coordinates": [ -4.435970785809722, 36.699692364750348 ] } }
//   ]
//   }

export default App;
