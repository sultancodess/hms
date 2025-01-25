import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGripLines, FaTimes } from "react-icons/fa";
import { TbHealthRecognition } from "react-icons/tb";
import { AiOutlineHome, AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import { FaStethoscope, FaBed } from "react-icons/fa";
import { MdOutlineEventNote } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import UserProfile from "../UserAvatar/UserAvatar";
import { authActions } from "../../store/auth";
import { FiBell } from "react-icons/fi";

const Navbar = () => {
  const Links = {
    DefaultLinks: [
      { title: "Home", url: "/", icon: <AiOutlineHome /> },
      { title: "Find Doctors", url: "/all-doctors", icon: <FaStethoscope /> },
    ],
    patient: [
      { title: "Home", url: "/", icon: <AiOutlineHome /> },
      { title: "Find Doctors", url: "/all-doctors", icon: <FaStethoscope /> },
    

    
      {
        title: "Check Bed Availability",
        url: "/check-bed-availability",
        icon: <FaBed />,
      },
      {
        title: "Dashboard",
        url: "/patient-dashboard",
        icon: <FaBed />,
      },
    ],
    doctor: [
      { title: "Home", url: "/", icon: <AiOutlineHome /> },
      {
        title: "Check Bed Availability",
        url: "/check-bed-availability",
        icon: <FaBed />,
      },
      {
        title: "Dashboard",
        url: "/doctor-dashboard",
        icon: <FaBed />,
      },
    ],
    admin: [
      {
        title: "Dashboard",
        url: "/admin-dashboard",
        icon: <FaBed />,
      },
      {
        title: "Reports & Analytics",
        url: "/report",
        icon: <FaBed />,
      },
    ],
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isMobileNavVisible, setMobileNavVisible] = useState(false);
  const [userRole, setUserRole] = useState(null); // User role state

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); 

  useEffect(() => {
    const role = localStorage.getItem("role");
    setUserRole(role);
  }, []);

  const roleLinks = userRole ? Links[userRole] : Links.DefaultLinks;

  const handleLogout = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  return (
    <>
      <nav className="shadow-md z-30 sticky top-12 bg-white text-black px-6 md:px-10 py-3 flex items-center justify-between">
        <Link to="/" className="flex gap-2 items-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <span className="text-red-400 text-3xl font-bold">
              <TbHealthRecognition size={30} />
            </span>
          </div>
          <h1 className="text-2xl font-semibold">MediCare</h1>
        </Link>
        <div className="nav-links-hospital block md:flex gap-6 items-center">
          <div className="hidden md:flex gap-6">
            {roleLinks.map((item, index) => (
              <Link
                to={item.url}
                key={index}
                className="text-gray-600 hover:text-blue-500 transition-all duration-300"
              >
                {item.title}
              </Link>
            ))}
          </div>
          <div className="hidden md:flex gap-6">
            {userRole === "patient" && (
              <Link
                to="/book-appointment"
                className="px-3 py-2 border-blue-500 bg-gray-200 rounded hover:bg-blue-500 hover:text-white transition-all duration-300"
              >
                Book appointment
              </Link>
            )}
            {(userRole === "doctor" || userRole === "admin") && (
              <Link
                to="/notifications"
                className="p-3 text-gray-500 text-lg bg-gray-200 rounded-full hover:bg-gray-300 cursor-pointer transition-all duration-300"
              >
                <FiBell />
              </Link>
            )}

            {isLoggedIn === false && (
              <Link
                to="/login"
                onClick={() => setMobileNavVisible(false)}
                className="flex items-center justify-center px-4 py-2 text-lg font-semibold bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-lg transition-all duration-300"
              >
                Login
                <AiOutlineLogin className="ml-2" />
              </Link>
            )}
          </div>
          <div className="flex items-center gap-2">
            {isLoggedIn && <UserProfile />}
            <button
              className="block md:hidden text-gray-700 text-2xl hover:text-black"
              onClick={() => setMobileNavVisible(!isMobileNavVisible)}
            >
              {isMobileNavVisible ? <FaTimes /> : <FaGripLines />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={`${
          isMobileNavVisible ? "translate-y-0" : "-translate-y-full"
        } bg-gradient-to-b   from-blue-100 via-white to-blue-50 h-fit px-10 py-20 top-20 left-0 w-full fixed flex md:hidden flex-col items-start justify-start transition-transform duration-500 z-10 shadow-lg`}
      >
        {roleLinks.map((item, index) => (
          <Link
            to={item.url}
            key={index}
            className="flex items-center gap-4 text-gray-700 text-lg md:text-xl mb-4 p-2 rounded-lg bg-blue-50 hover:bg-blue-500 hover:text-white shadow-md transition-all duration-300 w-full"
            onClick={() => setMobileNavVisible(false)}
          >
            {item.icon}
            {item.title}
          </Link>
        ))}
        <Link
          to="/book-appointment"
          onClick={() => setMobileNavVisible(false)}
          className="flex items-center justify-center px-4 py-2 mb-6 text-lg font-semibold text-blue-500 bg-white border-2 border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white shadow-lg transition-all duration-300"
        >
          Book appointment
        </Link>
        {isLoggedIn === false && (
          <Link
            to="/login"
            onClick={() => setMobileNavVisible(false)}
            className="flex items-center justify-center px-4 py-2 text-lg font-semibold bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-lg transition-all duration-300"
          >
            Login
            <AiOutlineLogin className="ml-2" />
          </Link>
        )}
        {isLoggedIn && (
          <Link
            to="/"
            onClick={() => {
              handleLogout();
              setMobileNavVisible(false);
            }}
            className="flex items-center justify-center px-4 py-2 text-lg font-semibold bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-lg transition-all duration-300"
          >
            Logout
            <AiOutlineLogout className="ml-2" />
          </Link>
        )}
      </div>
    </>
  );
};

export default Navbar;

