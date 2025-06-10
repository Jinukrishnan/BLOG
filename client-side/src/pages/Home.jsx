import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { FaUserCircle } from "react-icons/fa";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
const Home = () => {
    const navigate=useNavigate()
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [count,setCount]=useState(0);
    const [email,setEmail]=useState("");
    useEffect(() => {
        getUser();
    },[count])

    async function getUser(){
       try {
        if(!localStorage.getItem("token")){
            navigate("/auth");
        }
         const res=await axios.get('/auth/getuser',{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}});
        // const data=await res.json();
        // console.log(data);
        console.log(res);
        if(res.status===200){
            console.log(res.data);
            setEmail(res.data.email);
        }
        else{
            navigate("/auth");
        }
       } catch (error) {
        console.log(error);
        
       }
        
    }
    const logout=()=>{
        localStorage.removeItem("token");
        setCount(count+1);
    }
  return (
    <div>
         <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      {/* Left side */}
      <div className="text-xl font-bold text-blue-600">
        <a href="/">Home</a>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-6 relative">
        <a
          href="/add-post"
          className="text-gray-700 hover:text-blue-600 font-medium transition"
        >
          Add Post
        </a>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 focus:outline-none"
          >
            <FaUserCircle size={24} />
            <span className="font-medium">{email}</span>
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white border rounded-xl shadow-lg overflow-hidden z-50">
              <a
                href="/profile"
                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
              >
                View Profile
              </a>
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition"
                
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
    </div>
  )
}

export default Home
