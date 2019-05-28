import React from 'react'
import {BrowserRouter, Link, Route} from "react-router-dom"
import Dashboard from "./Dashboard"

class NavBar extends React.Component {
  render(){
    return(
      <div id = "navbar">
        <Link to="/dashboard"><h1>NIFTTT</h1></Link>
      </div>
    )
  }
}

export default NavBar;
