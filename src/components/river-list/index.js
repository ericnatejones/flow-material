import React, {Component} from "react"
import RiverList from "./RiverList"
import {loadRivers} from "./action"
import { connect } from "react-redux"

class RiverListContainer extends Component{
  componentDidMount() {
    this.props.loadRivers()
  }

  render(){
    return <RiverList rivers={this.props.riversReducer}/>
  }
}

export default connect(state => state, { loadRivers }) (RiverListContainer);
