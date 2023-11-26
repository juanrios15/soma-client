import React from 'react'
import { EditUserForm } from '../components/users/EditUserForm'
import { useParams } from 'react-router-dom';

export function EditUserPage() {
    const { id } = useParams();
    return (
        <div className="pt-28 px-4 lg:px-40"><EditUserForm profile_id={id} /></div>
    )
}