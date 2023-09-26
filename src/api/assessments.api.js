import axios from "axios";

const assessmentsApi = axios.create({
    baseURL:'http://localhost:8000/assessments/'
})

export const getAllCategories = () => assessmentsApi.get('categories/')
export const getSubcategoriesByCategory = (category_id) => assessmentsApi.get(`subcategories/?category=${category_id}`)