import axios from "axios"
import {toastr} from 'react-redux-toastr'

const baseURL = process.env.BASE_URL || "http://localhost:8000/"


//AUTHORIZATION

axios.interceptors.request.use(config => {
    let token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
}, function (error) {
    return Promise.reject(error);
});

export function signup(credentials) {
    return (dispatch) => {
        axios.post(`${baseURL}auth/signup`, credentials)
            .then((response) => {
                toastr.success("sign up succesful", "You will automatically be logged in")
                console.log(response.data, "succesful signup")
                dispatch(login(credentials))
            })
            .catch((err) => {
                console.dir(err);
                toastr.error(err.response.data.message)

                dispatch({
                  type: "ERROR",
                  error: err.response.data.message,
                  errorType: "signupError"
                })
            })
    }
}

export function login(credentials) {
    return (dispatch) => {
        axios.post(`${baseURL}auth/login`, credentials)
            .then((response) => {
                toastr.success("login succesful", "Click a river to favorite it")
                dispatch({
                  type: "LOGIN",
                  data: response.data,
                  favorites: response.data.user.favoriteStreams
                })
            })
            .catch((err) => {
                console.error(err);
                toastr.error(err.response.data.message)

                dispatch({
                  type: "ERROR",
                  error: err.response.data.message,
                  errorType: "loginError"
                })
            })
    }
}

export function logout() {
    return {
      type: "LOGOUT"
    };
}
