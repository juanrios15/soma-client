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
    <div>
      {profile ? (
        <>
          <div className="grid grid-cols-5 pb-4">
            <div className="flex justify-center items-center">
              {profile.profile_picture ? (
                <img
                  src={profile.profile_picture}
                  alt={`${profile.first_name} ${profile.last_name}`}
                  className="rounded-md max-w-[200px] max-h-[200px] cursor-pointer"
                  onClick={openImageModal}
                />
              ) : (
                <FaUser />
              )}
            </div>
            <div className="flex flex-col ps-4">
              <div className="text-2xl font-bold">{profile.first_name} {profile.last_name}</div>
              <div className="text-sm">Birthday: {profile.birthday}</div>
              <div className="text-sm">Date Joined: {formatDate(profile.date_joined)}</div>
              <div className="text-sm">Gender: {profile.gender_display}</div>
              <div className="text-sm">Country: {profile.country_display}</div>
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
            </div>
            <div className="col-span-2 flex flex-col">
              <div className="grid grid-cols-2">
                <div className="font-bold">Followers</div>
                <div>{profile.follower_count}</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="font-bold">Following</div>
                <div>{profile.following_count}</div>
              </div>
              <div className="grid grid-cols-2 items-center">
                <div className="font-bold">Assessments Followed</div>
                <div className=''>{profile.following_assessments_count}</div>
              </div>
            </div>
            <div>
              {profile?.is_self && (
                <Link to={`/edit-profile/${profile_id}`} variant="primary" className="flex items-center">
                  <FaEdit className="mr-2" /> Edit
                </Link>
              )}
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
