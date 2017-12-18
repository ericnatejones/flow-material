import React, {Component} from "react"
import FormContainer from "./form"
import {Tabs, Tab} from 'material-ui/Tabs'
import SwipeableViews from 'react-swipeable-views'
import RaisedButton from 'material-ui/RaisedButton'

const style = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400
  },
  close: {
    position: 'absolute',
    right: 0,
    zIndex: 1
  }
}

export default class Auth extends Component {
  constructor() {
    super()
    this.state = {
      slideIndex: 0
    }
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    })
  }

  render(){
    return (
      <div style={style.container}>
        <div>
          <Tabs
            onChange={this.handleChange}
            value={this.state.slideIndex}
          >
            <Tab label="Create Account" value={0} />
            <Tab label="Log In" value={1} />
          </Tabs>

          <RaisedButton label="close" secondary={true} onClick={this.props.handleToggle} style={style.close} />

          <SwipeableViews
            index={this.state.slideIndex}
            onChangeIndex={this.handleChange}
          >
            <div>
              <FormContainer handleSubmit={this.props.handleSubmit} handleToggle={this.props.handleToggle} type="Signup" />
            </div>
            <div style={style.slide}>
              <FormContainer handleSubmit={this.props.handleSubmit} handleToggle={this.props.handleToggle} type="Login" />
            </div>

          </SwipeableViews>
        </div>
      </div>

    )
  }
}
