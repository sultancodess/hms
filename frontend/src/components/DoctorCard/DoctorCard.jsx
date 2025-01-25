import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";



const DoctorCard = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div
      
      className="group block bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-transform duration-200 transform hover:-translate-y-2"
    >
      <Link
        to={`/view-doctor-details/${data._id}`}
        className="flex items-start gap-4"
      >
        <img
          src={data.image || "/assets/doctor.jpg"}
          alt={data.name || "Doctor"}
          className="w-20 h-20 rounded-full border-2 border-blue-500"
        />
        <div>
          <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600">
            Dr. {data.name || "N/A"}
          </h3>
          <p className="text-sm capitalize text-blue-600">
            {data.specialization || "Specialization not available"}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Registration No:</strong> {data.registrationNo || "N/A"}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Languages:</strong>{" "}
            {data.languages?.join(", ") || "Not specified"}
          </p>
        </div>
      </Link>
      <div className="mt-4">
        <p className="text-sm text-gray-600">
          🏅{" "}
          {data.experience
            ? `${data.experience} years of experience`
            : "Experience not available"}
        </p>
        <p className="text-sm text-gray-600">
          📍 {data.address?.city || "City"},{" "}
          {data.address?.country || "Country"}
        </p>
        <p className="text-sm text-gray-600 mt-2">
          <strong className="text-green-500">Availability:</strong>{" "}
          {data.availability?.days?.join(", ") || "Days not specified"} -{" "}
          {data.availability?.timeSlots
            ?.map((slot) => `${slot.start} - ${slot.end}`)
            .join(", ") || "Time slots not available"}
        </p>
      </div>
      <div className="flex mt-4 gap-4">
        <button
          onClick={() => navigate("/book-appointment", { state: { data } })}
          className="flex-1 bg-blue-500 text-white text-sm md:text-base px-2 py-1 md:py-2 md:px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          Book an Appointment
        </button>
        <button className="flex-1 flex gap-2 items-center text-sm md:text-base justify-center bg-green-600 text-white px-2 py-1 md:py-2 md:px-4 rounded hover:bg-green-500 transition duration-200">
          <FaPhoneAlt /> Call
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
