import React, {Component} from "react"
import River from "./River"
import {loadRiverData, updateParam} from "./dataRequest"
import {updateFlow, favorite, unFavorite} from "../../redux/rivers/actions"
import { connect } from "react-redux"
import autoBind from 'react-autobind'
import {toastr} from 'react-redux-toastr'

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
  constructor(props){
    super(props)

    this.state = {
      upperParam: props.river.upperParam,
      lowerParam: props.river.lowerParam
    }
    autoBind(this)
  }

  componentDidMount() {
    loadRiverData(this.props.river.apiId).then((response) => {
      let flow = response.data.value.timeSeries[0].values[0].value[0].value
      let apiId = response.data.value.timeSeries[0].sourceInfo.siteCode[0].value
      this.props.updateFlow(flow, apiId)
    })
  }

  handleBlurAndSaveParam(e){
    toastr.success('parameter saved')
    updateParam(e.target.name+"/", this.props.river.updateId, parseInt(e.target.value, 10))
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  render(){
    let backgroundColor = "white"

    if(this.props.river.isFavorited){
      backgroundColor = assignColor(
        this.props.river.flow,
        this.state.upperParam || this.props.river.upperParam,
        this.state.lowerParam || this.props.river.lowerParam
      )
    }

    return <River
      river={this.props.river}
      params={this.state}
      backgroundColor={backgroundColor}
      handleBlurAndSaveParam={this.handleBlurAndSaveParam}
      handleChange={this.handleChange}
      unFavorite={this.props.unFavorite}
      favorite={this.props.favorite}
      />
  }
}

export default connect(state => state, { updateFlow, unFavorite, favorite }) (RiverContainer);
