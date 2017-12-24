import React, {Component} from "react"
import RiverList from "./RiverList"
import {loadRivers, loadFavorites} from "./action"
import { connect } from "react-redux"

class RiverListContainer extends Component{
  componentDidMount() {
    this.props.loadRivers()
    if (this.props.user.isAuthenticated){
      this.props.loadFavorites()
    }
  }

  render(){
    return <RiverList rivers={this.props.rivers} />
  }
}

export default connect(state => state, { loadRivers, loadFavorites }) (RiverListContainer);
