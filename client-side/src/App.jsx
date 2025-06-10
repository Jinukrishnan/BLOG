import React, { useState } from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import AuthPAge from './pages/AuthPAge'
import { useEffect } from 'react';
import axios from "axios"
import Home from './pages/Home';
import AddPost from './pages/AddPost';
import Nav from './pages/Nav';
const App = () => {
   const [count, setCount] = useState(0);
    useEffect(() => {
    axios.defaults.baseURL = 'http://localhost:3000/api'; 
 
  }, []);
  const [email,setEmail]=useState("");
  return (
    <div>
     <BrowserRouter>
    {localStorage.getItem("token")&& <Nav email={email} setCount={setCount} count={count}/>}
     <Routes>
      <Route path='/auth' element={<AuthPAge/>}/>
      <Route path='/' element={<Home setEmail={setEmail} count={count} setCount={setCount}/>}/>
      <Route path='/addpost' element={<AddPost/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  )
}

export default App
