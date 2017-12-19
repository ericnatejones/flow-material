import React from "react"
import RiverContainer from "../river"
import {List} from 'material-ui/List'

export default function RiverList(props){
  const rivers = props.rivers.map(river=>{
    return <RiverContainer river={river} key={river.apiId}/>
  })

  return (
    <List>
      {rivers}
    </List>
  )
}
