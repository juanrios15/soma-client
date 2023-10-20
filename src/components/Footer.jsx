import React from 'react';
import { FaInstagram, FaFacebook } from 'react-icons/fa';

export function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="bg-gray-200 w-full py-4 mt-20 px-4 md:px-8">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="text-center md:text-left md:w-2/5 mb-4 md:mb-0 ">
                    &copy; {currentYear} Soma All rights reserved
                </div>
                <div className="flex justify-evenly md:w-3/5 items-center ">
                    <div className="text-center ">
                        <a href="#" className="text-stone-700">Privacy</a>
                    </div>
                    <div className="text-center">
                        <a href="#" className="text-stone-700">Terms</a>
                    </div>
                    <div className="flex space-x-4 items-center ">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="text-stone-700" />
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebook className="text-stone-700" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
