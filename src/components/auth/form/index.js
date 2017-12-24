import React, {Component} from "react"
import Form from "./Form"
import autoBind from 'react-autobind'

export default class FormContainer extends Component{
  constructor(){
    super()

    this.state = {
      username: "",
      password: ""
    }
    autoBind(this)
  }

  handleInput(e){
    this.setState({[e.target.name]: e.target.value})
  }

  submit(e){
    e.preventDefault()
    this.props.handleSubmit(this.state, this.props.type.toLowerCase())
    this.setState({username:"", password:""})
  }

  render(){
    return (
      <Form username={this.state.username}
            password={this.state.password}
            handleInput={this.handleInput}
            type={this.props.type}
            handleToggle={this.props.handleToggle}
            handleSubmit={this.submit}
      />
    )
  }
}
