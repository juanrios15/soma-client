import React, { useState, useEffect } from 'react'
import { getUserDetail } from '../../api/users.api';
import { FaUser } from 'react-icons/fa';
import { UserAttempts } from './UserAttempts';
import { ProfileStats } from './ProfileStats';

export function Profile({ profile_id }) {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('biography');
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
    return (
        <div className="grid grid-cols-3 gap-4 p-10">
            {profile ? (
                <>
                    <div className="col-span-1 flex justify-center items-center bg-gray-200 rounded-full">
                        {profile.profile_picture ? (
                            <img src={profile.profile_picture} alt={`${profile.first_name} ${profile.last_name}`} className="rounded-full w-full h-full object-cover" />
                        ) : (
                            <FaUser size="80%" />
                        )}
                    </div>
                    <div className="col-span-1 flex flex-col justify-center">
                        <h1 className="text-2xl font-bold">{profile.first_name} {profile.last_name}</h1>
                        <p className="mt-2 text-sm">Birthday: {profile.birthday}</p>
                        <p className="mt-1 text-sm">Date Joined: {profile.date_joined}</p>
                        <p className="mt-1 text-sm">Gender: {profile.gender}</p>
                    </div>
                    <div className="col-span-1 flex flex-col space-y-4">
                        <div className="bg-gray-200 p-4 rounded-md">
                            <p className="font-bold">Followers</p>
                            <p>{profile.follower_count}</p>
                        </div>
                        <div className="bg-gray-200 p-4 rounded-md">
                            <p className="font-bold">Following</p>
                            <p>{profile.following_count}</p>
                        </div>
                        <div className="bg-gray-200 p-4 rounded-md">
                            <p className="font-bold">Assessments Followed</p>
                            <p>{profile.following_assessments_count}</p>
                        </div>
                    </div>
                    <div className="col-span-3 mt-10 flex space-x-4">
                        <button onClick={() => setActiveTab('profile')} className={activeTab === 'profile' ? 'bg-blue-500 text-white' : ''}>Profile</button>
                        <button onClick={() => setActiveTab('attempts')} className={activeTab === 'attempts' ? 'bg-blue-500 text-white' : ''}>Attempts</button>
                        <button onClick={() => setActiveTab('social')} className={activeTab === 'social' ? 'bg-blue-500 text-white' : ''}>Social</button>
                        <button onClick={() => setActiveTab('favorites')} className={activeTab === 'favorites' ? 'bg-blue-500 text-white' : ''}>Favorites</button>
                    </div>
                    <div className="col-span-3 mt-10">
                        {activeTab === 'profile' && <div><ProfileStats /></div>}
                        {activeTab === 'attempts' && <div><UserAttempts user_id={profile_id} /></div>}
                        {activeTab === 'social' && <div>Social content here...</div>}
                        {activeTab === 'favorites' && <div>Favorites content here...</div>}
                    </div>
                </>
            ) : (
                <div className="col-span-3">Loading profile...</div>
            )}

        </div>
    )
}
