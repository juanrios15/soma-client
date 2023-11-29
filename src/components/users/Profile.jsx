import React, { useState, useEffect } from 'react'
import { followUser, getUserDetail, unfollowUser } from '../../api/users.api';
import { FaUser, FaEdit, FaUserPlus, FaUserMinus } from 'react-icons/fa';
import { UserAttempts } from './UserAttempts';
import { ProfileStats } from './ProfileStats';
import { Button, Modal } from 'flowbite-react';
import { UserSocial } from './UserSocial';
import { Link, useLocation } from 'react-router-dom';
import { UserFavorites } from './UserFavorites';


export function Profile({ profile_id }) {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const [showImageModal, setShowImageModal] = useState(false);

  const openImageModal = () => setShowImageModal(true);
  const closeImageModal = () => setShowImageModal(false);
  const getActiveTab = () => {
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get('tab') || 'profile';
  };
  const [activeTab, setActiveTab] = useState(getActiveTab());
  useEffect(() => {
    setActiveTab(getActiveTab());
  }, [location.search]);
  const TABS = [
    { id: 'profile', label: 'Profile', content: <ProfileStats profile={profile} /> },
    { id: 'social', label: 'Social', content: <UserSocial user_id={profile_id} /> },
    { id: 'favorites', label: 'Favorites', content: <UserFavorites user_id={profile_id} /> },
  ];
  if (profile?.is_self) {
    TABS.push({ id: 'attempts', label: 'Attempts', content: <UserAttempts user_id={profile_id} /> });
  }
  useEffect(() => {
    loadProfile();
  }, [profile_id]);

  async function loadProfile() {
    try {
      const res = await getUserDetail(profile_id);
      console.log("res", res.data);
      setProfile(res.data);

    } catch (error) {
      setError(error);
    }
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
  }

  const handleFollowClick = async () => {
    try {
      if (typeof profile.is_following === 'number') {
        await unfollowUser(profile.is_following);
        setProfile({
          ...profile,
          is_following: false,
        });
      } else {
        const response = await followUser(profile.id);
        setProfile({
          ...profile,
          is_following: response.data.id,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='md:w-2/3'>
      {profile ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 p-3 bg-gray-50 rounded-lg">
            <div className="flex justify-center items-center ">
              {profile.profile_picture ? (
                <img
                  src={profile.profile_picture}
                  alt={`${profile.first_name} ${profile.last_name}`}
                  className="rounded-full w-48 h-48 cursor-pointer border-4 border-gray-200"
                  onClick={openImageModal}
                />
              ) : (
                <FaUser />
              )}
            </div>
            <div className="flex flex-col ps-4 justify-center">
              <div className="text-2xl font-bold">{profile.first_name} {profile.last_name}</div>
              <div className="text-sm">Birthday: {profile.birthday}</div>
              <div className="text-sm">Date Joined: {formatDate(profile.date_joined)}</div>
              <div className="text-sm">Gender: {profile.gender_display}</div>
              <div className="text-sm">Country: {profile.country_display}</div>
              {profile.country_flag ? (
                <img
                  src={`http://localhost:8000/${profile.country_flag}`}
                  alt={`${profile.country_display}`}
                  className="rounded w-4 h-4"
                  onClick={openImageModal}
                />
              ) : (
                <FaUser />
              )}
              <div>
                {profile && !profile.is_self && profile.is_following !== null && (
                  <Button
                    type="button"
                    onClick={handleFollowClick}
                    className="ms-2 bg-gray-100 text-stone-700 rounded-r-lg enabled:hover:bg-gray-200"
                  >
                    {profile.is_following ? <FaUserMinus className='text-blue-600' /> : <FaUserPlus />}
                  </Button>
                )}
              </div>
              <div>
                {profile?.is_self && (
                  <Link to={`/edit-profile/${profile_id}`} variant="primary" className="flex items-center">
                    <FaEdit className="mr-2" /> Edit
                  </Link>
                )}
              </div>
            </div>
            <div>
              <div className="flex flex-col md:flex-row p-4 justify-center items-center space-x-2">
                <div className="flex flex-col items-center justify-center bg-white rounded-lg p-2">
                  <div className='text-2xl font-bold'>{profile.follower_count}</div>
                  <div>Followers</div>
                </div>
                <div className="flex flex-col items-center justify-center bg-white rounded-lg p-2">
                  <div className="text-2xl font-bold">{profile.following_count}</div>
                  <div>Following</div>
                </div>
              </div>
              <div className="md:col-span-2 flex flex-col items-center justify-center bg-white rounded-lg p-1 text-center">
                <div className="text-2xl font-bold">{profile.following_assessments_count}</div>
                <div>Assessments Followed</div>
              </div>
            </div>


          </div>
          <Modal show={showImageModal} popup size="xl" onClose={closeImageModal}>
            <Modal.Header />
            <Modal.Body className="flex justify-center">
              <img src={profile.profile_picture} alt={`${profile.first_name} ${profile.last_name}`} className="rounded-md" />
            </Modal.Body>
          </Modal>
          <div className="grid grid-cols-3">
            <div className="col-span-3 flex">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`border rounded shadow-sm p-2 hover:bg-blue-300 ${activeTab === tab.id ? 'bg-blue-500 text-white' : ''}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="col-span-3 pt-3">
              {TABS.map(tab => activeTab === tab.id && <div key={tab.id}>{tab.content}</div>)}
            </div>
          </div>
        </>
      ) : (
        <div className="col-span-3">Loading profile...</div>
      )}

    </div>
  )
}
