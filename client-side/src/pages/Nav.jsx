import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa";
const Nav = ({email,setCount,count}) => {
      const [dropdownOpen, setDropdownOpen] = useState(false);
       const logout = () => {
    localStorage.removeItem("token");
    setCount(count + 1);
  }
  console.log(`eedfsf${email}`);
  
  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">

        <div className="text-xl font-bold text-blue-600">
          <a href="/">Home</a>
        </div>

        <div className="flex items-center gap-6 relative">
            <div>{email} </div>
          <Link to="/addpost">
            <button className="text-gray-700 hover:text-blue-600 focus:outline-none">
              AddPost
            </button>
          </Link>
            <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition"

                >
                  Logout
                </button>
       
        </div>
      </nav>


  )
}

export default Nav
