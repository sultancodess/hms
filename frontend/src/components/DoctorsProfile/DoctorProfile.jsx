import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import HospitalInfo from "../locationTab/LocationTab";



const DoctorProfile = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1000/api/v1/get-staff/${id}`
        );
        setData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch doctor data.");
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-7xl  h-full  mx-auto px-2 py-4 md:p-6  mb-20 bg-gray-50 md:rounded-lg md:shadow-md">
     
      <div className="flex gap-4 flex-col  justify-between  md:flex-row items-start lg:items-start bg-white rounded-lg p-6 shadow-lg">
        <div className="flex gap-3 items-start">
          <img
            src={data.image || "/assets/doctor.jpg"} // Use actual image URL if available
            alt="Doctor"
            className="w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-full shadow-lg border-2 md:border-4 border-blue-500"
          />
<div className="flex-1">
            <h2 className="text-2xl font-bold capitalize text-gray-800">
              {data.name || "Doctor Name"}
            </h2>
            <p className="mt-1 text-lg text-blue-600">
              {data.specialization || "Specialization not specified"}
            </p>
            <p className="text-sm text-gray-600">
              🎓 {data.qualification || "N/A"}
            </p>
            <p className="text-sm text-gray-600">
              🏅{" "}
              <span className="text-green-600">
                {data.experience || "N/A"} years
              </span>{" "}
              experience overall
            </p>
            <p className="text-sm text-gray-600">
              <span role="img" aria-label="Location" className="mr-2">
                📍
              </span>
              {[
                data.address?.city,
                data.address?.state,
                data.address?.postalCode,
                data.address?.country,
              ]
                .filter(Boolean)
                .join(", ") || "Address not available"}{" "}
            </p>
          </div>
        </div>
        <div className="flex flex-row md:flex-col gap-3 justify-center">
          <Link
            to="/book-appointment"
            className="  lg:mt-0 lg:ml-auto text-sm sm:text-base font-semibold flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 md:px-6 md:py-2 rounded shadow "
          >
            BOOK AN APPOINTMENT
          </Link>
          <Link
            to="/"
            className=" flex w-fit items-center gap-2 text-sm sm:text-base font-semibold lg:mt-0 lg:ml-auto bg-orange-500 hover:bg-blue-600 text-white px-6 py-2 rounded shadow "
          >
            {" "}
            <FaPhoneAlt />
            Call
          </Link>
        </div>
      </div>


      <HospitalInfo data={data} />
    </div>
  );
};

export default DoctorProfile;
