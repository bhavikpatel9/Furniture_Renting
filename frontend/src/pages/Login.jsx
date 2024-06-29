// Login.jsx

import React, { useState } from 'react';
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate, NavLink } from 'react-router-dom'

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Perform authentication logic (API call, etc.)
    try {
      // Simulate successful login for demonstration
      // Replace with actual API call
      // Example API call using fetch:
      const response = await fetch('http://localhost:5000/furniture/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Login successful
        const userData = await response.json(); // Assuming API returns user data
        console.log(userData);
        
        

        if(userData.userType === "ADMIN"){
          onLogin(userData.name,userData.id, userData.accessToken,userData.userType); // Call onLogin function passed from App.jsx to update login state
          navigate(`/admin/${userData.id}`)
        }else{
          onLogin(userData.name,userData.id, userData.accessToken,userData.userType,userData.email); // Call onLogin function passed from App.jsx to update login state
          navigate('/'); // Redirect to home page after login
        }
      } else {
        // Login failed
        console.error('Login failed');
        // Handle error (show error message, reset form, etc.)
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error (show error message, reset form, etc.)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type={passwordVisible ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 top-8 px-3 py-2 text-gray-600"
            >
              {passwordVisible ? <IoEye size={20} /> : <IoEyeOff size={20} />}
            </button>
          </div>
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            type="submit"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account? <NavLink className="text-blue-500 hover:underline" to="/signup">Register Here</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
