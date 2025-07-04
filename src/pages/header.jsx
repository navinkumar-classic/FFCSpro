import { useState } from 'react'
import './App.css'

function Header() {
  return (
    <>
      <div id='header'>
        <div id = 'headertext'>[FFCS<sub> Pro</sub>]</div>
        <div id = 'headerabout'>About me</div>
        {/*<div className = 'dia' id = "dia1"></div>
        <div className = 'dia' id = "dia2"></div>*/}
      </div>
    </>
  )
}

export default Header