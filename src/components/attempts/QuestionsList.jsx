import React, { useState } from 'react';
import { Button } from 'flowbite-react';

export function QuestionsList({ questions }) {
    const [userResponses, setUserResponses] = useState([]);
    const handleChoiceChange = (questionId, choiceId) => {
        const updatedResponses = [...userResponses];
        let response = updatedResponses.find(r => r.question_id === questionId);

        if (response) {
            response.choices = [choiceId];
        } else {
            response = { question_id: questionId, choices: [choiceId] };
            updatedResponses.push(response);
        }
        setUserResponses(updatedResponses);
        console.log("User responses:", updatedResponses);
    };
    return (
        <div className="p-4">
            {questions.map((question, index) => (
                <div key={index} className="p-4 border rounded-md mb-4">
                    <h2 className="text-xl font-bold mb-2">{question.description}</h2>
                    <form>
                        {question.choices.map((choice, cIndex) => (
                            <label key={cIndex} className="flex items-center mb-2">
                                <input
                                    type="radio"
                                    name={`question_${index}`}
                                    value={choice.id}
                                    className="text-blue-500 mr-2"
                                    onChange={() => handleChoiceChange(question.question_id, choice.choice_id)}
                                />
                                <span>{choice.description}</span>
                            </label>
                        ))}
                    </form>
                </div>
            ))}
            <div className="flex mt-4">
                <Button
                    type="submit"
                    color="success"
                    className="w-auto"
                >
                    End Attempt
                </Button>
            </div>
        </div>
    );
}
