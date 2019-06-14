import React from 'react'
import {BrowserRouter, Link, Route} from "react-router-dom"
import Cookies from "js-cookie"

class NavBar extends React.Component {
  // <Link to="/dashboard"><h1>NIFTTT</h1></Link>
  render(){
    return(
      <div id = "navbar">
        <h1>NIFTTT</h1>
        <div id="navigation">
          {Cookies.get("email") != undefined?(
            <div>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/logout">Logout</Link>
            </div>
          ):(
            <div>
              <Link to="/login">Login</Link>
              </div>
            )}
        </div>
      </div>
    )
  }
}

export default NavBar;
