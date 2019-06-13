import React from 'react'
import {BrowserRouter, Link, Route} from "react-router-dom"
import axios from "axios"
import Cookies from "js-cookie"

class RuleList extends React.Component {
  constructor(){
    super();

    this.state = {
      "rules":[]
    }

    const axConf = {
      url: `http://localhost:8080/users/${Cookies.get("email")}/rules`,
      method: "get",
      headers: {
        "authtoken": Cookies.get("authtoken")
      }
    }

    axios.request(axConf)
    .then(res=>{
      this.setState({
        rules: res.data
      })
    })
    .catch(error=>{
      alert(`An unknown error has occured.`)
      console.error(error)
    })
  }

  selectRule(id){
    console.log(id)
  }

  render() {
    return(
      <div id="rule_list">
        <div className="column">
          <p className="rule_field_name table_header">Name</p>
          <p className="rule_field_automations table_header">Automations</p>
          <p className="rule_field_integrations table_header">Status</p>
        </div>
        {this.state.rules.map((rule) =>
          <div className="column">
            <Link to={{
                pathname: "rule/" + rule.id,
                state:{
                  "rule": rule
                }
              }} className="rule_field_name"><p>{rule.name}</p></Link>
            <p className="rule_field_automations">{rule.runCount}</p>
            <p className="rule_field_integrations">{rule.active?"on":"off"}</p>
          </div>
        )}
      </div>
    );
  }
}

class Dashboard extends React.Component {
  render(){
    return (
      <div id="dashboard">
      <h1>Dashboard</h1>
      <RuleList/>
      </div>
    );
  }
}

export default Dashboard
