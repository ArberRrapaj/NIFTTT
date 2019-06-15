import React from "react"
import axios from "axios"
import Cookies from "js-cookie"


class Rule extends React.Component {
  constructor(){
    super()
    this.state = {
      "rule": {
        "name": "testname",
        "triggerPayload": "test",
        "actionPayload": "test"
      },
      "loadedEverything": false,
      "editMode": false,
      "platforms": []
    }

    this.saveRule = this.saveRule.bind(this)
    this.toggleRule = this.toggleRule.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.editMode = this.editMode.bind(this)
  }

  componentDidMount(){
    let axConf = {
      url: `http://minervabooks.net:8080/rules/${this.props.match.params.id}`,
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

  addPlatforms(){
    const axConf = {
      url: "http://minervabooks.net:8080/platforms",
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
        "rule": rule,
        "platforms": res.data
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
      url: `http://minervabooks.net:8080/rules/${this.props.match.params.id}`,
      method: "put",
      headers: {
        "authtoken": Cookies.get("authtoken")
      },
      data: putRule
    }

    axios.request(axConf)
    .then(res=>{
    })
    .catch(error=>{
      alert(`An unknown error has occured.`)
      console.error(error)
    })
  }

  saveRule(){
    if(this.state.rule.actionPayload == "" || this.state.rule.triggerPayload == ""){
      alert("The payloads can not be empty.")
    } else {
      const rule = this.state.rule
      this.setState({
        "rule": rule,
        "editMode": false
      })
      const putRule = JSON.parse(JSON.stringify(rule));
      putRule.triggerPlatform = putRule.triggerPlatform.id
      putRule.actionPlatform = putRule.actionPlatform.id

      console.log(putRule)

      let axConf = {
        url: `http://minervabooks.net:8080/rules/${this.props.match.params.id}`,
        method: "put",
        headers: {
          "authtoken": Cookies.get("authtoken")
        },
        data: putRule
      }

      axios.request(axConf)
      .then(res=>{
      })
      .catch(error=>{
        alert(`An unknown error has occured.`)
        console.error(error)
      })
    }
  }

  handleInput(e){
    const rule = this.state.rule
    switch(e.target.name){
      case "rule":
        rule.name = e.target.value
        break
      case "triggerPayload":
        rule.triggerPayload = e.target.value
        break;
      case "actionPayload":
        rule.actionPayload = e.target.value
        break;
      case "triggerPlatform":
        rule.triggerPlatform = this.state.platforms.find(
          item=>{return item.id==e.target.value})
        break;
      case "actionPlatform":
        rule.actionPlatform = this.state.platforms.find(
          item=>{return item.id==e.target.value})
        break;
      default:
        break;
    }
    this.setState({
      "rule": rule
    })
  }

  editMode(){
    this.setState({
      "editMode": true
    })
  }

  render(){
    if(this.state.editMode){
      return(
        <div id="rule">
          {this.state.loadedEverything?(
          <div>
            <input name="rule" type="text" value={this.state.rule.name}
              onChange={this.handleInput}/>
            <div id="trigger_action">
              <div className="trigger_action_cont">
                <select name="triggerPlatform" onChange={this.handleInput}
                  defaultValue={this.state.rule.triggerPlatform.id}>
                  {this.state.platforms.map((platform)=>
                    <option key={platform.id}
                        value={platform.id}>{platform.name}</option>
                  )}
                </select>
                <textarea name="triggerPayload" onChange={this.handleInput}
                  value={this.state.rule.triggerPayload}/>
              </div>
              <h1><i className="fa fa-arrow-right"></i></h1>
              <div className="trigger_action_cont">
                <select name="actionPlatform" onChange={this.handleInput}
                  defaultValue={this.state.rule.actionPlatform.id}>
                  {this.state.platforms.map((platform)=>
                    <option key={platform.id}
                        value={platform.id}>{platform.name}</option>
                  )}
                </select>
                <textarea name="actionPayload" onChange={this.handleInput}
                   value={this.state.rule.actionPayload}/>
              </div>
            </div>
            <button id="save_rule" onClick={this.saveRule}>Save Rule</button>
          </div>
        ):(
          <div></div>
        )}
        </div>
      )
    }
    else{
      return(
        <div id="rule">
          {this.state.loadedEverything?(
          <div>
            <h1>{this.state.rule.name}</h1>
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
              <button id="edit_rule" onClick={this.editMode}>Edit Rule</button>
            </div>
          </div>
        ):(
          <div></div>
        )}
        </div>
      )
    }
  }
}

export default Rule;
