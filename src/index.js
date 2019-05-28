import React from 'react'
import ReactDOM from 'react-dom'
import NavBar from './components/NavBar'
import Rule from './components/Rule'
import Dashboard from './components/Dashboard'
import {BrowserRouter, Link, Route} from "react-router-dom"
import styles from "./index.css"

// ========================================

ReactDOM.render(
  <BrowserRouter>
    <NavBar/>
    <Route path="/dashboard" component={Dashboard}/>
    <Route path="/rule/:id" component={Rule}/>

  </BrowserRouter>,
  document.getElementById('root')
);
