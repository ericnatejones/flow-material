import React from "react"
import RiverContainer from "../river"
import {List} from 'material-ui/List'

export default function RiverList(props){
  const rivers =props.rivers.map(river=>{
    return <RiverContainer apiId={river.apiId} title={river.apiTitle} key={river.apiId}/>
  })

  return (
    <List>
      {rivers}
    </List>
  )
}
