import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddPost = () => {
    const navigate=useNavigate()
   const [post, setPost] = useState({
    title: '',
    content: '',
    author: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
try {
    
    console.log('Post submitted:', post);
    const res=await axios.post("/auth/posts",post,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}});
    
    console.log(res);
    if(res.status==200){
        alert("Post added successfully");
        navigate("/");
    }
    
    setPost({ title: '', content: '', author: '' });
} catch (error) {
    console.log(error);
    
}
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={post.title}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <textarea
          name="content"
          placeholder="Content"
          value={post.content}
          onChange={handleChange}
          rows={5}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
          required
        />

        <input
          type="text"
          name="author"
          placeholder="Author"
          value={post.author}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddPost
