import React, {Component} from "react"
import autoBind from 'react-autobind'
import AddRiver from "./AddRiver"
import {submitRiver} from "../../redux/rivers/actions"
import { connect } from "react-redux"

class AddRiverContainer extends Component {
  constructor(){
    super()
    this.state = {
      input: "",
      buttonText: "Add River",
      knownTitle: ""
    }
    autoBind(this)
  }

  handleChange(e){
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.submitRiver({
      url: this.state.input,
      knowTitle: this.state.knowTitle
    })
    this.setState({buttonText: "Add Another River"})
  }

  render(){
    return(
        <AddRiver
          buttonText={this.state.buttonText}
          input={this.state.input}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
    )
  }
}

export default connect(null, { submitRiver }) (AddRiverContainer);
