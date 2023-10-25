import React, { useState, useEffect } from 'react';
import { FaSearch, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { getAllCategories, getAllLanguages, getSubcategoriesByCategory } from '../../api/assessments.api';
import { Select } from 'flowbite-react';


export function AssessmentsFilterCol({ onNameFilterChange, onToggleSubcategory, onToggleLanguage, onToggleOrderBy, filters }) {
    const [languages, setLanguages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState({});
    const [expandedCategories, setExpandedCategories] = useState({});

    useEffect(() => {
        loadLanguages();
    }, []);

    async function loadLanguages() {
        try {
            const res = await getAllLanguages();
            setLanguages(res.data.results);
        } catch (error) {
            console.error('Error fetching languages:', error);
        }
    }

    useEffect(() => {
        loadCategories();
    }, []);

    async function loadCategories() {
        try {
            const res = await getAllCategories();
            setCategories(res.data.results);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }

    async function toggleCategoryExpansion(categoryId) {
        setExpandedCategories(prev => {
            const isExpanded = !prev[categoryId];
            if (isExpanded && !subcategories[categoryId]) {
                loadSubcategories(categoryId);
            }
            return { ...prev, [categoryId]: isExpanded };
        });
    }

    async function loadSubcategories(categoryId) {
        try {
            const res = await getSubcategoriesByCategory(categoryId);
            setSubcategories(prev => ({ ...prev, [categoryId]: res.data.results }));
        } catch (error) {
            console.error('Error fetching subcategories:', error);
        }
    }

    const handleOrderByChange = (value) => {
        let orderByMapping = {
            popularity: "-attempts_count",
            newest: "-created_at",
            oldest: "created_at",
            most_difficult: "-difficulty",
            least_difficult: "difficulty"
        };

        onToggleOrderBy(orderByMapping[value]);
    };

    const [inputValue, setInputValue] = useState('');
    const handleSearch = (event) => {
        event.preventDefault();
        onNameFilterChange(inputValue);
    };

    return (
        <div className="hidden md:block md:col-span-3 border-r border-gray-300 p-4">
            <div className='text-3xl border-b pb-1'>
                Order by
            </div>
            <div className="pb-3">
                <Select
                    className="w-full p-2 rounded mt-2"
                    onChange={(e) => handleOrderByChange(e.target.value)}
                    id="order_by"
                >
                    <option value="popularity">Popularity</option>
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="most_difficult">Most Difficult</option>
                    <option value="least_difficult">Least Difficult</option>
                </Select>
            </div>
            <div className='text-3xl border-b pb-1'>
                Filter
            </div>
            <form onSubmit={handleSearch}>
                <label htmlFor="search-input" className="block mb-2 py-2 text-2xl">By name</label>
                <div className="flex items-center">
                    <input
                        type="text"
                        id="search-input"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Search by name"
                        className="w-full p-2 border border-gray-300 rounded me-2"
                    />
                    <button type="submit" className="bg-gray-200 text-gray-700 rounded-r p-3">
                        <FaSearch />
                    </button>
                </div>
                <div className='py-4 text-2xl'>By language</div>
                {languages.map(language => (
                    <div key={language.id} className="flex items-center mb-1" onClick={() => onToggleLanguage(language.id)}>
                        <input
                            type="checkbox"
                            checked={filters.languages.includes(language.id)}
                            readOnly
                        />
                        <label className="ml-2">{language.name}</label>
                    </div>
                ))}
                <label htmlFor="category-input" className="block mb-2 py-2 text-2xl">By category</label>
                {categories.map(category => (
                    <div key={category.id} className="category-container">
                        <div className="flex justify-between items-center mb-2 cursor-pointer" onClick={() => toggleCategoryExpansion(category.id)}>
                            <div className="flex-grow">
                                {category.name}
                            </div>
                            <div className="p-2">
                                {expandedCategories[category.id] ? <FaChevronDown /> : <FaChevronRight />}
                            </div>
                        </div>
                        {expandedCategories[category.id] && subcategories[category.id] && (
                            <div className="ml-4">
                                {subcategories[category.id].map(subcategory => (
                                    <div key={subcategory.id} className="flex items-center mb-1">
                                        <div
                                            className="flex w-full"
                                            onClick={() => onToggleSubcategory(subcategory.id)}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={filters.subcategories.includes(subcategory.id)}
                                                readOnly
                                            />
                                            <label className="ml-2">{subcategory.name}</label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </form>
        </div>
    );
}