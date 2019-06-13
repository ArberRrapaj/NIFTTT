import React from "react"
import axios from "axios"
import Cookies from "js-cookie"


class Rule extends React.Component {
  constructor(){
    super()
    this.state = {
      "rule": "",
      "loadedEverything": false
    }

    this.toggleRule = this.toggleRule.bind(this)
  }

  componentDidMount(){
    // if component has data made available through parent component (Dashboard)
    if (this.props.location.state != undefined){
      this.setState({
        "rule": this.props.location.state.rule
      })
      this.addPlatforms()
    } else {
      let axConf = {
        url: `http://localhost:8080/rules/${this.props.match.params.id}`,
        method: "get",
        headers: {
          "authtoken": Cookies.get("authtoken")
        }
      }

      axios.request(axConf)
      .then(res=>{
        this.setState({
          "rule": res.data
        })
        this.addPlatforms()
      })
      .catch(error=>{
        alert(`An unknown error has occured.`)
        console.error(error)
      })
    }
  }

  addPlatforms(){
    const axConf = {
      url: "http://localhost:8080/platforms",
      method: "get",
      headers:{
        "authtoken": Cookies.get("authtoken")
      }
    }

    axios.request(axConf)
    .then(res=>{
      const rule = this.state.rule
      rule.triggerPlatform = res.data.find(item=>{return item.id==rule.triggerPlatform})
      rule.actionPlatform = res.data.find(item=>{return item.id==rule.actionPlatform})
      this.setState({
        "rule": rule
      })

      this.setState({
        "loadedEverything": true
      })
    })
    .catch(error =>{
      alert(`An unknown error has occured.`)
      console.error(error)
    })
  }

  toggleRule(){
    const rule = this.state.rule
    rule.active = rule.active?0:1
    this.setState({
      "rule": rule
    })
    const putRule = JSON.parse(JSON.stringify(rule));
    putRule.triggerPlatform = putRule.triggerPlatform.id
    putRule.actionPlatform = putRule.actionPlatform.id

    let axConf = {
      url: `http://localhost:8080/rules/${this.props.match.params.id}`,
      method: "put",
      headers: {
        "authtoken": Cookies.get("authtoken")
      },
      data: putRule
    }

    axios.request(axConf)
    .then(res=>{
      // this.setState({
      //   "rule": res.data
      // })
      // this.addPlatforms()
    })
    .catch(error=>{
      alert(`An unknown error has occured.`)
      console.error(error)
    })

  }

  render(){
    var selectedRule = this.state.rule;

    return(
      <div id="rule">
        <h1>{selectedRule.name}</h1>
        {this.state.loadedEverything?(
        <div>
          <div id="trigger_action">
            <div className="trigger_action_cont">
              <h2>{this.state.rule.triggerPlatform.name}</h2>
              <p>{this.state.rule.triggerPayload}</p>
            </div>
            <h1><i className="fa fa-arrow-right"></i></h1>
            <div className="trigger_action_cont">
              <h2>{this.state.rule.actionPlatform.name}</h2>
              <p>{this.state.rule.actionPayload}</p>
            </div>
          </div>
          <div id="rule_status">
            <p>Current status of rule: {this.state.rule.active?"active":"inactive"}</p>
            <button id="toggle_rule" onClick={this.toggleRule}>Turn {this.state.rule.active?"Off":"On"}</button>
          </div>
        </div>
      ):(
        <div></div>
      )}
      </div>
    )
  }
}

export default Rule;
