import axios from "axios";

const attemptsApi = axios.create({
    baseURL: 'http://localhost:8000/attempts/'
})
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Token ${token}` } : {};
};

export const startAttempt = (data) => attemptsApi.post('attempts/', data, { headers: getAuthHeaders() })
export const getAttempt = (attempt_id) => attemptsApi.get(`attempts/${attempt_id}`, { headers: getAuthHeaders() })