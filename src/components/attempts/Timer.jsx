import React, { useState, useEffect } from 'react'

export function Timer({ start_time, assessment_time_limit }) {
    const [timeLeft, setTimeLeft] = useState(null);
    useEffect(() => {
        const startTime = new Date(start_time).getTime();
        const timeLimitMillis = assessment_time_limit * 60 * 1000;

        const calculateTimeLeft = () => {
            const now = new Date().getTime();
            const elapsedTime = now - startTime;
            const remainingTime = timeLimitMillis - elapsedTime;
            setTimeLeft(Math.max(0, remainingTime)); // Evita mostrar tiempo negativo
        };
        const timerId = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timerId);
    }, [start_time, assessment_time_limit]);
    const minutes = Math.floor(timeLeft / (60 * 1000));
    const seconds = Math.floor((timeLeft / 1000) % 60);
    return (
        <div className="fixed top-0 right-0 p-4 bg-gray-800 text-white rounded-bl-lg shadow-md">
            {timeLeft !== null && (
                <>
                    <span className="font-bold text-lg">Time Left: </span>
                    <span className="font-medium text-lg">{`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</span>
                </>
            )}
        </div>
    )
}
