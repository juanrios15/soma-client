import { useState } from "react";
import { AssessmentsList } from "../components/assessments/AssessmentsList";
import { AssessmentsFilterCol } from "../components/assessments/AssessmentsFilterCol";


export function AssessmentsPage() {
    const [filters, setFilters] = useState({
        name: '',
        subcategories: []
    });
    const handleNameFilterChange = (name) => {
        setFilters(prevFilters => ({ ...prevFilters, name }));
    };

    const handleToggleSubcategory = (subcategoryId) => {
        setFilters(prevFilters => {
            const { subcategories } = prevFilters;
            console.log(prevFilters);

            const newSubcategories = subcategories.includes(subcategoryId)
                ? subcategories.filter(id => id !== subcategoryId)
                : [...subcategories, subcategoryId];
            return { ...prevFilters, subcategories: newSubcategories };
        });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full p-4 pt-28 ">
            <AssessmentsFilterCol
                onNameFilterChange={handleNameFilterChange}
                onToggleSubcategory={handleToggleSubcategory}
                filters={filters}
            />
            <AssessmentsList filters={filters} />
        </div>
    );
}