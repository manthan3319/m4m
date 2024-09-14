import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate for redirection
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import { logo2 } from '../../../components/Images/Images';
import { ApiBaseurl } from '../Credentials/Credentials';

// Use environment variable for the API URL
const API_URL = process.env.REACT_APP_API_URL || `${ApiBaseurl}/Contractor/adminLogin`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Use useNavigate for redirection

  // Check for token on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard'); // Redirect to dashboard if token is present
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data, "adminlogin");

      if (response.ok) {
        if (data.data.messages === "Login Successful!") {
          localStorage.setItem('token', data.data.token);
          toast.success('Login successful!');
          navigate('/dashboard');
        } else if (data.data.messages === "Password is incorrect!" || data.data.messages === "Your Email is incorrect!") {
          toast.error(data.data.messages);
        } else {
          toast.error('Failed to login. Please try again.');
        }
      } else {
        toast.error('Failed to login. Please try again.');
      }
    } catch (err) {
      toast.error('An error occurred while trying to login.');
      console.error('Login Error:', err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black px-[20px]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className='mb-[15px]'>
          <img src={logo2} className='w-[150px] m-auto' alt="Logo" />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-left">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
        <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      </div>
    </div>
  );
};

export default Login;
