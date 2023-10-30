import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className="fixed top-0 left-1/2 w-full lg:w-2/3 xl:w-1/2 transform -translate-x-1/2  bg-gray-100 rounded-[15px]">
      <div className="container mx-auto p-4">
        <button onClick={toggleMenu} className=" text-stone-700 text-2xl md:hidden">
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:block`}>
          <div className={`flex md:justify-between flex-col md:flex-row text-center`}>
            <Link to="/" className=" text-lg">Home</Link>
            <Link to="/assessments" className=" text-lg">Assessments</Link>
            <div className="group hidden md:flex bg-gray-800 rounded-full h-20 w-20 absolute top-0 left-1/2 transform 
          -translate-x-1/2 bottom-full items-center justify-center  hover:bg-gray-900 transition duration-300">
              <span className="text-center text-xl justify-center -mt-1 text-stone-100">
                SOMA
              </span>
            </div>
            <Link to="/rankings" className=" text-lg">Rankings</Link>
            <Link to="/about-us" className=" text-lg">About us</Link>
          </div>
        </div>


      </div>
    </div>
  )
}