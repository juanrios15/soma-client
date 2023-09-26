import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className="fixed top-0 left-1/2 w-full lg:w-2/3 xl:w-1/2 transform -translate-x-1/2  bg-gray-700 rounded-[15px]">
      <div className="container mx-auto p-4">
        <button onClick={toggleMenu} className="text-white text-2xl md:hidden">
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:block`}>
          <div className={`flex md:justify-between flex-col md:flex-row text-center`}>
            <Link to="/" className="text-white text-lg">Home</Link>
            <Link to="/assessments" className="text-white text-lg">Assessments</Link>
            <div className="group hidden md:flex bg-gray-500 rounded-full h-20 w-20 absolute top-0 left-1/2 transform 
          -translate-x-1/2 bottom-full items-center justify-center text-white hover:bg-zinc-800 transition duration-300">
              <span className="text-center text-xl justify-center -mt-1">
                SOMA
              </span>
            </div>
            <Link to="/rankings" className="text-white text-lg">Rankings</Link>
            <Link to="/contact-us" className="text-white text-lg">Contact us</Link>
          </div>
        </div>


      </div>
    </div>
  )
}