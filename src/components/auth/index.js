import React, {Component} from "react"
import Auth from "./Auth"
import Drawer from 'material-ui/Drawer'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from "react-redux"
import autoBind from 'react-autobind'
import LogoutContainer from "./logout"
import { signup, login } from "../../redux/auth/actions"

const button = {
  right: 0,
  position: "fixed",
  zIndex: 10
}

const logout = {
  position: "absolute",
  right: 0,
  zIndex: 10
}

class AuthContainer extends Component{
  constructor() {
    super()

    this.sidePanelWidth = window.innerWidth > 550 ? 500 : window.innerWidth

    this.state = {
      open: false
    }
  autoBind(this)
  }

  handleToggle = () => this.setState((prevState)=>{
    return {open: !prevState.open}
  })

  handleSubmit({username, password}, type){
    this.props[type]({
      username,
      password
    })
  }

  render() {

    return (
      <div>
        {this.props.user.isAuthenticated ? <div style={logout}><LogoutContainer /></div> :
          <div>
        <RaisedButton
          label="Log In/Sign Up"
          onClick={this.handleToggle}
          style={button}
        />
        <div>

          <Drawer width={this.sidePanelWidth} openSecondary={true} open={this.state.open} >
            <Auth handleSubmit={ this.handleSubmit } handleToggle={this.handleToggle}/>
          </Drawer>
        </div>
      </div>}
      </div>
    )
  }
}

export default connect(state => state, {signup, login }) (AuthContainer);
