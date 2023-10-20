import React, { useState, useEffect } from 'react';
import { listUserAttempts } from '../../api/attempts.api';

export function UserAttempts({ user_id }) {
    const [attempts, setAttempts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadAttempts();
    }, [user_id]);

    async function loadAttempts() {
        try {
            const res = await listUserAttempts(user_id);
            setAttempts(res.data.results);
        } catch (error) {
            setError(error);
        }
    }


    const calculateMinutes = (start_time, end_time) => {
        const startDate = new Date(start_time);
        const endDate = new Date(end_time);
        const diffInMs = endDate - startDate;
        return Math.floor(diffInMs / 60000);
    }

    return (
        <div>
            {attempts.map((attempt, index) => (
                <div key={index} className="p-4 bg-white shadow-md mb-4">
                    <p><strong>Assessment Name:</strong> {attempt.assessment_name}</p>
                    <p><strong>Min Score:</strong> {attempt.assessment_min_score}</p>
                    <p><strong>Time Limit:</strong> {attempt.assessment_time_limit} minutes</p>
                    <p><strong>No. of Questions:</strong> {attempt.assessment_number_of_questions}</p>
                    <p><strong>Score:</strong> {attempt.score}</p>
                    <p><strong>Approved:</strong> {attempt.approved ? 'Yes' : 'No'}</p>
                    <p><strong>Duration (mins):</strong> {calculateMinutes(attempt.start_time, attempt.end_time)}</p>
                </div>
            ))}
        </div>
    );
}
