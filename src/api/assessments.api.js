import axios from "axios";

const assessmentsApi = axios.create({
    baseURL:'http://localhost:8000/assessments/'
})

export const getAssessment = (assessment_id) => assessmentsApi.get(`assessments/${assessment_id}`)
export const getAllAssessments = () => assessmentsApi.get('assessments/')
export const filterAssessmentsByName = (name) => assessmentsApi.get(`assessments/?name__icontains=${name}`)
export const getAllCategories = () => assessmentsApi.get('categories/')
export const getSubcategoriesByCategory = (category_id) => assessmentsApi.get(`subcategories/?category=${category_id}`)