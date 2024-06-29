import React, { useState,useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({ isLoggedIn, userName, onLogout, isAdmin }) => {

  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if(!isLoggedIn){
      setShowDropdown(false)
    }
  }, [isLoggedIn])
  
  

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className='sticky top-0 z-10'>
      <nav className='flex justify-between p-3 bg-[#3B5998]'>
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span className="ml-3 text-xl text-white">Tailblocks</span>
        </a>

        <ul className='flex gap-7 items-center text-white'>
          <li><NavLink className={(e) => (e.isActive ? "text-blue-300" : "")} to="/">Home</NavLink></li>
          {isAdmin && (<li><NavLink className={(e) => (e.isActive ? "text-blue-300" : "")} to="/admin/:id">Add Package</NavLink></li>)}
        </ul>
        {isLoggedIn ? (
          <div className="relative flex items-center">
            <button onClick={handleDropdownClick} className="text-white bg-blue-500 px-2 py-1 rounded"><NavLink to="/profile">{userName}</NavLink>
              
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-20  ">
                <button onClick={onLogout} className="block px-4 py-2 text-gray-800 bg-white rounded-md shadow-md hover:bg-gray-100">
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button>
            <NavLink className={(e) => (e.isActive ? "text-blue-300" : "text-white")} to="/signup">Sign Up</NavLink>
          </button>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
