import React, { useState, useEffect } from 'react';
import { getFollowedAssessments } from '../../api/assessments.api';
import { FaFile } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export function UserFavorites({ user_id }) {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadFavorites();
  }, [user_id]);

  async function loadFavorites() {
    try {
      const res = await getFollowedAssessments(user_id);
      console.log("favorites", res.data);
      setFavorites(res.data.results);
    } catch (error) {
      setError(error);
    }
  }
  return (
    <div className="">
      <div className="text-3xl pb-8">Favorite assessments</div>
      <div>
        {favorites && favorites.map(favorite => (
          <div key={favorite.id} className="grid grid-cols-3 pb-3">
            <Link to={`/assessments/${favorite.assessment}`} >
              {favorite.picture ? (
                <img src={favorite.picture} className="rounded-md w-24 h-24 object-cover" />
              ) : (
                <div className="rounded-md w-24 h-24 bg-red-400 flex justify-center items-center">
                  <FaFile />
                </div>
              )}
            </Link >
            <div className='col-span-2'>
              <Link to={`/assessments/${favorite.assessment}`} className="font-bold">
                {favorite.assessment_name}
              </Link>
              <div>
                Language: {favorite.assessment_language}
              </div>
              <div>
                Min score: {favorite.assessment_min_score}
              </div>
              <div>
                Allowed Attempts: {favorite.assessment_allowed_attempts}
              </div>
              <div>
                Attempts left: {favorite.available_attempts}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
