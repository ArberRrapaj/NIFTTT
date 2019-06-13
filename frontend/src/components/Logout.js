import React from 'react'
import {withRouter} from "react-router-dom"
import Cookies from "js-cookie"

class Logout extends React.Component {
  componentDidMount(){
    Cookies.remove("authtoken")
    Cookies.remove("email")
    this.props.history.push("/login")
    this.props.callback()
  }

  render(){
    return(
      <div></div>
    )
  }
}

export default withRouter(Logout)
