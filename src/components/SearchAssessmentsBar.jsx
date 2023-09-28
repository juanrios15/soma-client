import React, { useState, useEffect, useRef } from 'react';
import { Button, Label, TextInput } from "flowbite-react"
import { FaSearch } from 'react-icons/fa';
import { filterAssessmentsByName } from "../api/assessments.api";
import _ from 'lodash';


export function SearchAssessmentsBar() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
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
                    console.log(res.data.results);
                    setResults(res.data.results.slice(0, 5));
                }
            } else {
                setResults([]);
            }
        }, 300);
    }
    return (
        <div className="w-3/4 mx-auto pt-24 text-center">
            <div className="md:px-24">
                <div className="pb-4 text-start ps-2">
                    <Label value="Search" className="text-2xl md:text-3xl" />
                </div>
                <div className="relative flex items-center bg-white rounded-lg">
                    <TextInput
                        id="assessments"
                        placeholder="Search for assessments..."
                        type="text"
                        className="flex-grow p-2 rounded-l-lg bg-white"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                    <Button type="button" className="flex items-center bg-gray-100 text-stone-700 rounded-r-lg enabled:hover:bg-gray-200">
                        <FaSearch className="mr-2" />
                        Search
                    </Button>
                    {results.length > 0 && (
                        <div className="absolute mt-20 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                            {results.map((item, index) => (
                                <div key={index} className="p-2 hover:bg-gray-100">
                                    {item.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}