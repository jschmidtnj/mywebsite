import React from 'react'

import NavbarAmp from './Navbar.amp'
import HeaderStart from './HeaderStart'
import './all.amp.sass'

const TemplateWrapper = ({ children }) => (
  <div>
    <HeaderStart />
    <NavbarAmp />
    <div>{children}</div>
  </div>
);


export default TemplateWrapper
