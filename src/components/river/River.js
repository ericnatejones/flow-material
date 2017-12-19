import React from "react"
import {ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'

export default function River(props){
  const style = {
    flow: {
      display: "inline-block"
    },
    container: {
      textAlign: "center",
      backgroundColor: props.backgroundColor
    }
  }

  const flowText = props.river.flow === "FROZEN" ? props.river.flow : props.river.flow + " cfs"

  return (
    <div>
      <div style={style.container}>
        <ListItem
          primaryText={props.river.knownTitle}
          secondaryText={flowText}
        />
      </div>
      <Divider inset={true} />
    </div>
  )
}
