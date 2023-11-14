import React, { useState, useEffect } from 'react';
import { getUsersByRanking } from '../../api/users.api';
import { FaUserCircle } from 'react-icons/fa';


export function Top3() {
  const [topUsers, setTopUsers] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    loadTopUsers();
  }, []);

  async function loadTopUsers() {
    try {
      const res = await getUsersByRanking();
      console.log("res", res.data);
      setTopUsers(res.data.results);
    } catch (error) {
      setError(error);
    }
  }
  return (
    <div className="pt-8 text-center px-4 md:px-40">
      <div className='text-3xl md:text-5xl pb-4 text-start border-b-gray-300 border-b-2 mb-6'>Top 3 by points</div>
      <div className="flex justify-center space-x-4">
        {topUsers[1] && (
          <div className="flex flex-col items-center">
            <div className="text-xl font-bold">2nd Place</div>
            {topUsers[1].picture ?
              <img src={topUsers[1].picture} alt="User" className="w-12 h-12 rounded-full" /> :
              <FaUserCircle size={50} />
            }
            <div><span className="font-semibold">Username:</span> {topUsers[1].username}</div>
            <div><span className="font-semibold">Points:</span> {topUsers[1].points}</div>
          </div>
        )}
        {topUsers[0] && (
          <div className="flex flex-col items-center">
            <div className="text-2xl font-bold">1st Place</div>
            {topUsers[0].picture ?
              <img src={topUsers[0].picture} alt="User" className="w-14 h-14 rounded-full" /> :
              <FaUserCircle size={52.5} />
            }
            <div><span className="font-semibold">Username:</span> {topUsers[0].username}</div>
            <div><span className="font-semibold">Points:</span> {topUsers[0].points}</div>
          </div>
        )}
        {topUsers[2] && (
          <div className="flex flex-col items-center">
            <div className="text-xl font-bold">3rd Place</div>
            {topUsers[2].picture ?
              <img src={topUsers[2].picture} alt="User" className="w-12 h-12 rounded-full" /> :
              <FaUserCircle size={50} />
            }
            <div><span className="font-semibold">Username:</span> {topUsers[2].username}</div>
            <div><span className="font-semibold">Points:</span> {topUsers[2].points}</div>
          </div>
        )}
      </div>
    </div>
  )
}