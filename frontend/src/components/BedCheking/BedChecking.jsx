
import React, { useState, useEffect } from "react";
import axios from "axios";
import { RiRefreshLine } from "react-icons/ri";
import AutomationAnalytics from "./topComponent";
import { Link } from "react-router-dom";
import {
  RiHospitalLine,
  RiBuilding2Line,
  RiUserHeartLine,
} from "react-icons/ri"; // Remix Icons

const BedChecking = ({ onRefresh }) => {
  const handleRefresh = () => {
    window.location.reload(); // Reloads the current page
  };

  const [data, setData] = useState([]); // State for storing room data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1000/api/v1/get-rooms`
        );
        if (Array.isArray(response.data)) {
          setData(response.data); // Directly set the array of rooms
        } else {
          setError("Invalid data format received.");
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch room data.");
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-full px-2 py-4 md:px-8 md:py-6 bg-gray-50">
      
      <button
        className="fixed bottom-5 right-5 w-12 h-12 z-20 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        onClick={handleRefresh}
      >
        <RiRefreshLine size={24} />
      </button>

      <AutomationAnalytics data={data} />
      <h2 className=" mt-5 ml-3 mb-5 md:mt-10 md:mb-10 md:ml-5 font-semibold text-xl  md:text-3xl text-blue-500">
        Rooms Information
      </h2>
      <div className="flex flex-col gap-6">
        {data.map((room) => (
          <div
            key={room._id}
            className="w-full h-fit flex flex-col md:flex-row gap-2 md:gap-4 p-4 md:p-6 shadow-lg rounded-lg bg-gradient-to-r from-purple-50 to-green-50 hover:shadow-xl transition-all"
          >
           
            <div className="w-full md:w-3/6 text-gray-700 flex flex-col bg-purple-50 border border-purple-400 rounded-lg p-4 md:p-6">
              <span className="text-lg md:text-2xl font-bold mb-2 flex items-center gap-2">
                <RiHospitalLine className="text-purple-500" /> Room no:{" "}
                {room.roomNumber}
              </span>
              <p className="flex items-center gap-2">
                <RiBuilding2Line className="text-purple-500" />
                <span className="font-semibold text-sm md:text-lg">
                  Type:
                </span>{" "}
                {room.roomType}
              </p>
              <p className="flex items-center gap-2">
                <RiBuilding2Line className="text-purple-500" />
                <span className="font-semibold text-sm md:text-lg">
                  Floor:
                </span>{" "}
                {room.floor}
              </p>
              <p className="flex items-center gap-2">
                <RiUserHeartLine className="text-purple-500" />
                <span className="font-semibold text-sm md:text-lg">
                  Department:
                </span>{" "}
                {room.department}
              </p>
            </div>

            {/* Bed Info Section */}
            <div className="w-full md:w-3/6 h-fit bg-green-50 border border-green-400 rounded-lg p-4 md:p-6">
              <div className="flex justify-between items-center">
                <strong className="font-semibold text-lg text-gray-600">
                  Beds: {room.beds.length}
                </strong>
                <span
                  className="inline-block bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full"
                  title="Room Status"
                >
                  {room.beds.filter((bed) => bed.isOccupied).length} Occupied
                </span>
              </div>
              <div className="grid grid-cols-5 gap-3 place-items-center mt-4">
                {room.beds.map((bed, index) => (
                  <Link
                    to={`/view-bed-details/${room._id}/${bed._id}`}
                    key={index}
                    className="bed-item relative group"
                  >
                    <div
                      className={`${
                        bed.isOccupied
                          ? "bg-gray-300 text-gray-600 border-2 border-gray-400 hover:cursor-not-allowed"
                          : "bg-green-500 text-white hover:bg-green-600 hover:cursor-pointer"
                      } w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center transition-all`}
                    >
                      <span className="font-bold">{bed.bedNumber}</span>
                      {bed.isOccupied && (
                        <span
                          className="absolute top-0 right-0 w-3 h-3 rounded-full bg-red-500 border border-white"
                          title="Occupied"
                        />
                      )}
                    </div>
                    {/* Tooltip */}
                    <div
                      className={`tooltip absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs font-medium rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity`}
                    >
                      {bed.isOccupied ? "Occupied" : "Available"}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BedChecking;
