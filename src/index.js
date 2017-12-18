import React from 'react'
import ReactDOM from 'react-dom'
import thunk from "redux-thunk"

import { createStore, applyMiddleware, combineReducers } from "redux"
import { Provider } from "react-redux"

import riversReducer from "./components/river-list/action"
import authReducer from "./components/auth/redux/reducers"

import App from './components/App'

const reducer = combineReducers({riversReducer, authReducer})

const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
, document.getElementById('root'))
