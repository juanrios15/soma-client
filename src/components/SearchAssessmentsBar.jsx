import React, { useState, useEffect, useRef } from 'react';
import Select, { components } from 'react-select';
import { Button, Label, TextInput } from "flowbite-react"
import { FaSearch } from 'react-icons/fa';
import { filterAssessmentsByName } from "../api/assessments.api";

const Option = (props) => {
    if (props.data.value === 'search-option') {
        return (
            <components.Option {...props}>
                <div className="text-blue-500">
                    {props.data.label}
                </div>
            </components.Option>
        );
    }
    return (
        <components.Option {...props}>
            <div>
                {props.data.label}
            </div>
            <div className="italic text-gray-400">
                {props.data.subcategory_name}
            </div>
        </components.Option>
    );
};

export function SearchAssessmentsBar() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isClearable, setIsClearable] = useState(true);
    const [selectedOption, setSelectedOption] = useState(null);
    const searchTimeout = useRef(null);

    useEffect(() => {
        performSearch();
        return () => {
            clearTimeout(searchTimeout.current);
        };
    }, [query]);

    async function performSearch() {
        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }
        searchTimeout.current = setTimeout(async () => {
            if (query) {
                const res = await filterAssessmentsByName(query);
                if (res.data && res.data.results) {
                    const newResults = res.data.results.slice(0, 5).map(item => ({
                        value: item.id,
                        label: item.name,
                        subcategory_name: item.subcategory_name
                    }));
                    newResults.push({
                        value: "search-option",
                        label: `Or search by ${query}`,
                        subcategory_name: ""
                    });

                    setResults(newResults);
                }
            } else {
                setResults([]);
            }
        }, 300);
    }

    const handleInputChange = (newValue) => {
        setQuery(newValue);
    };

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };

    return (
        <div className="w-3/4 mx-auto pt-28 text-center">
            <div className="md:px-24">
                <div className="pb-4 text-start">
                    <Label value="Search for assessments..." className="text-2xl md:text-3xl" />
                </div>
                <div className="relative flex py-2 rounded-lg text-start">
                    <Select
                        value={selectedOption}
                        onInputChange={handleInputChange}
                        onChange={handleChange}
                        options={results}
                        isClearable={isClearable}
                        isSearchable
                        placeholder="Example: Python easy level..."
                        className="flex-grow rounded-l-lg text-start"
                        components={{ Option }}
                    />
                    <Button type="button" className="ms-2 flex items-center bg-gray-100 text-stone-700 rounded-r-lg enabled:hover:bg-gray-200">
                        <FaSearch className="mr-2" />
                        Search
                    </Button>
                </div>
            </div>
        </div>
    )
}