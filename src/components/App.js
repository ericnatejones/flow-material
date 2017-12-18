import React from "react"
import injectTapEventPlugin from 'react-tap-event-plugin'
import Auth from "./auth"
import AddRiverForm from "./add-river"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RiverList from './river-list'

injectTapEventPlugin()

export default function App(){

  return (
    <MuiThemeProvider>
      <div>
        <Auth />
        <AddRiverForm />
        <RiverList />
      </div>
    </MuiThemeProvider>
  )

}
