import axios from "axios";

const usersApi = axios.create({
    baseURL: 'http://localhost:8000/users/'
})
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Token ${token}` } : {};
};


export const loginGoogle = (data) => usersApi.post('users/google_login/', data)
export const getUser = () => usersApi.get(`users/me/`, { headers: getAuthHeaders() })
export const getCountries = () => usersApi.get(`countries/`)
export const getUserDetail = (id) => usersApi.get(`users/${id}`, { headers: getAuthHeaders() })
export const editUserDetail = (id, data) => usersApi.patch(`users/${id}/`, data, { headers: getAuthHeaders() })
export const registerUser = (data) => usersApi.post('users/', data)
export const lostPassword = (data) => usersApi.post('users/send_reset_code/', data)
export const resetPassword = (data) => usersApi.post('users/reset_password/', data)
export const getUserFollowers = (user_id) => usersApi.get(`follows/?followed=${user_id}`)
export const getUserFollowed = (user_id) => usersApi.get(`follows/?follower=${user_id}`)
export const getUsersByRanking = (rankingType) => {
    const orderBy = rankingType === '0' ? '-points' : '-average_score';
    return usersApi.get(`topusers/?ordering=${orderBy}`, { headers: getAuthHeaders() });
}
export const getUsersByRankingCategory = (rankingType, category_id) => {
    const orderBy = rankingType === '0' ? '-total_points' : '-average_score';
    return usersApi.get(`userpoints/?ordering=${orderBy}&category=${category_id}`, { headers: getAuthHeaders() });
}

export const followUser = (userId) => {
    return usersApi.post(`follows/`, { "followed": userId }, { headers: getAuthHeaders() })
}
export const unfollowUser = (id) => usersApi.delete(`follows/${id}`, { headers: getAuthHeaders() })