import { useState, useEffect } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { getAllAssessments } from "../../api/assessments.api";
import { AssessmentCard } from "./AssessmentCard";


export function AssessmentsList() {
    const [assessments, setAssessments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        loadAssessments();
    }, [currentPage]);

    async function loadAssessments() {
        try {
            const res = await getAllAssessments(currentPage);
            setAssessments([...assessments].concat(res.data.results));
            console.log(res.data);
            if (!res.data.next) {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Failed to load assessments:', error);
        }
    }

    return (
        <div className="md:col-span-9 p-4 ">
            <div className="text-xl">
                Found {assessments.length} assessments
            </div>
            <InfiniteScroll
                dataLength={assessments.length}
                scrollThreshold="95%"
                next={() => setCurrentPage(prevPage => prevPage + 1)}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                {assessments.map(assessment => (
                    <AssessmentCard key={assessment.id} assessment={assessment} />
                ))}
            </InfiniteScroll>
        </div>
    );
}