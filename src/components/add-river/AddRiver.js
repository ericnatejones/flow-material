import React from "react"
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

export default function AddRiverForm(props){
  return (
    <div className="form-container">
      <form onSubmit={props.handleSubmit}>
        <TextField
          floatingLabelText="This can be a USGS site's url or ID"
          hintText="13246000"
          fullWidth={true}
          name="input"
          onChange={props.handleChange}
          value={props.input}
        />
      <RaisedButton type="submit" label={props.buttonText} primary={true} />
      </form>
    </div>
  )
}
