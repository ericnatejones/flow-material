import React, {Component} from "react"
import River from "./River"
import {loadRiverData} from "./dataRequest"
import {updateFlow} from "../river-list/action"
import { connect } from "react-redux"

function assignColor(flow, upper, lower){
  if (flow === "FROZEN") return "#A5F2F3"
  flow = Number(flow)
  if (upper <= lower) return "orange"
  if (flow < lower) return "#ffd9d9"
  if (flow > upper) return "lightblue"
  if (flow >= lower && flow <= upper) return "#a8cba8"
  return "white"
}

class RiverContainer extends Component{

  componentDidMount() {
    loadRiverData(this.props.river.apiId).then((response) => {
      let flow = response.data.value.timeSeries[0].values[0].value[0].value
      let apiId = response.data.value.timeSeries[0].sourceInfo.siteCode[0].value
      this.props.updateFlow(flow, apiId)
    })
  }

  render(){
    let backgroundColor = "white"

    if(this.props.river.isFavorited){
      backgroundColor = assignColor(this.props.river.flow, this.props.river.upperParam, this.props.river.lowerParam)
    }

    return <River river={this.props.river} backgroundColor={backgroundColor}/>
  }
}

export default connect(state => state, { updateFlow }) (RiverContainer);
