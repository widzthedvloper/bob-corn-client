import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const client = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
})

export const getCornProducts = () => {
    return client.get('/corn-products/')
    .then(res => res.data)
    .catch(err => err)
}