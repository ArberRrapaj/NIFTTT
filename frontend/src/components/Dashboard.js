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
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
      }
    }

    axios.request(axConf)
    .then(res=>{
      alert("everything's alright!")
      this.setState({
        state: res.data
      })
    })
    .catch(error=>{
      alert(`An unknown has occured.`)
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
          <p className="rule_field_integrations table_header">Used Integrations</p>
        </div>
        {this.state.rules.map((rule) =>
          <div className="column" onClick={()=>this.selectRule(rule.id)} key={rule.id}>
            <Link to={"rule/" + rule.id} className="rule_field_name"><p>{rule.name}</p></Link>
            <p className="rule_field_automations">{rule.automations}</p>
            <p className="rule_field_integrations">{rule.used_integrations}</p>
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
