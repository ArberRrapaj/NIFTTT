import React from 'react'
import {BrowserRouter, Link, Route} from "react-router-dom"

class RuleList extends React.Component {
  constructor(){
    super();
    this.state = {
      "rules":[{
        "id": 1,
        "name": "Like my GFs pic after random time",
        "automations": 34,
        "used_integrations": ["instagram"]
      },
      {
        "id": 2,
        "name": "Autolike my own tweets :P",
        "automations": 12,
        "used_integrations": ["twitter"]
      },
      {
        "id": 3,
        "name": "Respond thanks to every comment",
        "automations": 28,
        "used_integrations": ["instagram"]
      }]
    }
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
  state = {
    "show": true
  }
  render(){
    if(this.state.show){
      return (
        <div id="dashboard">
        <h1>Dashboard</h1>
        <RuleList/>
        </div>
      );
    }
    else {
      return(null)
    }
  }
}

export default Dashboard
