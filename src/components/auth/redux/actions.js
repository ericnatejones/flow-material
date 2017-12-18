import axios from "axios"
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
                console.log(response.data, "succesful signup");
                dispatch(login(credentials));
            })
            .catch((err) => {
                console.dir(err);
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
                dispatch({
                  type: "LOGIN",
                  data: response.data
                });
            })
            .catch((err) => {
                console.error(err);
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
