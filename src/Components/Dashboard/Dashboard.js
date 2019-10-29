import React, { useState } from 'react'
import { NotificationManager } from 'react-notifications'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
// OPTIMIZE IMPORTS
import * as firebase from 'firebase'

const style = {
  text: {
    backgroundColor: 'rgb(244,244,244)'
  }
}

export default function Dashboard(props) {
  const [email, setEmail] = useState(''),
    [password, setPassword] = useState(''),
    [forgot, setForgot] = useState(false),
    [waiting, setWaiting] = useState(false),
    [terms, setTerms] = useState(false)

    const handleLogin = event => {
      event.preventDefault();
      if (!waiting) {
        setWaiting(true);
        if (forgot) {
          firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
              props.toggleComponent('dashboard');
              NotificationManager.info('Te hemos enviado instrucciones de cómo restablecer tu contraseña a la cuenta de correo indicada.')
              setWaiting(false)
              setForgot(false)
            })
            .catch(() => {
              props.toggleComponent('dashboard');
              NotificationManager.error('No existe la cuenta indicada.')
              setWaiting(false)
              setForgot(false)
            })
        }
        else {
          firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
              props.toggleComponent('dashboard');
              NotificationManager.success('¡Cuenta creada!')
              setWaiting(false)
            })
            .catch((error) => {
              if (error.code === 'auth/email-already-in-use') {
                firebase.auth().signInWithEmailAndPassword(email, password)
                  .then(() => {
                    props.toggleComponent('dashboard');
                    NotificationManager.success('¡Autenticación correcta!')
                    setWaiting(false)
                    setForgot(false)
                  })
                  .catch(() => {
                    NotificationManager.error('La contraseña no es correcta')
                    setWaiting(false)
                    setForgot(false)
                  })
              }
              else {
                console.error(error)
                NotificationManager.error('No se ha podido crear la cuenta')
                setWaiting(false)
              }
            })
        }
      }
    },
    handleLogout = event => {
      firebase.auth().signOut()
        .then(() => {
          NotificationManager.success('Desconectado. ¡Vuelve pronto!');
          props.toggleComponent('dashboard');
        })
        .catch((error) => {
          console.error(error)
          NotificationManager.error('Algo salió mal...')
        });
      event.preventDefault();
    };

  if (props.visible) {
    if (props.user.email) {
      return (
        <div className="modal is-active animated fadeIn faster">
          <div className="modal-background" onClick={() => props.toggleComponent('dashboard')}></div>
          <form className="modal-card" onSubmit={handleLogout}>
            <header className="modal-card-head">
              <h2 className="modal-card-title is-size-5 has-text-weight-light">Panel de usuario</h2>
              <button className="delete" onClick={() => props.toggleComponent('dashboard')}></button>
            </header>
            <section className="modal-card-body">
              <h3 className="title has-text-centered is-size-6">¡Hola!</h3>
              <p className="has-text-centered is-size-6">Estas registrado cómo <strong>{props.user.email}</strong></p>
            </section>
            <footer className="modal-card-foot buttons is-centered">
              <button type='submit' className="button">Desconectar</button>
            </footer>
          </form>
        </div>
      )
    }

    else {
      return (
        <div className="modal is-active">
          <div className="modal-background" onClick={() => props.toggleComponent('dashboard')}></div>
          <form className="modal-card" onSubmit={handleLogin}>
            <header className="modal-card-head">
              <h2 className="modal-card-title is-size-5 has-text-weight-light">Accede o crea tu cuenta</h2>
              <button className="delete" type="button" onClick={() => props.toggleComponent('dashboard')}></button>
            </header>
            <section className="modal-card-body">
            <p className="is-uppercase" style={style.text}>
              Introduce tu correo y tu contraseña para acceder. Si no tienes una cuenta, se creara automáticamente.
              </p>
              <div className="field is-horizontal">
                <div className="field-body">
                  <div className="field">
                    <label className="label has-text-weight-normal">Email</label>
                    <p className="control is-expanded has-icons-left">
                      <input className="input" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                      <span className="icon is-small is-left">
                        <FontAwesomeIcon icon={faEnvelope} />
                      </span>
                    </p>
                  </div>
                  <div className={forgot ? 'is-sr-only' : 'field'}>
                    <label className="label has-text-weight-normal">Contraseña</label>
                    <p className="control is-expanded has-icons-left has-icons-right">
                      <input className="input" type="password" placeholder="Contraseña" value={password} minLength="6" onChange={e => setPassword(e.target.value)} required={!forgot} />
                      <span className="icon is-small is-left">
                        <FontAwesomeIcon icon={faLock} />
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <label className="checkbox">
                    <input type="checkbox" onChange={e => setForgot(e.target.checked)}/>
                    <span> Si has olvidado tu contraseña, introduce tu e-mail, marca esta casilla y pulsa "Acceder" para recuperarla</span>
                  </label>
                </div>
              </div>
              <div className={forgot ? 'is-sr-only' : 'field'}>
                <div className="control">
                  <label className="checkbox">
                    <input type="checkbox" required={!forgot} onChange={e => setTerms(e.target.checked)}/>
                    <span> Acepto los <a target="_blank" rel="noopener noreferrer" href="https://www.uma.es/secretariageneral/newsecgen/index.php?option=com_content&view=article&id=259:reglamento-de-proteccion-de-datos-de-caracter-personal-de-la-universidad-de-malaga&catid=13&Itemid=124">terminos y condiciones</a></span>
                  </label>
                </div>
              </div>
            </section>
            <footer className="modal-card-foot buttons is-centered">
              <button type='submit' className={`button ${waiting ? `is-loading` : ``}`}>Acceder</button>
            </footer>
          </form>
        </div>
      )
    }
  }
  else {
    return (
      null
    )
  }

}