import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAttempt } from '../api/attempts.api';
import { Timer } from '../components/attempts/Timer';
import { QuestionsList } from '../components/attempts/QuestionsList';

export function AttemptPage() {
    const { id } = useParams();
    const [attempt, setAttempt] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadAttempt();
    }, [id]);

    useEffect(() => {
        if (attempt?.questions) {
            localStorage.setItem('questions', JSON.stringify(attempt.questions));
            setQuestions(attempt.questions);
        }
        else {
            const localQuestions = localStorage.getItem('questions');
            if (localQuestions) {
                setQuestions(JSON.parse(localQuestions));
            }
        }
    }, [attempt]);

    async function loadAttempt() {
        try {
            const res = await getAttempt(id);
            console.log(res);
            setAttempt(res.data);
            setError(null);
        } catch (error) {
            console.error(error);
            setError(error);
            setAttempt(null);
        }
    }
    if (error) {
        return <div className="pt-28">Error loading attempt: {error.message}</div>;
    }

    if (!attempt) {
        return <div className="pt-28">Loading attempt...</div>;
    }

    if (questions.length === 0) {
        return (
            <div className="pt-28">
                <h2>This assessment is now closed.</h2>
                <p>It seems like there are no available questions for this assessment.</p>
            </div>
        );
    }

    return <div className="pt-28">
        <Timer assessment_time_limit={attempt.assessment_time_limit} start_time={attempt.start_time} />
        <QuestionsList questions={questions} />
    </div>
}