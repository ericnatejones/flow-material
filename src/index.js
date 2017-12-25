import React from 'react'
import ReactDOM from 'react-dom'
import thunk from "redux-thunk"

import { createStore, applyMiddleware, combineReducers } from "redux"
import { Provider } from "react-redux"

import riversReducer from "./components/river-list/action"
import authReducer from "./components/auth/redux/reducers"

import ReduxToastr, {reducer as toastrReducer} from 'react-redux-toastr'

import App from './components/App'

const reducer = combineReducers({
  rivers: riversReducer,
  user: authReducer,
  toastr: toastrReducer
})

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk))

ReactDOM.render(
    <Provider store={store}>
      <div>
        <ReduxToastr
        timeOut={3000}
        newestOnTop={false}
        position="bottom-center"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        />
        <App />
      </div>
    </Provider>
, document.getElementById('root'))
