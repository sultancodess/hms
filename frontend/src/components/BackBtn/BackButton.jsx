import React from "react";
import { useNavigate } from "react-router-dom";
import { IoCaretBackOutline } from "react-icons/io5";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)} // Go back to the previous page
      className="mb-2 px-1 py-1 bg-blue-500  text-white rounded-xl hover:bg-blue-600 transition duration-200"
    >
      <IoCaretBackOutline />
    </button>
  );
};

export default BackButton;
