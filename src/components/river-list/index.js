import React, {Component} from "react"
import RiverList from "./RiverList"
import {loadRivers, loadFavorites} from "../../redux/rivers/actions"
import { connect } from "react-redux"
import autoBind from 'react-autobind'


class RiverListContainer extends Component{
  constructor(){
    super()
    this.state = {
      search: ""
    }
    autoBind(this)
  }

  componentDidMount() {
    this.props.loadRivers()
    if (this.props.user.isAuthenticated){
      this.props.loadFavorites()
    }
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  render(){
    return <RiverList
      search={this.state.search}
      rivers={this.props.rivers}
      handleChange={this.handleChange}
      />
  }
}

export default connect(state => state, { loadRivers, loadFavorites }) (RiverListContainer);
