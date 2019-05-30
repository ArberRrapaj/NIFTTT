import React from 'react'
import {BrowserRouter, Link, Route} from "react-router-dom"

class Login extends React.Component {
  // <Link to="/dashboard"><h1>NIFTTT</h1></Link>
  constructor(){
    super()
    this.state={
      state: "input_email",
      loading: false,
      login_wrapper_classes: ""
    }

    this.emailLogin = this.emailLogin.bind(this)
  }

  emailLogin(e){
    this.setState({
      state: "input_email_loading",
      loading: true,
      login_wrapper_classes: "slide_out"
    })
    this.refs.login_wrapper.className="slide_out"
    this.refs.spinner.className="slide_in lds-ellipsis"

    setTimeout(()=>{
      this.refs.spinner.className="slide_out"
      this.refs.real_login_wrapper.className="slide_in slide_container"
    }, 1500);
    e.preventDefault();
  }

  render(){
    return(
      <div id="login_wrapper_wrapper">
        <div ref="login_wrapper" className="slide_container">
          <div className="login_text">
            <h2>Please enter your E-Mail</h2>
          </div>
          <form>
            <div className="login_wrapper">
              <input className="login_email" type="text" placeholder="E-Mail"/>
              <button onClick={this.emailLogin} className="login_email_submit">
                <i className="fa fa-arrow-right"></i>
              </button>
            </div>
          </form>
        </div>
        <div ref="spinner"><div></div><div></div><div></div><div></div></div>
        <div ref="real_login_wrapper" className="slide_container no_display">
          <div className="login_text">
            <h2>Please enter your password</h2>
          </div>
          <form>
            <div className="login_wrapper">
              <input className="login_email" type="password" placeholder="Password"/>
              <button onClick={this.emailLogin} className="login_email_submit">
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
