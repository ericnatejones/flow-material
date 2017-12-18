// get list rivers with just an id and an "isFavorited"
import axios from "axios"
const baseURL = process.env.BASE_URL || "http://localhost:8000/"

function RiversReducer(rivers = [], action) {
  switch (action.type) {
    case "LOAD_RIVERS":
      return [...rivers, ...action.rivers]
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

export default RiversReducer
