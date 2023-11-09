import React, { useState, useEffect } from 'react';
import { getUsersByRanking, getUsersByRankingCategory } from '../../api/users.api';
import { Table } from 'flowbite-react';


export function RankingList({ categoryId, rankingType }) {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadUsers();
    }, [categoryId, rankingType]);

    async function loadUsers() {
        try {
            let response;
            if (categoryId === '0') {
                response = await getUsersByRanking(rankingType);
            } else {
                response = await getUsersByRankingCategory(rankingType, categoryId);
            }
            setUsers(response.data.results);
            console.log(response.data.results);
        } catch (err) {
            setError(err.message || 'Error fetching users');
        }
    }

    return (
        <div>
            {error && <div>Error: {error}</div>}
            <h2>Ranking {categoryId === '0' ? 'Global' : `for category ID: ${categoryId}`}</h2>
            <Table>
                <Table.Head>
                    <Table.HeadCell>Position</Table.HeadCell>
                    <Table.HeadCell>Name</Table.HeadCell>
                    <Table.HeadCell>Country</Table.HeadCell>
                    <Table.HeadCell>Points</Table.HeadCell>
                    <Table.HeadCell>Average Score</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {users.map((user, index) => (
                        <Table.Row key={user.id || index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {index + 1}
                            </Table.Cell>
                            <Table.Cell>{user.username}</Table.Cell>
                            <Table.Cell>{user.country_display}</Table.Cell>
                            <Table.Cell>{user.points}</Table.Cell>
                            <Table.Cell>{user.average_score}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
}
