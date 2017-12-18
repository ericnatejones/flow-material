import React from "react"
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

export default function Form(props){
  const style = {
    button: {
      margin: "12px"
    },
    input: {
      width: "50%"
    }
  }

  return(
    <div>
      <form onSubmit={props.handleSubmit}>
        <TextField
          floatingLabelText="Username"
          name="username"
          className="input username"
          style={style.input}
          value={props.username}
          onChange={props.handleInput}
        />
        <TextField
          floatingLabelText="Password"
          type="password"
          name="password"
          className="input password"
          style={style.input}
          value={props.password}
          onChange={props.handleInput}
        />
        <div>
          <RaisedButton onClick={props.handleSubmit} label={props.type} primary={true} button={style.button}/>
        </div>

      </form>
    </div>
  )
}
