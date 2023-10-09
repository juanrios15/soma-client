import { Button } from 'flowbite-react';
import React, { useState } from 'react'
import { FaPencilAlt, FaStar } from 'react-icons/fa';
import { startAttempt } from '../../api/attempts.api';
import { useNavigate } from 'react-router-dom';

export function AssessmentDetail({ assessment }) {
    const navigate = useNavigate();
    const [apiError, setApiError] = useState(null);
    const handleStartClick = async () => {
        try {
            const data = {
                assessment: assessment.id,
                user: assessment.user
            };
            const response = await startAttempt(data);
            setApiError(null);
            navigate(`/attempts/${response.data.id}`);
        } catch (error) {
            console.error(error);
            setApiError(error.response?.data ?? 'An error occurred');
        }
    };
    const formatDifficulty = (difficulty) => {
        return difficulty.toFixed(2);
    }

    const getDifficultyColor = (difficulty) => {
        if (difficulty < 4) {
            return 'text-green-600';
        } else if (difficulty >= 4 && difficulty <= 7) {
            return 'text-yellow-300';
        } else {
            return 'text-red-600';
        }
    }
    return (
        <div className="pt-10 px-4 md:px-0">
            <div className="grid md:grid-cols-4 gap-4">
                <div className="flex justify-center items-center bg-gray-200 h-64 rounded-lg overflow-hidden">
                    {assessment.image ? (
                        <img
                            src={assessment.image}
                            alt={`${assessment.name} image`}
                            className="object-cover max-h-full max-w-full rounded-lg"
                        />
                    ) : (
                        <FaPencilAlt size={48} className="text-gray-500" />
                    )}
                </div>
                <div className="md:col-span-3">
                    <div className="grid md:grid-cols-5">
                        <div className="md:col-span-4">
                            <div className="text-4xl font-bold pb-1">{assessment.name}</div>
                            <div className="text-gray-500">
                                Created by {assessment.user_username}, {" "}
                                {new Date(assessment.created_at).toLocaleDateString()}
                            </div>
                            <div className="grid md:grid-cols-4 py-2 mt-8 mb-3 border rounded border-gray-200 text-center">
                                <div className='text-xl italic'>
                                    Difficulty
                                </div>
                                <div className={`text-xl font-semibold ${getDifficultyColor(assessment.difficulty)}`}>
                                    {formatDifficulty(assessment.difficulty)}
                                </div>
                                <div className='text-xl italic'>
                                    Minimum Score
                                </div>
                                <div className='text-center text-xl font-semibold'>
                                    {assessment.min_score} / 100
                                </div>
                            </div>
                            <div className='grid md:grid-cols-9 py-2 border rounded border-gray-200 text-center'>
                                <div className='md:col-span-2 italic'>
                                    Number of questions
                                </div>
                                <div className='font-bold'>
                                    {assessment.number_of_questions}
                                </div>
                                <div className='md:col-span-2 italic'>
                                    Time limit
                                </div>
                                <div className='font-bold'>
                                    {assessment.time_limit}
                                </div>
                                <div className='md:col-span-2 italic'>
                                    Allowed attempts
                                </div>
                                <div className='font-bold'>
                                    {assessment.allowed_attempts}
                                </div>
                            </div>
                            <div className='flex mt-3'>
                                <Button
                                    type="button"
                                    className="bg-gray-100 text-stone-700 rounded-r-lg enabled:hover:bg-gray-200"
                                    disabled={assessment.available_attempts <= 0}
                                    onClick={handleStartClick}>
                                    Start attempt
                                </Button>
                                <Button type="button" className="ms-2 bg-gray-100 text-stone-700 rounded-r-lg enabled:hover:bg-gray-200">
                                    <FaStar />
                                </Button>
                            </div>
                        </div>
                        <div className="bg-gray-100 mx-2 py-3 rounded-lg shadow-md">
                            <div className="text-center py-3 border-b border-b-gray-200">
                                <div className='pb-1'>
                                    Language
                                </div>
                                <div className='text-xl font-semibold'>
                                    {assessment.language_name}
                                </div>
                            </div>
                            <div className="text-center py-3 border-b border-b-gray-200">
                                <div className='pb-1'>
                                    Category
                                </div>
                                <div className='text-xl font-semibold'>
                                    {assessment.category_name}
                                </div>
                            </div>
                            <div className="text-center py-3">
                                <div className='pb-1'>
                                    Subcategory
                                </div>
                                <div className='text-xl font-semibold'>
                                    {assessment.subcategory_name}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid md:grid-cols-2 gap-2 mt-6">
                <div>
                    <h2 className="text-3xl">Description</h2>
                    <p>{assessment.description}</p>
                </div>
                <div>
                    <h2 className="text-3xl">Minimum Requirements</h2>
                    <p>{assessment.minimum_requirements}</p>
                </div>
            </div>
        </div>
    )
}