import { useState, useEffect } from 'react';
import { FaUserPlus, FaSignInAlt, FaUser, FaStar, FaUsers, FaSignOutAlt } from "react-icons/fa";
import { getUser } from "../api/users.api";
import { Link, useNavigate } from 'react-router-dom';


export function SideBar() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ data: {} });
  const [error, setError] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  const token = localStorage.getItem("token");
  async function loadUser() {
    if (!token) {
      setError(new Error("No authentication token available."));
      return;
    }
    try {
      const res = await getUser();
      setUser(res.data);
    } catch (error) {
      setError(error);
      localStorage.removeItem("token");
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  };

  const renderNoToken = () => (
    <>
      <div className='flex sm:flex-col items-center justify-center'>
        <Link
          to="/register"
          className="flex items-center justify-center flex-col sm:border-b-2 md:py-2 px-1 cursor-pointer text-white">
          <FaUserPlus className="text-2xl" />
          <span className='text-sm'>Register</span>
        </Link>
        <Link to="/login" className="flex items-center justify-center flex-col md:py-2 px-1 cursor-pointer text-white">
          <FaSignInAlt className="text-2xl" />
          <span className='text-sm'>Login</span>
        </Link>
      </div>

    </>
  );
  const renderToken = () => (
    <>
      <div className='flex sm:flex-col items-end sm:items-center justify-center space-x-2 sm:space-x-0'>
        <Link to={`/profile/${user.id}`} className="flex flex-col items-center sm:border-b-2 md:py-2 px-1 cursor-pointer text-white">
          {user.picture ? (
            <img src={user.picture} className="rounded-md object-cover w-6 h-6" />
          ) : (
            <FaUser className="text-2xl" />
          )}
          <span className='text-sm'>Profile</span>
        </Link>
        <Link to={`/profile/${user.id}?tab=social`} className="flex flex-col items-center sm:border-b-2 md:py-2 px-1 cursor-pointer text-white">
          <FaUsers className="text-2xl" />
          <span className='text-sm'>Social</span>
        </Link>
        <Link to={`/profile/${user.id}?tab=favorites`} className="flex flex-col items-center sm:border-b-2 md:py-2 px-1 cursor-pointer text-white">
          <FaStar className="text-2xl" />
          <span className='text-sm'>Favorites</span>
        </Link>
        <div onClick={handleLogout} className="flex flex-col items-center md:py-2 px-1 cursor-pointer text-white">
          <FaSignOutAlt className="text-2xl" />
          <span className='text-sm'>Logout</span>
        </div>
      </div>

    </>
  );

  return (
    <div className="fixed w-full sm:w-auto sm:right-0 sm:top-1/2 sm:transform sm:-translate-y-1/2 bottom-0 sm:bottom-auto bg-cyan-700 p-2 shadow sm:rounded-l-md z-10">
      {token && !error ? renderToken() : renderNoToken()}
    </div>
  );
}