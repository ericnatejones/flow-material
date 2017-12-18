// get rivers information
import axios from "axios"
// function to favorite rivers

// get list rivers with just an id and an "isFavorited"
const axiosNoHeader = axios.create();

export function loadRiverData(apiId) {
  const url = 'https://waterservices.usgs.gov/nwis/iv/?format=json&sites='
  const site = apiId
  const param = '&parameterCd=00060'
  return axiosNoHeader.get(url+site+param)
}
