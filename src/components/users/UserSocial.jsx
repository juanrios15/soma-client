import React, { useState, useEffect } from 'react';
import { getUserFollowed, getUserFollowers } from '../../api/users.api';
import { FaUser } from 'react-icons/fa';


export function UserSocial({ user_id }) {
  const [followers, setFollowers] = useState([]);
  const [followed, setFollowed] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadFollowers();
  }, [user_id]);

  async function loadFollowers() {
    try {
      const res = await getUserFollowers(user_id);
      console.log("followers", res.data);
      setFollowers(res.data.results);
    } catch (error) {
      setError(error);
    }
  }

  useEffect(() => {
    loadFollowed();
  }, [user_id]);

  async function loadFollowed() {
    try {
      const res = await getUserFollowed(user_id);
      console.log(res.data);
      setFollowed(res.data.results);
    } catch (error) {
      setError(error);
    }
  }

  return (
    <div className="grid grid-cols-2">
      <div>
        <div className="text-3xl">Followers</div>
        <div>
          {followers && followers.map(follower => (
            <div key={follower.follower} className="grid grid-cols-3">
              <div>
              {follower.follower_profile_picture ? (
                <img src={follower.follower_profile_picture} alt={`${follower.follower_first_name} ${follower.follower_last_name}`} className="rounded-md w-full h-full" />
              ) : (
                <FaUser />
              )}
              </div>
              <div className="col-span-2">
                <div>
                  {follower.follower_first_name} {follower.follower_last_name}
                </div>
                <div>
                  {follower.follower_username}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="text-3xl">Following</div>
        <div>
          {followed && followed.map(follow => (
            <div key={follow.followed} className="grid grid-cols-3">
              <div>
              {follow.followed_profile_picture ? (
                <img src={follow.followed_profile_picture} alt={`${follow.followed_first_name} ${follow.followed_last_name}`} className="rounded-md w-full h-full" />
              ) : (
                <FaUser />
              )}
              </div>
              <div className="col-span-2">
                <div>
                  {follow.followed_first_name} {follow.followed_last_name}
                </div>
                <div>
                  {follow.followed_username}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}