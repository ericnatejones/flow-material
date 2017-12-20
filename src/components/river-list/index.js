import React, {Component} from "react"
import RiverList from "./RiverList"
import {loadRivers, loadFavorites, sortRivers} from "./action"
import { connect } from "react-redux"

class RiverListContainer extends Component{
  componentDidMount() {
    this.props.loadRivers()
    if (this.props.user.isAuthenticated){
      this.props.loadFavorites()
    }
  }

  render(){
    return <div><button onClick={this.props.sortRivers}>sort</button><RiverList rivers={this.props.rivers} /></div>
  }
}

export default connect(state => state, { loadRivers, loadFavorites, sortRivers }) (RiverListContainer);
