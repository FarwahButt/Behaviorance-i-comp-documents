import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="px-10 py-4 flex items-center justify-between bg-gradient-to-r from-black to-blue-950 opacity-75 text-white pt-8">
      {/* Left Section: Logo and Menu */}
      <div className="flex items-center space-x-16">
        {/* Logo */}
        <div className="flex items-center text-white font-bold text-xl">
        <Link href=""> <span className="text-white">Behaviorance-I</span> </Link>
        </div>
        {/* Menu Item */}
        <div className="hidden md:flex text-white font-medium text-sm">
          Accounts
        </div>
      </div>

      {/* Right Section: Icons */}
      <div className="flex items-center space-x-8">
        {/* Help Icon */}
        <button
          className="text-white hover:text-blue-500 focus:outline-none"
          aria-label="Help"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 9a1 1 0 110 2 1 1 0 010-2zm.01 4h-.02c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1h.02c.55 0 1-.45 1-1v-2c0-.55-.45-1-1-1z"
            />
          </svg>
        </button>

        {/* Notifications Icon */}
        <button
          className="text-white hover:text-blue-500 focus:outline-none"
          aria-label="Notifications"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 7.165 7 8.388 7 10v4.159c0 .538-.214 1.055-.595 1.436L5 17h10z"
            />
          </svg>
        </button>

        {/* User Profile Dropdown */}
        <div className="relative">
         
          <button
            className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center"
            onClick={toggleDropdown}
          >
            <Image
              src="/profile.png"
              alt="User Profile" 
              className="rounded-full" 
              fill 
            />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className=" absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
              <ul>
                <Link href= "/accsetting">
                <li className="text-black px-4 py-2 hover:bg-gray-300  cursor-pointer hover:border-2 hover:border-black">
                  Account Settings
                </li>
                </Link>


               <Link href= "/upgradeplan">
              <li className="text-black px-4 py-2 hover:bg-gray-300 cursor-pointer hover:border-2 hover:border-black">
                  Upgrade Plan
                </li>
                </Link>
                <Link href="/">
                <li className="text-black px-4 py-2 hover:bg-gray-300 cursor-pointer hover:border-2 hover:border-black">
                  Logout
                </li>
                </Link>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
