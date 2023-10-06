import { Link } from 'react-router-dom';
import { FaPencilAlt } from 'react-icons/fa';

export function AssessmentCard({ assessment }) {
    return (
        <div className="grid grid-cols-10 gap-4 p-4 border-b border-gray-200">
            <div className="col-span-2 flex justify-center items-center ">
                <Link to={`/assessments/${assessment.id}`} className="w-28 h-28 flex justify-center items-center bg-gray-200">
                    {assessment.image ? (
                        <img src={assessment.image} alt={`${assessment.name} image`} className="object-cover max-h-full max-w-full" />
                    ) : (
                        <FaPencilAlt size={48} className="text-gray-500" />
                    )}
                </Link>
            </div>
            <div className="col-span-8">
                <h2 className="text-xl font-bold ">
                    <Link to={`/assessments/${assessment.id}`}>
                        {assessment.name}
                    </Link>
                </h2>
                <p className="text-gray-500">{assessment.subcategory_name}</p>
                <p>{assessment.description}</p>
                <p className="text-sm text-gray-500">
                    By {assessment.user_username} on {new Date(assessment.created_at).toLocaleDateString()}
                </p>
            </div>
        </div>
    );
}