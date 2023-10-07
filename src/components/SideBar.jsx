import { useState, useEffect } from 'react';
import { FaUserPlus, FaSignInAlt, FaUser, FaStar, FaUsers, FaSignOutAlt } from "react-icons/fa";
import { getUser } from "../api/users.api";
import { Link } from 'react-router-dom';


export function SideBar() {
    const [user, setUser] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadUser();
    }, []);

    async function loadUser() {
        try {
            const res = await getUser();
            setUser(res);
        } catch (error) {
            setError(error);
            localStorage.removeItem("token");
        }
    }
    const token = localStorage.getItem("token");

    const renderNoToken = () => (
        <>
            
            <Link to="/register" className="flex flex-col items-center space-y-2 border-b-2 py-2 px-1 cursor-pointer">
                <FaUserPlus className="text-3xl" />
                <span>Register</span>
            </Link>
            <Link to="/login" className="flex flex-col items-center space-y-2 py-2 px-1 cursor-pointer">
                <FaSignInAlt className="text-3xl" />
                <span>Login</span>
            </Link>
        </>
    );

    const renderToken = () => (
        <>
            <div className="flex flex-col items-center space-y-2 border-b-2 py-2 px-1 cursor-pointer">
                <FaUser className="text-3xl" />
                <span>Profile</span>
            </div>
            <div className="flex flex-col items-center space-y-2 border-b-2 py-2 px-1 cursor-pointer">
                <FaStar className="text-3xl" />
                <span>Favorites</span>
            </div>
            <div className="flex flex-col items-center space-y-2 border-b-2 py-2 px-1 cursor-pointer">
                <FaUsers className="text-3xl" />
                <span>Social</span>
            </div>
            <div className="flex flex-col items-center space-y-2 py-2 px-1 cursor-pointer">
                <FaSignOutAlt className="text-3xl" />
                <span>Logout</span>
            </div>
        </>
    );

    return (
        <div className="fixed right-0 top-1/2 transform -translate-y-1/2 bg-gray-100 p-2 shadow-md rounded-l-md">
            {token && !error ? renderToken() : renderNoToken()}
        </div>
    );
}