import { useState } from 'react'
import './App.css'

function Introduction() {

  let description = `Create your ideal timetable with ease! Our website lets VIT students explore and 
  select their perfect schedule through advanced queries on the real FFCS faculty list. Additional 
  features like an attendance planner and automatic timetable generation tailored to your unique 
  preferences are coming soon... Simplify your semester planning with a tool designed to fit your 
  academic needs seamlessly.`

  return (
    <>
      <div>
        <h1 id = "tit">TimeTable Planner</h1>
        <div id = "descont">
          <p id = "des">{description}</p>
        </div>
      </div>
    </>
  )
}

export default Introduction