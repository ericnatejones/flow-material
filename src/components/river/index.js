import React, {Component} from "react"
import River from "./River"
import {loadRiverData} from "./dataRequest"

export default class RiverContainer extends Component{
  constructor(props){
    super(props)
    this.state = {
      title: props.title,
      flow: "",
      lowerParam: "",
      upperParam: "",
      isFavorited: false
    }
  }

  componentDidMount() {
    loadRiverData(this.props.apiId).then((response) => {
      let flow = response.data.value.timeSeries[0].values[0].value[0].value
      if(flow < 0){
        flow = "FROZEN"
      } else {
        flow += " cfs"
      }
      this.setState({
        title: response.data.value.timeSeries[0].sourceInfo.siteName,
        flow
      })
    })
  }

  render(){
    return <River river={this.props.riverReducer || this.state}/>
  }
}
