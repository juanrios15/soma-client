import axios from "axios";

const assessmentsApi = axios.create({
    baseURL: 'http://localhost:8000/assessments/'
})
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Token ${token}` } : {};
};

export const getAssessment = (assessment_id) => assessmentsApi.get(`assessments/${assessment_id}`, { headers: getAuthHeaders() })
export const getAllAssessments = () => assessmentsApi.get('assessments/')
export const filterAssessmentsByName = (name) => assessmentsApi.get(`assessments/?name__icontains=${name}`)
export const getAllLanguages = () => assessmentsApi.get('languages/')
export const getAllCategories = () => assessmentsApi.get('categories/')
export const getSubcategoriesByCategory = (category_id) => assessmentsApi.get(`subcategories/?category=${category_id}`)
export const filterAssessments = (params) => {
    const queryParameters = {
        ...(params.name && { 'name__icontains': params.name }),
        ...(params.subcategory && { 'subcategory__in': Array.isArray(params.subcategory) ? params.subcategory.join(',') : params.subcategory }),
        ...(params.languages && { 'language__in': Array.isArray(params.languages) ? params.languages.join(',') : params.languages }),
        ...(params.numberOfQuestions && { 'number_of_questions__gte': params.numberOfQuestions }),
        ...(params.allowedAttempts && { 'allowed_attempts__gte': params.allowedAttempts }),
        ...(params.difficulty && { 'difficulty__gte': params.difficulty }),
        ...(params.ordering && { 'ordering': params.ordering }),
        page: params.page || 1,
    };

    const queryString = new URLSearchParams(queryParameters).toString();
    const url = `assessments/?${queryString}`;

    return assessmentsApi.get(url);
};
export const getFollowedAssessments = (user_id) => assessmentsApi.get(`follow-assessments/?follower=${user_id}`, { headers: getAuthHeaders() })
export const followAssessment = (assessmentId) => {
    return assessmentsApi.post(`follow-assessments/`, { "assessment": assessmentId }, { headers: getAuthHeaders() })
}
export const unfollowAssessment = (id) => assessmentsApi.delete(`follow-assessments/${id}`, { headers: getAuthHeaders() })

