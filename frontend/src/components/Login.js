import React from "react"
// import {BrowserRouter, Link, Route} from "react-router-dom"
import axios from "axios"
const uiu = require("../UIUtils")

{/* TODO cleanup this code and the connected CSS part */}
class Login extends React.Component {
  constructor(){
    super()
    this.state={
      email: "",
      loginPassword: "",
      registerFirstname: "",
      registerPassword: "",
      registerIcecream: ""
    }

    this.emailLogin = this.emailLogin.bind(this)
    this.realLogin = this.realLogin.bind(this)
    this.register = this.register.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }

  componentDidMount(){
    this.refs.emailInput.focus()
  }

  emailLogin(e){
    uiu.showSpinner(this.refs.login_wrapper, this.refs.spinner);

    axios.get(`http://localhost:8080/users/${this.state.email}`)
    .then(res=>{
      uiu.hideSpinner(this.refs.real_login_wrapper, this.refs.spinner);
      this.refs.loginPassword.focus()
    })
    .catch(error=>{
      if(error.response && error.response.status == 404){
        uiu.hideSpinner(this.refs.register_wrapper, this.refs.spinner);
        this.refs.registerFirstname.focus()
      }else{
        console.log("error while checking user existance: ")
        console.log(error)
      }
    })
    e.preventDefault()
  }

  realLogin(e){
    uiu.showSpinner(this.refs.real_login_wrapper, this.refs.spinner);
    axios.post("http://localhost:8080/login", this.state)
    .then(res=>{
      uiu.hideOnly(this.refs.spinner);
      alert("nice")
    })
    .catch(error=>{
      uiu.hideOnly(this.refs.spinner);
      if(error.response.status == 401){
        alert("nope")
      }else{
        console.log("error while logging in: " )
        console.log(error)
      }
    })
    e.preventDefault()
  }

  register(e){
    uiu.showSpinner(this.refs.register_wrapper, this.refs.spinner)
    axios.post("http://localhost:8080/register", this.state)
    .then(res=>{
      uiu.hideOnly(this.refs.spinner)
      alert("nice")
    })
    .catch(error=>{
      uiu.hideOnly(this.refs.spinner)
      if(error.response.status == 401){
        alert("nope")
        // TODO: False password
      }else{
        console.log("error while logging in: " )
        console.log(error)
      }
    })
    e.preventDefault()
  }

  handleInput(e){
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: value
    })
  }

  render(){
    return(
      <div id="login_wrapper_wrapper">
        {/* email-login */}
        <div ref="login_wrapper" className="hor_center">
          <div className="login_text">
            <h2>Please enter your E-Mail</h2>
          </div>
          <form>
            <div className="flex-row">
              <input name="email" value={this.state.email} ref="emailInput"
                className="login_box" type="email" placeholder="E-Mail"
                onChange={this.handleInput} autofocus/>
              <button onClick={this.emailLogin} className="login_box_submit">
                <i className="fa fa-arrow-right"></i>
              </button>
            </div>
          </form>
        </div>
        {/* spinner */}
        <div ref="spinner"><div></div><div></div><div></div><div></div></div>
        {/* real-login */}
        <div ref="real_login_wrapper" className="hor_center no_display">
          <div className="login_text">
            <h2>Please enter your password</h2>
          </div>
          <form>
            <div className="flex-row">
              <input name="loginPassword" value={this.state.loginPassword} ref="loginPassword"
                className="login_box" type="password" placeholder="Password"
                onChange={this.handleInput}/>
              <button onClick={this.realLogin} className="login_box_submit">
                <i className="fa fa-arrow-right"></i>
              </button>
            </div>
          </form>
        </div>
        <div ref="register_wrapper" className="hor_center no_display">
          <div className="login_text">
            <h2>Please enter your details</h2>
          </div>
          <form>
            <div className="flex-row flex-vertical">
              <input name="registerFirstname" value={this.state.registerFirstname}
                className="register_box" type="text" placeholder="First Name"
                onChange={this.handleInput} ref="registerFirstname"/>
              <input name="registerPassword" value={this.state.registerPassword}
                className="register_box" type="password" placeholder="Password"
                onChange={this.handleInput}/>
              <input name="registerIcecream" value={this.state.registerIcecream}
                className="register_box" type="text" placeholder="Favorite ice cream flavor"
                onChange={this.handleInput}/>
              <button onClick={this.register} className="register_box_submit">
                Register <i className="fa fa-arrow-right"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Login;
