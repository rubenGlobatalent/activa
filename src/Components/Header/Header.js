import React from 'react'
import { connect } from 'react-redux'
import { Link } from "@reach/router"
import logo from '../../assets/img/logo.png'

const style = {
  icon: {
    fontSize: '1.25rem'
  },
  userIcon: {
    fontSize: '1.25rem',
    marginRight: '5px'
  },
  button: {
    height: '70%'
  },
  districtButton: {
    height: '70%',
    padding: '0 30px',
    marginRight: '75px'
  }
}

const Header = props => {
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
          <a className="navbar-item" href="/">
            <img src={logo} alt="Málaga Áctiva"/>
          </a>

          <a className={navbarBurguerClass} onClick={() => props.toggleComponent('header')} >
            <span></span>
            <span></span>
            <span></span>
          </a>
        </div>

        <div className={navbarMenuClass}>
          <div className="navbar-end">
            <div className="navbar-item">
              <Link to='/activities' className={filterButtonClass} style={style.button}>
                Actividad
              </Link>
            </div>
            <div className="navbar-item">
              <Link to='/districts' className={filterButtonClass} style={style.districtButton}>
                Zonas
              </Link>
            </div>
            <hr className="navbar-divider" />
            <div className="navbar-item" >
              <Link to='/help' className={buttonClass} style={style.button}>
                <i className='material-icons' style={style.icon}>help</i>
              </Link>
            </div>
            <div className="navbar-item">
              <Link to='/user' className={buttonClass} style={style.button}>
                <i className='material-icons' style={style.userIcon}>person</i>
                {user}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default connect(
  null,
  null
)(Header)