import { useState } from "react";
import { AssessmentsList } from "../components/assessments/AssessmentsList";
import { AssessmentsFilterCol } from "../components/assessments/AssessmentsFilterCol";
import { useSearchParams } from "react-router-dom";

export function AssessmentsPage() {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("search") || '';
    const searchSubcategoryId = searchParams.get("subcategory") || '';
    const searchSubcategoryName = searchParams.get("subcategoryName") ? decodeURIComponent(searchParams.get("subcategoryName")) : '';
    const [filters, setFilters] = useState({
        name: searchQuery,
        subcategories: searchSubcategoryId ? { [searchSubcategoryId]: searchSubcategoryName } : {},
        languages: {}
    });
    console.log(filters);
    const handleNameFilterChange = (name) => {
        setFilters(prevFilters => ({ ...prevFilters, name }));
    };

    const handleToggleSubcategory = (subcategoryId, subcategoryName) => {
        setFilters(prevFilters => {
            const { subcategories } = prevFilters;
            let newSubcategories = { ...subcategories };

            if (subcategoryId in subcategories) {
                delete newSubcategories[subcategoryId];
            } else {
                newSubcategories[subcategoryId] = subcategoryName;
            }
            return { ...prevFilters, subcategories: newSubcategories };
        });
    };

    const handleToggleLanguage = (languageId, languageName) => {
        setFilters(prevFilters => {
            const { languages } = prevFilters;
            let newLanguages = { ...languages };

            if (languageId in languages) {
                delete newLanguages[languageId];
            } else {
                newLanguages[languageId] = languageName;
            }
            return { ...prevFilters, languages: newLanguages };
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