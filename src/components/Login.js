import React from 'react'
import {BrowserRouter, Link, Route} from "react-router-dom"

{/* TODO cleanup this code and the connected CSS part */}
class Login extends React.Component {
  constructor(){
    super()
    this.state={
      state: "input_email",
      loading: false,
      login_wrapper_classes: ""
    }

    this.emailLogin = this.emailLogin.bind(this)
    this.realLogin = this.realLogin.bind(this)
    this.register = this.register.bind(this)
  }

  emailLogin(e){
    this.setState({
      state: "input_email_loading",
      loading: true,
      login_wrapper_classes: "slide_out"
    })
    {/* slide to loader */}
    this.refs.login_wrapper.className="slide_out"
    this.refs.spinner.className="slide_in lds-ellipsis"

    {/* only cosmetic */}
    setTimeout(()=>{
      this.refs.spinner.className="slide_out"
      // this.refs.real_login_wrapper.className="slide_in hor-center"
      this.refs.register_wrapper.className="slide_in hor-center"
    }, 150);
    e.preventDefault()
  }

  realLogin(e){
    alert("not implemented yet!")
    e.preventDefault()
  }

  register(e){
    alert("test")
    e.preventDefault()
  }

  render(){
    return(
      <div id="login_wrapper_wrapper">
        {/* email-login */}
        <div ref="login_wrapper" className="hor-center">
          <div className="login_text">
            <h2>Please enter your E-Mail</h2>
          </div>
          <form>
            <div className="flex-row">
              <input className="login_email" type="text" placeholder="E-Mail"/>
              <button onClick={this.emailLogin} className="login_email_submit">
                <i className="fa fa-arrow-right"></i>
              </button>
            </div>
          </form>
        </div>
        {/* spinner */}
        <div ref="spinner"><div></div><div></div><div></div><div></div></div>
        {/* real-login */}
        <div ref="real_login_wrapper" className="hor-center no_display">
          <div className="login_text">
            <h2>Please enter your password</h2>
          </div>
          <form>
            <div className="flex-row">
              <input className="login_email" type="password" placeholder="Password"/>
              <button onClick={this.realLogin} className="login_email_submit">
                <i className="fa fa-arrow-right"></i>
              </button>
            </div>
          </form>
        </div>
        <div ref="register_wrapper" className="hor-center no_display">
          <div className="login_text">
            <h2>Please enter your E-Mail</h2>
          </div>
          <form>
            <div className="flex-row flex-vertical">
              <input className="register_email" type="text" placeholder="E-Mail"/>
              <button onClick={this.register} className="register_email_submit">
                <i className="fa fa-arrow-right"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Login;
