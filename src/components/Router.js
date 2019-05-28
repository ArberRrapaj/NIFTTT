import React from 'react'
import Dashboard from "./Dashboard"
import Rule from "./Rule"
import {Router, Route, Link, IndexRoute, hashHistory, browserHistory} from "react-router"

class Router extends React.Component {
  render(){
    return(
      <div>
        <Dashboard/>
        <Rule/>
      </div>
    )
  }
}

export default Router;
