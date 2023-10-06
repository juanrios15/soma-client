import axios from "axios";

const usersApi = axios.create({
    baseURL: 'http://localhost:8000/users/'
})

export const getUser = () => usersApi.get(`users/me/`)