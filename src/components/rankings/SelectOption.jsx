// SelectOption.jsx
import React, { useState, useEffect } from 'react';
import { getAllCategories } from '../../api/assessments.api';

export function SelectOption({ onCategoryChange, onRankingTypeChange }) {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('0');
    const [rankingType, setRankingType] = useState('0');

    useEffect(() => {
        loadCategories();
    }, []);

    async function loadCategories() {
        try {
            const response = await getAllCategories();
            setCategories(response.data.results);
        } catch (error) {
            setError(error);
        }
    }

    function handleCategoryClick(categoryId) {
        setSelectedCategory(categoryId);
        onCategoryChange(categoryId);
    }

    function handleRankingTypeChange(type) {
        setRankingType(type);
        onRankingTypeChange(type);
    }

    return (
        <div>
            {error && <div>Error loading categories: {error.message}</div>}
            <div className="flex space-x-4 overflow-auto">
                <button
                    className={`py-2 px-4 border rounded ${selectedCategory === '0' ? 'bg-blue-500 text-white' : 'bg-white'}`}
                    onClick={() => handleCategoryClick('0')}
                >
                    Global
                </button>
                {categories.map((category) => (
                    <button
                        key={category.id}
                        className={`py-2 px-4 border rounded ${selectedCategory === category.id ? 'bg-blue-500 text-white' : 'bg-white'}`}
                        onClick={() => handleCategoryClick(category.id)}
                    >
                        {category.name}
                    </button>
                ))}
            </div>
            <div className="flex mt-4">
                <button
                    className={`py-2 px-4 border rounded ${rankingType === '0' ? 'bg-green-500 text-white' : 'bg-white'}`}
                    onClick={() => handleRankingTypeChange('0')}
                >
                    By Points
                </button>
                <button
                    className={`py-2 px-4 border rounded ml-2 ${rankingType === '1' ? 'bg-green-500 text-white' : 'bg-white'}`}
                    onClick={() => handleRankingTypeChange('1')}
                >
                    By Average
                </button>
            </div>
        </div>
    );
}
