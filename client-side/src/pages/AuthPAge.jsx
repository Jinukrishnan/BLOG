import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AuthPAge = () => {
    const navigate=useNavigate()
    const [isLogin, setIsLogin] = useState(true);
    const [login, setLogin] = useState({
        email: "",
        password: "",
        cpassword:""
    })
    const handleChangeLogin = (e) => {
        console.log(e.target.value);

        setLogin({ ...login, [e.target.name]: e.target.value })
    }


    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("/auth/login", login);
           if(res.status===200){
            localStorage.setItem("token",res.data.token);
            setLogin({email:"",password:""});
            alert(res.data.msg);
            navigate("/");

           }

        } catch (error) {
            console.log(error.response.data);
            alert(error.response.data);
            
        }
        
    }
    const handleRegister = async (e) => {
        e.preventDefault()
       try {
         console.log("register");
        console.log(login);
        const res=await axios.post("/auth/register",login);
        if(res.status===200){
            setLogin({email:"",password:"",cpassword:""});
            // alert(res);
            
            alert(res.data);
            setIsLogin(true);
            
        }
       } catch (error) {
        console.log(error.response.data);
        alert(error.response.data);
        
       }
        
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    {isLogin ? "Login" : "Register"}
                </h2>

                <form className="space-y-4">
                    <div>
                        <label className="block mb-1 text-gray-700">Email</label>
                        <input
                            onChange={handleChangeLogin}
                            type="email"
                            name="email"
                            value={login.email}
                            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter email"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-gray-700">Password</label>
                        <input
                            onChange={handleChangeLogin}
                            type="password"
                            name='password'
                            value={login.password}
                            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter password"
                            required
                        />
                    </div>

                    {!isLogin && (
                        <div>
                            <label className="block mb-1 text-gray-700">Confirm Password</label>
                            <input
                            name='cpassword'
                            value={login.cpassword}
                            onChange={handleChangeLogin}
                                type="password"
                                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="Confirm password"
                                required
                            />
                        </div>
                    )}

                    <button
                        onClick={isLogin ? handleLogin : handleRegister}
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition duration-300"
                    >
                        {isLogin ? "Login" : "Register"}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    {isLogin ? (
                        <p>
                            Don’t have an account?{" "}
                            <button
                                onClick={() => setIsLogin(false)}
                                className="text-blue-500 hover:underline"
                            >
                                Register
                            </button>
                        </p>
                    ) : (
                        <p>
                            Already have an account?{" "}
                            <button
                                onClick={() => setIsLogin(true)}
                                className="text-blue-500 hover:underline"
                            >
                                Login
                            </button>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AuthPAge
