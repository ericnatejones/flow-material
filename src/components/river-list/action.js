// get list rivers with just an id and an "isFavorited"
import axios from "axios"
const baseURL = process.env.BASE_URL || "http://localhost:8000/"

function combineFavoritesAndRivers(favorites, rivers){
  const favoriteIDs = favorites.map(favorite=>{
    return favorite.stream
  })

  for (let i = 0; i < rivers.length; i++){
    let index = favoriteIDs.indexOf(rivers[i]._id)
    if(index >= 0){
      rivers[i].lowerParam = favorites[index].lowerParam
      rivers[i].upperParam = favorites[index].upperParam
      rivers[i].updateId = favorites[index].updateId
      rivers[i].isFavorited = true
    } else {
      rivers[i].isFavorited = false
    }
  }
  return rivers
}

function riverSort(a, b){
  const aFlow = Number(a.flow)
  const bFlow = Number(b.flow)
  if(a.isFavorited && b.isFavorited){
    if (aFlow >= 0 && bFlow <= 0){
      return -1
    }
    if (aFlow > a.lowerParam &&
      aFlow < a.upperParam &&
      (bFlow < b.lowerParam ||
      bFlow > b.upperParam)
    ){
      return -1
    } else if(aFlow > a.upperParam && bFlow < b.lowerParam){
      return -1
    } else {
      return 1
    }
  } else if(a.isFavorited && !b.isFavorited){
    return -1
  } else {
    return 1
  }
}

function handleFavorites(favorites, rivers){
  const mappedFavorites = favorites.map(({stream, upperParam, lowerParam, _id})=>{
    return {
      stream: stream._id,
      upperParam,
      lowerParam,
      updateId: _id
    }
  })
  return combineFavoritesAndRivers(mappedFavorites, rivers)
}

function riversReducer(rivers = [], action) {

  switch (action.type) {
    case "LOAD_RIVERS":
      return [...rivers, ...action.rivers]
    case "FAVORITE":
      return handleFavorites(action.favorites, rivers) || rivers
    case "UN_FAVORITE":
      const updatedRivers = rivers.map(river=>{
        if (river._id === action.favoriteToRemove){
          river.isFavorited = false
        }
        return river
      })
      return updatedRivers || rivers
    case "LOGIN":
      return handleFavorites(action.favorites, rivers) || rivers
    case "LOAD_FAVORITES":
      const favorites = action.favorites.map(({stream, upperParam, lowerParam, _id})=>{
        return {
          stream: stream._id,
          upperParam,
          lowerParam,
          updateId: _id
        }
      })
      const combinedAndMappedRivers = combineFavoritesAndRivers(favorites, rivers)
      return combinedAndMappedRivers || rivers
    case "UPDATE_FLOW":
      const index = rivers.findIndex(river=>river.apiId === action.id)
      const riversCopy = [...rivers]
      riversCopy[index].flow = action.flow
      return riversCopy.sort(riverSort)
    case "LOGOUT":
        const unfavoritedRivers = rivers.map(river=>{
          return {...river, isFavorited: false}
        })
        return unfavoritedRivers
    default:
      return rivers
  }
}

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
      console.error(err);
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
        });
    })
    .catch((err) => {
      console.error(err);
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
      console.error(err);
    })
  }
}

export default riversReducer
