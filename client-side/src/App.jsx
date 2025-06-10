import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import AuthPAge from './pages/AuthPAge'
import { useEffect } from 'react';
import axios from "axios"
import Home from './pages/Home';
const App = () => {
    useEffect(() => {
    axios.defaults.baseURL = 'http://localhost:3000/api'; 
    // axios.defaults.withCredentials = true; 
  }, []);
  return (
    <div>
     <BrowserRouter>
     <Routes>
      <Route path='/auth' element={<AuthPAge/>}/>
      <Route path='/' element={<Home/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  )
}

export default App
