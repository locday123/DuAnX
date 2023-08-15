import axios from "axios";

axios.defaults.withCredentials = true;
const client = axios.create({
    
    baseURL: import.meta.env.VITE_REACT_API
})

export {client}