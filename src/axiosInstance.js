import Axios from 'axios'

export const axiosInstance = Axios.create({
    // baseURL: "http://127.0.0.1:8000/api/"
    baseURL: "https://tobi.pythonanywhere.com/api/"
})