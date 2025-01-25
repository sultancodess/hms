import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TbEyeClosed } from "react-icons/tb";
import { FaRegEye } from "react-icons/fa";
import { authActions } from "../store/auth";
import { TbHealthRecognition } from "react-icons/tb";
import axios from "axios";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";


const LogIn = () => {



  const [usernameOremail, setUsernameOremail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Added loading state
  const navigate = useNavigate();
  const dispatch = useDispatch();




  
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const response = await axios.post(`http://localhost:1000/api/v1/sign-in`, {
      usernameOremail,
      password,
    });

    const { token, role, id } = response.data;

    if (response.status === 200) {
   
      dispatch(authActions.login());
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", id);

    


   
      switch (role) {
        case "admin":
          navigate("/admin-dashboard");
          break;
        case "doctor":
          navigate("/doctor-dashboard");
          break;
        case "receptionist":
          navigate("/receptionist-dashboard");
          break;
        case "patient":
          navigate("/patient-dashboard");
          break;
        default:
          console.error("Unknown role:", role);
      }

      toast.success("Login successful");

 
      window.location.reload();
    }
  } catch (error) {
    if (error.response && error.response.data) {
      setErrorMessage(error.response.data.message);
      toast.error(error.response.data.message);
    } else {
      toast.error("An error occurred. Please try again later.");
    }
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="flex items-center justify-center h-[80vh] md:w-full bg-white md:bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg md:shadow-md p-6">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-3">
            <span className="text-red-400 text-3xl font-bold">
              <TbHealthRecognition size={40} />
            </span>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">Welcome back</h2>
          <p className="text-gray-500 text-sm">
            Please enter your details to sign in
          </p>
        </div>

        {errorMessage && (
          <div className="bg-red-100 text-red-600 p-2 rounded-md mb-4 text-sm">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="usernameOremail"
              className="text-sm font-medium text-gray-600"
            >
              Username or Email
            </label>
            <input
              type="text"
              id="usernameOremail"
              name="usernameOremail"
              placeholder="Enter your username or email"
              value={usernameOremail}
              onChange={(e) => setUsernameOremail(e.target.value)}
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
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <FaRegEye style={{ color: "blue" }} />
                ) : (
                  <TbEyeClosed />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 text-sm text-gray-600">
              <input
                type="checkbox"
                className="h-4 w-4 border rounded text-purple-600 focus:ring-purple-400"
              />
              <span>Remember for 30 days</span>
            </label>
            <Link
              to="/forgot-password"
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            // Disable button when loading
            className="w-full py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-700 transition duration-200"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to="/SignUp" className="text-blue-500 hover:underline">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
