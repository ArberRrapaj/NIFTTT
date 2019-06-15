import React from "react"
// import {BrowserRouter, Link, Route} from "react-router-dom"
import axios from "axios"
import Cookies from "js-cookie"
import {withRouter, Redirect} from "react-router-dom"

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
      registerIcecream: "",
      redirection: ""
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
    if(this.state.email == ""){
      alert("Please fill in the email field.")
    } else {
      uiu.showSpinner(this.refs.login_wrapper, this.refs.spinner);

      // , {withCredentials: true}
      axios.get(`https://nifttt.cetindere.de:8080/users/${this.state.email}`)
      .then(res=>{
        uiu.hideSpinner(this.refs.real_login_wrapper, this.refs.spinner);
        this.refs.loginPassword.focus()
      })
      .catch(error=>{
        if(error.response && error.response.status == 404){
          uiu.hideSpinner(this.refs.register_wrapper, this.refs.spinner);
          this.refs.registerFirstname.focus()
        } else if (error.response.status == 400) {
          alert("This is not a valid email!")
        } else {
          console.error("error while checking user existance: ")
          console.error(error)
        }
      })
    }
    e.preventDefault()
  }

  realLogin(e){
    uiu.showSpinner(this.refs.real_login_wrapper, this.refs.spinner);
    axios.post("https://nifttt.cetindere.de:8080/login", this.state)
    .then(res=>{
      uiu.hideOnly(this.refs.spinner);
      Cookies.set("authtoken", res.data.authtoken, {expires: 7})
      Cookies.set("email", this.state.email, {expires: 7})
      this.props.history.push("/dashboard")
      this.props.callback()
    })
    .catch(error=>{
      uiu.hideOnly(this.refs.spinner);
      if(error.response.status == 401 || error.response.status == 400){
        alert("Wrong password. Please try again!")
        this.props.history.push("/login")
        uiu.showOnly(this.refs.login_wrapper);
        this.setState({
          "loginPassword": ""
        })
        this.refs.emailInput.focus()
      }else{
        console.log("error while logging in: " )
        console.log(error)
      }
    })
    e.preventDefault()
  }

  register(e){
    if(this.state.firstName == "" || this.state.registerPassword == ""
      || this.state.registerIcecream == ""){
        alert("All text fields are obligatory!")
    } else {
      uiu.showSpinner(this.refs.register_wrapper, this.refs.spinner)
      axios.post("https://nifttt.cetindere.de:8080/register", this.state)
      .then(res=>{
        uiu.hideOnly(this.refs.spinner)
        alert("Thank you for registering. Please Log-in now.")
        this.props.history.push("/login")
        this.props.callback()
      })
      .catch(error=>{
        uiu.hideOnly(this.refs.spinner)
        if(error.response.status == 401 ||error.response.status == 400){
          alert("")
          // TODO: False password
        }else{
          console.log("error while logging in: " )
          console.log(error)
        }
      })
    }
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
    if(this.state.redirection == ""){
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
                  onChange={this.handleInput}/>
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
    } else {
      return(
        <Redirect to={this.state.redirection}/>
      )
    }
  }
}

export default withRouter(Login)
