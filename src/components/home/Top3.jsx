import React, { useState, useEffect } from 'react';
import { getUsersByRanking } from '../../api/users.api';
import { FaCrown, FaUserCircle } from 'react-icons/fa';
import { globalStats } from '../../api/attempts.api';
import { Link } from 'react-router-dom';


export function Top3() {
  const [topUsers, setTopUsers] = useState([]);
  const [gloStats, setGloStats] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    loadTopUsers();
    loadStats();
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
  async function loadStats() {
    try {
      const res = await globalStats();
      console.log("stats", res.data);
      setGloStats(res.data);
    } catch (error) {
      setError(error);
    }
  }
  return (
    <div className="pt-6 text-center px-4 lg:px-40 grid grid-cols-1 md:grid-cols-3">
      <div className='md:col-span-2 me-3 pb-4 md:pb-0'>
        <div className='text-xl md:text-3xl pb-4 text-start border-b-gray-300 border-b-2 mb-6'>Top 3 by points</div>
        <div className="flex justify-center space-x-4 items-end">
          {topUsers[1] && (
            <div className="flex flex-col items-center">
              <div className="md:text-xl font-bold flex items-center border-b-gray-200 border-b-2 mb-2"><FaCrown className=' text-slate-400 mr-1' /> 2nd place</div>
              {topUsers[1].picture ?
                <Link to={`profile/${topUsers[1].id}`}>
                  <img src={topUsers[1].picture} alt="User" className="w-12 h-12 md:w-14 md:h-14 rounded-full shadow-lg" />
                </Link> :
                <Link to={`profile/${topUsers[1].id}`}><FaUserCircle size={50} className='text-slate-400' /></Link>
              }
              <div>{topUsers[1].username}</div>
              <div>{topUsers[1].points} points</div>
            </div>
          )}
          {topUsers[0] && (
            <div className="flex flex-col items-center">
              <div className="text-xl md:text-2xl font-bold flex items-center border-b-gray-200 border-b-2 mb-2"><FaCrown className='text-yellow-300 mr-1' />1st place</div>
              {topUsers[0].picture ?
                <Link to={`profile/${topUsers[0].id}`}>
                  <img src={topUsers[0].picture} alt="User" className="w-16 h-16 md:w-20 md:h-20 rounded-full shadow-lg" />
                </Link> :
                <Link to={`profile/${topUsers[0].id}`}><FaUserCircle size={52.5} className='text-yellow-300' /></Link>
              }
              <div>{topUsers[0].username}</div>
              <div>{topUsers[0].points} points</div>
            </div>
          )}
          {topUsers[2] && (
            <div className="flex flex-col items-center">
              <div className="md:text-xl flex items-center border-b-gray-200 border-b-2 mb-2"><FaCrown className=' text-amber-700 mr-1' />3rd place</div>
              {topUsers[2].picture ?
                <Link to={`profile/${topUsers[2].id}`}>
                  <img src={topUsers[2].picture} alt="User" className="w-12 h-12 rounded-full shadow-lg" />
                </Link> :
                <Link to={`profile/${topUsers[2].id}`}><FaUserCircle size={50} className='text-red-400' /></Link>
              }
              <div> {topUsers[2].username}</div>
              <div>{topUsers[2].points} points</div>
            </div>
          )}
        </div>
      </div>
      <div className=' grid content-between'>
        <div className='text-xl md:text-3xl pb-4 text-start border-b-gray-300 border-b-2 mb-6'>Stats</div>
        <div className='grid grid-cols-2 '>
          <div className='flex flex-col'>
            {gloStats && (
              <div className='text-6xl font-light pb-3'>{gloStats.total_assessments}</div>
            )}
            <div>Total Assessments</div>
          </div>
          <div className='flex flex-col'>
            {gloStats && (
              <div className='text-6xl font-light pb-3'>{gloStats.total_attempts}</div>
            )}
            <div>Total Attempts</div>
          </div>
        </div>
      </div>
    </div>
  )
}