import React, { useState, useEffect, useRef } from 'react';
import Select, { components } from 'react-select';
import { Button, Label, TextInput } from "flowbite-react"
import { FaSearch } from 'react-icons/fa';
import { filterAssessmentsByName } from "../../api/assessments.api";
import { Link, useNavigate } from 'react-router-dom';

const Option = (props) => {
    if (props.data.value === 'search-option') {
        return (
            <components.Option {...props}>
                <Link to={`/assessments/?search=${props.data.label}`} className="text-blue-500">
                    <div>
                        Or search by {props.data.label}
                    </div>
                </Link>
            </components.Option>
        );
    }
    return (
        <components.Option {...props}>
            <Link to={`/assessments/${props.data.value}`}>
                <div>
                    {props.data.label}
                </div>
                <div className="italic text-gray-400">
                    {props.data.subcategory_name}
                </div>
            </Link>
        </components.Option>
    );
};

export function SearchAssessmentsBar() {
    const navigate = useNavigate();
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
                        label: `${query}`,
                        subcategory_name: ""
                    });

                    setResults(newResults);
                }
            } else {
                setResults([]);
            }
        }, 300);
    }



    const handleInputChange = (newValue, actionMeta) => {
        if (actionMeta.action === 'input-change') {
            setQuery(newValue);
        }
    };

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && query) {
            navigate(`/assessments/?search=${query}`);
        }
    };

    const handleSearchClick = () => {
        if (query) {
            navigate(`/assessments/?search=${query}`);
        }
    };
    return (
        <div className='px-4 lg:px-40 grid grid-cols-1 md:grid-cols-3 pt-16 md:pt-20 items-center'>
            <div className='text-5xl xl:text-6xl pb-3 lg:pb-0 font-extralight'>
                There's always someone smarter...
            </div>
            <div className="md:col-span-2 text-center pt-4">
                <div className="">
                    <div className="pb-4 text-start">
                        <Label value="Search for assessments" className="text-2xl md:text-3xl" />
                    </div>
                    <div className="relative flex py-2 rounded-lg text-start container-select">
                        <Select
                            value={selectedOption}
                            onInputChange={handleInputChange}
                            onChange={handleChange}
                            options={results}
                            isClearable={isClearable}
                            onKeyDown={handleKeyDown}
                            isSearchable
                            placeholder="Example: Python easy level..."
                            className="flex-grow rounded-l-lg text-start border-2"
                            components={{ Option }}
                        />
                        <Button
                            type="button"
                            onClick={handleSearchClick}
                            className="ms-2 flex items-center bg-gray-100 text-stone-700 rounded-r-lg enabled:hover:bg-gray-200"
                            disabled={!query}
                        >
                            <FaSearch />
                        </Button>
                    </div>
                    <div className='h-20 flex items-center justify-center bg-gray-100 rounded-lg italic mt-2'>
                        Space for ads
                    </div>
                </div>
            </div>
        </div>
    )
}