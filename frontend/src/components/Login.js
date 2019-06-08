import React from "react"
// import {BrowserRouter, Link, Route} from "react-router-dom"
import axios from "axios"

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

  emailLogin(e){
    {/* slide to loader */}
    this.refs.login_wrapper.className="slide_out"
    this.refs.spinner.className="slide_in lds-ellipsis"

    {/* make server request */}
    axios.get("https://jsonplaceholder.typicode.com/users/${this.state.email}")
    .then(res=>{
      this.refs.spinner.className="slide_out"
      this.refs.real_login_wrapper.className="slide_in hor_center"
    })
    .catch(error=>{
      if(error.response.status == 404){
        this.refs.spinner.className="slide_out"
        this.refs.register_wrapper.className="slide_in hor_center"
      }else{
        console.log("error while checking user existance: " )
        console.log(error)
      }
    })

    e.preventDefault()
  }

  realLogin(e){
    axios.post("https://jsonplaceholder.typicode.com/login", this.state)
    .then(res=>{
      this.refs.real_login_wrapper.className="slide_out"
      alert("nice")
    })
    .catch(error=>{
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

  register(e){
    axios.post("https://jsonplaceholder.typicode.com/register", this.state)
    .then(res=>{
      this.refs.real_login_wrapper.className="slide_out"
      alert("nice")
    })
    .catch(error=>{
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
              <input name="email" value={this.state.email}
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
              <input name="login_password" value={this.state.login_password}
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
              <input name="registerFirstname" value={this.state.register_firstname}
                className="register_box" type="text" placeholder="First Name"
                onChange={this.handleInput}/>
              <input name="registerPassword" value={this.state.register_password}
                className="register_box" type="password" placeholder="Password"
                onChange={this.handleInput}/>
              <input name="registerIcecream" value={this.state.register_icecream}
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
