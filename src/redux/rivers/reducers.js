// get list rivers with just an id and an "isFavorited"


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
    if(stream._id){
      stream = stream._id
    }
    return {
      stream,
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
      return handleFavorites(action.favorites, rivers).sort(riverSort) || rivers
    case "UN_FAVORITE":
      const updatedRivers = rivers.map(river=>{
        if (river._id === action.favoriteToRemove){
          river.isFavorited = false
        }
        return river
      })
      return updatedRivers.sort(riverSort) || rivers.sort(riverSort)
    case "LOGIN":
      return handleFavorites(action.favorites, rivers) || rivers
    case "LOAD_FAVORITES":
      return handleFavorites(action.favorites, rivers) || rivers
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
    case "ADD_RIVER":
      return [...rivers, action.river]
    default:
      return rivers
  }
}

export default riversReducer
