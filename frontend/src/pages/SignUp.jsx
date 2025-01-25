import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { TbEyeClosed, TbHealthRecognition } from "react-icons/tb";
import { FaRegEye } from "react-icons/fa";
import toast from "react-hot-toast";

const SignUp = () => {
  const [Values, setValues] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
  });

  const [errorMessage, setErrorMessage] = useState(""); // State to display error messages
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous error messages

    if (Values.password !== Values.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      toast.error(`Passwords do not match`);
      return;
    }

    try {
     await axios.post(`http://localhost:1000/api/v1/sign-up`, {
       name: Values.name,
       email: Values.email,
       username: Values.username,
       password: Values.password,
     });

 
      toast.success("Sign Up Success, Please login!")
      navigate("/login"); 
    } catch (error) {
      // Handle errors from the backend
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-[85vh] bg-white md:bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg md:shadow-md p-6">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-3">
            <span className="text-red-400 text-3xl font-bold">
              <TbHealthRecognition size={40} />
            </span>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Create an account
          </h2>
          <p className="text-gray-500 text-sm">
            Please enter your details to sign up
          </p>
        </div>
        {errorMessage && (
          <div className="bg-red-100 text-red-600 p-2 rounded-md mb-4 text-sm">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={Values.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-600"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={Values.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-600"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Choose a username"
              value={Values.username}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={Values.showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={Values.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() =>
                  setValues((prev) => ({
                    ...prev,
                    showPassword: !prev.showPassword,
                  }))
                }
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {Values.showPassword ? (
                  <FaRegEye style={{ color: "blue" }} />
                ) : (
                  <TbEyeClosed />
                )}
              </button>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-gray-600"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={Values.showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={Values.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() =>
                  setValues((prev) => ({
                    ...prev,
                    showConfirmPassword: !prev.showConfirmPassword,
                  }))
                }
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {Values.showConfirmPassword ? (
                  <FaRegEye style={{ color: "blue" }} />
                ) : (
                  <TbEyeClosed />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-700 transition duration-200"
          >
            Sign up
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
