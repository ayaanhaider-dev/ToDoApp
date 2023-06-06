import React, { useState } from 'react';
import { useFirebase } from '../Contexts/Firebase';

const ForgotPassword = () => {
  const firebase = useFirebase();
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();

    try {
      await firebase.resetPassword(email);
      setSuccess(true);
      setError('');
    } catch (error) {
      setError(error.message);
      setSuccess(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleResetPassword}
        className="w-full max-w-md p-8 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-8 text-center">Forgot Password</h2>

        {success && (
          <div className="bg-green-100 text-green-800 px-4 py-3 mb-4 rounded">
            Password reset email sent. Please check your inbox.
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-800 px-4 py-3 mb-4 rounded">
            {error}
          </div>
        )}

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
            onChange={handleInputChange}
            value={email}
            required
          />
        </div>

        <div className="flex justify-center">
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            type="submit"
          >
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
