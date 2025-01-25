import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLinkSent, setIsLinkSent] = useState(false); 

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous messages
    setMessage("");
    setError("");

    // Validate the email input
    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    try {
      // Make the POST request to the API endpoint
      const response = await axios.post(
        "http://localhost:1000/api/v1/forget-password",
        { email }
      );

      // If email is sent successfully, display success message
      setMessage(response.data.message);
      setIsLinkSent(true);
      toast.success("Password reset link sent successfully")
    } catch (err) {
      // If an error occurs, display the error message
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Something went wrong.");
        setIsLinkSent(false);
      } else {
        setError("Network error or server is not responding.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-[85vh] bg-gray-100 p-6">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-center mb-3">
          Forgot Password
        </h2>
        <div className="flex items-start justify-center mb-5">
        {message && <p className="text-green-600 text-sm mt-2">{message}</p>}
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
          
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="Enter Email Address"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 mt-4 font-semibold rounded-lg focus:outline-none focus:ring-2 
            ${
              isLinkSent
                ? "bg-green-500 hover:bg-green-600"
                : "bg-blue-500 hover:bg-indigo-700"
            } 
            text-white`}
          >
            {isLinkSent ? "Reset Link Sent" : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
