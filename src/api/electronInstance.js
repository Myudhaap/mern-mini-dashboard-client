import axios from "axios";

const electronInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

electronInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token")

        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    }, (err) => {
        return Promise.reject(err)
    } 
)

export default electronInstance