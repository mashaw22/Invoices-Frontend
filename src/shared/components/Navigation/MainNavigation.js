import React from 'react'
import { Link } from 'react-router-dom'

import MainHeader from './MainHeader'
import SubNavigation from './SubNavigation'
import Logo from '../UIElements/images/logo.svg'
import LogoBackground from '../UIElements/images/logo-background.svg'
import Avatar from '../UIElements/images/image-avatar.jpg'
import Moon from '../UIElements/images/icon-moon.svg'
// import Sun from'../UIElements/images/icon-sun.svg'
import './MainNavigation.css'

export default function MainNavigation() {
  return (
    <React.Fragment>
        <MainHeader >
          <Link to="/">
            <div className='main-header__logo'>
              <img className='main-header__logo-background' src={LogoBackground} alt=''/>
              <img className='main-header__logo-main' src={Logo} alt='logo'/>
            </div>
          </Link>
          <div className='main-header__right'>
              <img className='main-header__right-light-mode' src={Moon} alt='change to dark mode'/>
              <hr /> 
              <Link to="/auth">
                <img className='main-header__right-avatar' src={Avatar} alt='avatar'/>
              </Link>
          </div>
        </MainHeader>
        <SubNavigation />
    </React.Fragment>
  )
}
