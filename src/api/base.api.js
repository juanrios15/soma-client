import axios from "axios";

const usersApi = axios.create({
    baseURL: 'http://localhost:8000/'
})
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Token ${token}` } : {};
};

export const login = (data) => usersApi.post('api-token-auth/', data)
