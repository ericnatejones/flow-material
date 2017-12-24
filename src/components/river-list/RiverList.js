import React from "react"
import RiverContainer from "../river"
import {List} from 'material-ui/List'

const styles = {
  display: "flex",
  margin: "auto"
}

export default function RiverList(props){
  const rivers = props.rivers.filter(river=>{
    return river.apiTitle.toLowerCase().indexOf(props.search.toLowerCase()) >= 0
    || river.knownTitle.toLowerCase().indexOf(props.search.toLowerCase()) >= 0
  })
  .map(river=>{
    return <RiverContainer river={river} key={river.apiId}/>
  })

  return (
    <div>
      <input style={styles}
        placeholder="Search"
        name="search"
        value={props.search}
        onChange={props.handleChange}
      />
      <List>
        {rivers}
      </List>
    </div>
  )
}
