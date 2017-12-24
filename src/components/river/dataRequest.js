import axios from "axios"
const baseURL = process.env.BASE_URL || "http://localhost:8000/"

const axiosNoHeader = axios.create();

export function loadRiverData(apiId) {
  const url = 'https://waterservices.usgs.gov/nwis/iv/?format=json&sites='
  const site = apiId
  const param = '&parameterCd=00060'
  return axiosNoHeader.get(url+site+param)
}

export function updateParam(which, streamId, param) {
  if (!isNaN(param)){
    axios.put(baseURL+"api/favorite/param/"+which+streamId, { param })
    .then((response) => {
      console.log(response)
    })
  }
}
