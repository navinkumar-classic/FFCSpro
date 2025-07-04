import { useState } from 'react'
import './App.css'
import Header from './pages/header'
import Introduction from './pages/Introduction'
import AdvanceQuery from './pages/AdvanceQuery'
import Footer from './pages/Footer'

function App() {
  

  return (
    <> 
      <Header/>
      {/*<hr id = "line"/>*/}
      <Introduction/>
      <AdvanceQuery/>
      <Footer/>
    </>
  )
}

export default App
