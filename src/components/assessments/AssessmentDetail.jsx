import React from 'react'

export function AssessmentDetail({ assessment }) {
    return (
        <div className="pt-10 px-4 md:px-0">
            <div className="grid md:grid-cols-3 gap-4">
                {/* Column 1: Image/Icon */}
                <div className="flex justify-center items-center bg-gray-200 h-64 md:h-auto">
                    {assessment.image ? (
                        <img
                            src={assessment.image}
                            alt={`${assessment.name} image`}
                            className="object-cover max-h-full max-w-full"
                        />
                    ) : (
                        // Place your icon component here, e.g., <YourIconComponent/>
                        <div className="text-gray-500 text-6xl">Icon</div>
                    )}
                </div>

                {/* Column 2: Details */}
                <div className="md:col-span-2 space-y-4">
                    <h1 className="text-3xl font-bold">{assessment.name}</h1>
                    <p>Creado el: {new Date(assessment.created_at).toLocaleDateString()}</p>
                    <p>{assessment.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <p><strong>Dificultad:</strong> {assessment.difficulty}</p>
                        <p><strong>Puntaje Mínimo:</strong> {assessment.min_score}</p>
                        <p><strong>Número de Preguntas:</strong> {assessment.number_of_questions}</p>
                        <p><strong>Límite de Tiempo:</strong> {assessment.time_limit}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}