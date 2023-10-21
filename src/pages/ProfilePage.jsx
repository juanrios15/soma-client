import React from 'react';
import { useParams } from 'react-router-dom';
import { Profile } from '../components/users/Profile';


export function ProfilePage() {
    const { id } = useParams();

    return (
        <div className="pt-28 px-4 md:px-40"><Profile profile_id={id} /></div>
    )
}

