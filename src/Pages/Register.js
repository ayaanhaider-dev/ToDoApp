import React, { useState, useEffect } from 'react';
import { useFirebase } from '../Contexts/Firebase';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // checking if user is already logged in and redirecting to home page
  useEffect(() => {
    if (firebase.isLoggedIn) {
      navigate('/');
    }
  }, [firebase, navigate]);

  // Event handler for form submission
  const formSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call Firebase function to sign up user with username, email, and password
      await firebase.signupUserWithEmailAndPassword(userName, email, password);
      console.log('Signin Success');
    } catch (error) {
      console.error('Signup Error:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={formSubmit}
        className="w-full max-w-md p-8 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-8 text-center">Register</h2>

        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-700"
            htmlFor="username"
          >
            UserName
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            type="text"
            id="Username"
            placeholder="Enter your UserName"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            type="email"
            id="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            type="password"
            id="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        <div className="flex justify-center">
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            type="submit"
          >
            Register
          </button>
        </div>

        <div className="flex justify-center mt-4">
          <button
            className="px-6 py-3 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
            type="button"
            onClick={firebase.signInWithGoogle}
          >
            Register with Google
          </button>
        </div>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:text-blue-700">
            Login
          </Link>
          .
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
