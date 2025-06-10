import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
const Home = ({setEmail,count,setCount}) => {
  const navigate = useNavigate()

 
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getUser();
  }, [count])

  async function getUser() {
    try {
      if (!localStorage.getItem("token")) {
        navigate("/auth");
      }
      const res = await axios.get('/auth/posts', { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
      // const data=await res.json();
      // console.log(data);
      setPosts([...res.data])
      console.log(res);
      if (res.status === 200) {
        console.log("**********************************8");
        
        // console.log(res.data[0].user_id.email);
        setEmail(res.data[0].user_id.email);
      }
      else {
        navigate("/auth");
      }
    } catch (error) {
      console.log(error);

    }

  }
 
  const handleDetelete = (id) => {
    axios.delete(`/auth/posts/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
    setCount(count + 1);
  }
  return (
    <div>
     

      <div className="max-w-3xl mx-auto mt-10 space-y-6">
        <h2 className="text-2xl font-bold text-center mb-6">All Posts</h2>
        {posts.length === 0 ? (
          <p className="text-center text-gray-500">No posts available</p>
        ) : (
          posts.map((post, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold mb-2 text-blue-700">{post.title}</h3>
                <p className="text-gray-800 mb-4">{post.content}</p>
                <p className="text-sm text-gray-500">Author: {post.author}</p>
                {post.createdAt && (
                  <p className="text-xs text-gray-400 mt-1">
                    Posted on: {new Date(post.createdAt).toLocaleString()}
                  </p>
                )}
              </div>
              <div>
                <button onClick={() => handleDetelete(post._id)} className="bg-red-400 px-5 py-2 rounded-md cursor-pointer">Delete</button>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Home
