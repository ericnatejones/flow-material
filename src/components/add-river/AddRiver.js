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
      {props.isAdmin && 
          <TextField
            floatingLabelText="Enter runs common name"
            hintText="Snake River Canyon Above Alpine, WY"
            fullWidth={true}
            name="knownTitle"
            onChange={props.handleChange}
            value={props.knownTitle}
          />}
      <RaisedButton type="submit" label={props.buttonText} primary={true} />
      </form>
    </div>
  )
}
