import React from "react"
import RaisedButton from 'material-ui/RaisedButton'
import { logout } from "../../../redux/auth/actions"
import { connect } from "react-redux"

function Logout(props){
  const style = {
    margin: 12,
  }

  return(
    <RaisedButton onClick={props.logout} label="Log Out" primary={true} style={style} />
  )
}

export default connect(null, {logout})(Logout)
