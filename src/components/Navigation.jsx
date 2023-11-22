import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import imagen2 from '../assets/imagen2.svg'


export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className="fixed top-0 left-1/2 w-full lg:w-2/3 xl:w-1/2 transform -translate-x-1/2 bg-cyan-700 sm:rounded-[15px] z-10">
      <div className="flex md:hidden container mx-auto p-2 justify-between">
        <button onClick={toggleMenu} className=" text-stone-700 text-2xl md:hidden">
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
        <div className="md:hidden rounded-full h-10 w-10">
          <img src={imagen2} alt="" className="max-w-full h-auto" />
        </div>
      </div>
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:block text-white py-2 md:p-4`}>
          <div className={`flex md:justify-between flex-col md:flex-row text-center`}>
            <Link to="/" className=" text-lg">Home</Link>
            <Link to="/assessments" className=" text-lg">Assessments</Link>
            <div className="group hidden md:flex rounded-full h-20 w-20 absolute top-0 left-1/2 transform 
          -translate-x-1/2 bottom-full items-center justify-center">
              <img src={imagen2} alt="" className="transform scale-110" />
            </div>
            <Link to="/rankings" className=" text-lg">Rankings</Link>
            <Link to="/about-us" className=" text-lg">About us</Link>
          </div>
        </div>
    </div>
  )
}