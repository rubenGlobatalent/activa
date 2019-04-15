import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import logo from '../../assets/img/logo.png'

const style = {
  icon: {
    padding: '0 1.5rem 0 1.5rem'
  },
  logo: {
    maxHeight: 'none'
  },
  navbarItem: {
    padding: '0'
  },
  button: {
    height: '70%',
    padding: '0 2rem'
  },
  districtButton: {
    height: '70%',
    padding: '0 30px',
    marginRight: '75px'
  }
}

export default function Header(props) {
  let navbarBurguerClass = 'navbar-burger',
    navbarMenuClass = 'navbar-menu',
    buttonClass = 'button is-large is-size-7 is-uppercase',
    user;
  if (props.visible) {
    navbarBurguerClass = navbarBurguerClass + ' is-active'
    navbarMenuClass = navbarMenuClass + ' is-active'
    buttonClass = buttonClass + ' is-fullwidth'
  }
  let filterButtonClass = buttonClass + ' filterButton';
  if (props.user.email) {
    user = props.user.email
  }
  else {
    user = 'Inicia sesión'
  }

  return (
    <header>
      <nav className="navbar is-fixed-top">
        <div className="navbar-brand">
          <a className="navbar-item image is-64x64" href="/">
            <img src={logo} style={style.logo} alt="" />
          </a>

          <button className={navbarBurguerClass} onClick={() => props.toggleComponent('header')} >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <div className={navbarMenuClass}>
          <div className="navbar-end">
            <div className="navbar-item" style={style.navbarItem}>
              <button className={filterButtonClass} style={style.button} onClick={() => props.toggleComponent('activityFilter')}>
                Actividad
              </button>
            </div>
            <div className="navbar-item" style={style.navbarItem}>
              <button className={filterButtonClass} style={style.districtButton} onClick={() => props.toggleComponent('districtFilter')}>
                Zonas
              </button>
            </div>
            <hr className="navbar-divider" />
            <div className="navbar-item" style={style.navbarItem}>
              <button className={buttonClass} style={style.button} onClick={() => props.toggleComponent('help')}>
                <span className="icon is-size-5" style={style.icon}><FontAwesomeIcon icon={faQuestionCircle} /></span>
              </button>
            </div>
            <div className="navbar-item" style={style.navbarItem}>
              <button className={buttonClass} style={style.button} onClick={() => props.toggleComponent('dashboard')}>
                <span className="icon is-size-5" style={style.icon}><FontAwesomeIcon icon={faUser} /></span>
                {user}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}