import { useState, useEffect } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { filterAssessments } from "../../api/assessments.api";
import { AssessmentCard } from "./AssessmentCard";


export function AssessmentsList({ filters }) {
    const [assessments, setAssessments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        setAssessments([]);
        setCurrentPage(1);
        setHasMore(true);
    }, [filters]);

    useEffect(() => {
        loadAssessments();
    }, [currentPage, filters]);

    async function loadAssessments() {
        try {
            const params = {
                ...(filters.name && { name: filters.name }),
                ...(filters.subcategories && { subcategory: filters.subcategories }),
                ...(filters.languages && { languages: filters.languages }),
                ...(filters.ordering && { ordering: filters.ordering }),
                page: currentPage
            };
            const res = await filterAssessments(params);
            if (currentPage === 1) {
                setAssessments(res.data.results);
            } else {
                setAssessments([...assessments].concat(res.data.results));
            }
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