import { AssessmentsList } from "../components/assessments/AssessmentsList";
import { AssessmentsFilterCol } from "../components/assessments/AssessmentsFilterCol";


export function AssessmentsPage() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full p-4 pt-28 ">
            <AssessmentsFilterCol />
            <AssessmentsList />
        </div>
    );
}