import { useState } from "react";
import { AssessmentsList } from "../components/assessments/AssessmentsList";
import { AssessmentsFilterCol } from "../components/assessments/AssessmentsFilterCol";
import { useSearchParams } from "react-router-dom";

export function AssessmentsPage() {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("search") || '';
    const [filters, setFilters] = useState({
        name: searchQuery,
        subcategories: [],
        languages: []
    });
    const handleNameFilterChange = (name) => {
        setFilters(prevFilters => ({ ...prevFilters, name }));
    };

    const handleToggleSubcategory = (subcategoryId) => {
        setFilters(prevFilters => {
            const { subcategories } = prevFilters;

            const newSubcategories = subcategories.includes(subcategoryId)
                ? subcategories.filter(id => id !== subcategoryId)
                : [...subcategories, subcategoryId];
            return { ...prevFilters, subcategories: newSubcategories };
        });
    };

    const handleToggleLanguage = (languageId) => {
        setFilters(prevFilters => {
            const isLanguageSelected = prevFilters.languages.includes(languageId);

            if (isLanguageSelected) {
                return {
                    ...prevFilters,
                    languages: prevFilters.languages.filter(id => id !== languageId)
                };
            } else {
                return {
                    ...prevFilters,
                    languages: [...prevFilters.languages, languageId]
                };
            }
        });
    };

    const handleToggleOrderBy = (orderByValue) => {
        setFilters(prevFilters => {
            return {
                ...prevFilters,
                ordering: orderByValue
            };
        });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full p-4 pt-28 ">
            <AssessmentsFilterCol
                onNameFilterChange={handleNameFilterChange}
                onToggleSubcategory={handleToggleSubcategory}
                onToggleLanguage={handleToggleLanguage}
                onToggleOrderBy={handleToggleOrderBy}
                filters={filters}
            />
            <AssessmentsList filters={filters} />
        </div>
    );
}