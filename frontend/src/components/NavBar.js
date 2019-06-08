import React from 'react'
import {BrowserRouter, Link, Route} from "react-router-dom"

class NavBar extends React.Component {
  // <Link to="/dashboard"><h1>NIFTTT</h1></Link>
  render(){
    return(
      <div id = "navbar">
        <h1>NIFTTT</h1>
      </div>
    )
  }
}

export default NavBar;
