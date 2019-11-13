import React, {useState} from 'react'
import { connect } from 'react-redux'
import { Link } from "@reach/router"
import { useTranslation } from 'react-i18next'

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

const mapStateToProps = state => ({
  user: state.user
})


const Header = props => {

  const [visible, setVisible] = useState(false),
  { t } = useTranslation('general', { useSuspense: false })

  const navbarBurguerClass = `navbar-burger ${visible ? `is-active` : `` }`,
    navbarMenuClass = `navbar-menu ${visible ? `is-active` : `` }`,
    buttonClass = `button is-large is-size-7 is-uppercase ${visible ? `is-fullwidth` : `` }`,
    user = props.user ? props.user.email : 'Inicia sesión',
    filterButtonClass = `${buttonClass} filterButton`

  return (
    <header>
      <nav className="navbar is-fixed-top">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img src={logo} alt="Málaga Áctiva"/>
          </a>

          <span className={navbarBurguerClass} onClick={() => setVisible(!visible)} >
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>

        <div className={navbarMenuClass}>
          <div className="navbar-end">
            <div className="navbar-item">
              <Link to='/activities' className={filterButtonClass} style={style.button}>
                {t('activity')}
              </Link>
            </div>
            <div className="navbar-item">
              <Link to='/districts' className={filterButtonClass} style={style.districtButton}>
                {t('district')}
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
  mapStateToProps,
  null
)(Header)