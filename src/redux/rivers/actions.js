import axios from "axios"
import {toastr} from 'react-redux-toastr'

const baseURL = process.env.BASE_URL || "http://localhost:8000/"


export function loadRivers() {
  return (dispatch) => {
    axios.get(`${baseURL}stream`)
    .then((response) => {
      dispatch({
        type: "LOAD_RIVERS",
        rivers: response.data
      });
    })
    .catch((err) => {
      console.error(err);
      toastr.error(err.response.data.message)
    })
  }
}

export function updateFlow(flow, id){
  return {
    type: "UPDATE_FLOW",
    id,
    flow
  }
}

export function loadFavorites() {
  return (dispatch) => {
    axios.get(`${baseURL}api/favorite`)
    .then((response) => {
      dispatch({
        type: "LOAD_FAVORITES",
        favorites: response.data.favoriteStreams
      });
    })
    .catch((err) => {
      console.error(err)
      toastr.error(err.response.data.message)
    })
  }
}

export function favorite(_id){
  return (dispatch) => {
    axios.post(`${baseURL}api/favorite`, {_id})
    .then((response) => {
      dispatch({
        type: "FAVORITE",
        favorites: response.data.favoriteStreams
      })
    })
    .catch((err) => {
      console.error(err)
      toastr.error("River Already Favorited", "Refresh your browser. I'm working on this bug currently")
    })
  }
}

export function unFavorite(_id){
  return (dispatch) => {
    axios({method:"delete", url:`${baseURL}api/favorite/`, data:{_id}})
    .then((response) => {
        dispatch({
            type: "UN_FAVORITE",
            favoriteToRemove: _id
        });

    })
    .catch((err) => {
      console.error(err)
      toastr.error(err.message)
    })
  }
}
// get river info
export function submitRiver({url, knownTitle}){
  return (dispatch) => {
    let site = url.match(/\d/g).join("");

    axios.post(`${baseURL}stream/`, {site, knownTitle})
    .then(response=>{
      toastr.success("river added!", "Log in and click it to favorite it")
      dispatch({
          type: "ADD_RIVER",
          river: {
            ...response.data,
            knownTitle: knownTitle || response.data.apiTitle,
            isFavorited: false
          }
      });
    })
    .catch((err) => {
      console.error(err)
      toastr.error("river already in database")
    })
  }
}
