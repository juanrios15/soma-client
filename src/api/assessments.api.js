import axios from "axios";

const assessmentsApi = axios.create({
    baseURL: 'http://localhost:8000/assessments/'
})

export const getAssessment = (assessment_id) => assessmentsApi.get(`assessments/${assessment_id}`)
export const getAllAssessments = () => assessmentsApi.get('assessments/')
export const filterAssessmentsByName = (name) => assessmentsApi.get(`assessments/?name__icontains=${name}`)
export const getAllCategories = () => assessmentsApi.get('categories/')
export const getSubcategoriesByCategory = (category_id) => assessmentsApi.get(`subcategories/?category=${category_id}`)
export const filterAssessments = (params) => {
    const queryParameters = {
        ...(params.name && { 'name__icontains': params.name }),
        ...(params.subcategory && { 'subcategory__in': Array.isArray(params.subcategory) ? params.subcategory.join(',') : params.subcategory }),
        ...(params.numberOfQuestions && { 'number_of_questions__gte': params.numberOfQuestions }),
        ...(params.allowedAttempts && { 'allowed_attempts__gte': params.allowedAttempts }),
        ...(params.difficulty && { 'difficulty__gte': params.difficulty }),
        page: params.page || 1,
    };

    const queryString = new URLSearchParams(queryParameters).toString();
    const url = `assessments/?${queryString}`;

    return assessmentsApi.get(url);
};