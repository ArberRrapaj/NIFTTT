import React from 'react'
import ReactDOM from 'react-dom'
import NavBar from './NavBar'
import Rule from './Rule'
import Dashboard from './Dashboard'
import Login from "./Login"
import Logout from "./Logout"
import {BrowserRouter, Link, Route, Redirection} from "react-router-dom"
import Cookies from "js-cookie"


class App extends React.Component {
  constructor(){
    super()
    this.callback = this.callback.bind(this)
  }
  callback(){
    this.forceUpdate()
  }

  render(){
    if(Cookies.get("authtoken") != undefined){
      return(
        <BrowserRouter>
        <NavBar/>
        <Route exact path="/" component={Dashboard}/>
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/rule/:id" component={Rule}/>
        <Route path="/login" render={()=><Logout callback={this.callback}/>}/>
        <Route path="/logout" render={()=><Logout callback={this.callback}/>}/>
        </BrowserRouter>
      )
    } else {
      return(
        <BrowserRouter>
        <NavBar/>
        <Route exact path="/" render={()=><Login callback={this.callback}/>}/>
        <Route path="/dashboard" render={()=><Login callback={this.callback}/>}/>
        <Route path="/rule/:id" render={()=><Login callback={this.callback}/>}/>
        <Route path="/login" render={()=><Login callback={this.callback}/>}/>
        <Route path="/logout" render={()=><Logout callback={this.callback}/>}/>
        </BrowserRouter>
      )
    }
  }
}

export default App;
