import React from 'react'
import { useState } from 'react';
import meeting from '../assets/meeting.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate(); 
    const handleEmailChange = (e) => {
        setUsername(e.target.value);
    };
  

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const request = await axios.post('http://localhost:5028/api/Auth/Login', { username, password });
          console.log(request.data); 
          const response = await request.data;
          window.localStorage.setItem("isLogged", true);
          window.localStorage.setItem("token",response);  
          console.log(JSON.parse(atob(localStorage.getItem("token").split(".")[1])).username);
            const role =JSON.parse(atob(localStorage.getItem("token").split(".")[1])).role;
             if(role ==="Admin"){
                console.log("ok");
                navigate("/admin/dashboard");
             }if(role ==="USER"){
                navigate("/employee/dashboard");
             }
        } catch (err) {
            setError("Invalid email or password. Please try again.");
          }
      };
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                            className="mx-auto h-200 w-auto"
                            src={meeting}
                            alt="Your Company"
                        />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account 
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form  onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="  john@workemail.com"
                                    value={username}
                                    onChange={handleEmailChange}

                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>

                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    placeholder="  ******"
                                    onChange={handlePasswordChange}
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Login
                            </button>
                        </div>
                        <p className="text-red-600">{error}</p>

                    </form>                   
                </div>
            </div>
        </>
    )
}

export default Login;