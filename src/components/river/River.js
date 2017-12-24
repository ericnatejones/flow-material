import React from "react"
import {ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import "./index.css"

export default function River(props){
  const style = {
    flow: {
      display: "inline-block"
    },
    container: {
      textAlign: "center",
      backgroundColor: props.backgroundColor
    },
    title: {
      display: "inline-block",
      width: "50%"
    },
    param: {
      display: "inline"
    }
  }

  const flowText = props.river.flow < 0  ? "FROZEN" : props.river.flow + " cfs"

  const step = props.river.flow ? Math.floor(props.river.flow/10) : 1

  const functionName = props.river.isFavorited ?
  ()=>{
    props.unFavorite(props.river._id)
  } :
  ()=>props.favorite(props.river._id)

  return (
    <div>
      <div className="container" style={style.container}>
        {props.river.isFavorited &&
        <input
          style={style.param}
          value={props.params.lowerParam || props.river.lowerParam}
          onChange={props.handleChange}
          onBlur={props.handleBlurAndSaveParam}
          type="number"
          step={step}
          name="lowerParam"
        />}
        <ListItem
          onClick={functionName}
          style={style.title}
          primaryText={props.river.knownTitle}
          secondaryText={flowText}
        />
      {props.river.isFavorited &&
      <input
        style={style.param}
        value={props.params.upperParam || props.river.upperParam}
        onChange={props.handleChange}
        onBlur={props.handleBlurAndSaveParam}
        type="number"
        step={step}
        name="upperParam"
      />}
      </div>
      <Divider/>
    </div>
  )
}
