import axios from "axios";

const usersApi = axios.create({
    baseURL: 'http://localhost:8000/users/'
})
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Token ${token}` } : {};
};


export const getUser = () => usersApi.get(`users/me/`, { headers: getAuthHeaders() })
export const getUserDetail = (id) => usersApi.get(`users/${id}`, { headers: getAuthHeaders() })
export const registerUser = (data) => usersApi.post('users/', data)
export const getUserFollowers = (user_id) => usersApi.get(`follows/?followed=${user_id}`)
export const getUserFollowed = (user_id) => usersApi.get(`follows/?follower=${user_id}`)
