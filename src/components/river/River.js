import React from "react"
import {ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'

const style = {
  flow: {
    display: "inline-block"
  },
  container: {
    textAlign: "center"
  }
}

export default function(props){
  return (
    <div>
      <div style={style.container}>
        <ListItem
          primaryText={props.river.title}
          secondaryText={props.river.flow}


        />
      </div>
      <Divider inset={true} />
    </div>
  )
}
