import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const AddRooms = () => {
  const [Data, setData] = useState({
    roomNumber: "",
    roomType: "",
    numberOfBeds: "",
    bedType: "",
    floor: "",
    department: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Message, setMessage] = useState();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const departments = [
    "Cardiology",
    "Gynocology",
    "General",
    "Premium",
 ];

  const headers = {
    id: localStorage.getItem("userId"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

     

     const openModal = () => {
       setIsModalOpen(true);
     };

     const closeModal = () => {
       setIsModalOpen(false);
     };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:1000/api/v1/add-room",
        Data,
        { headers }
      );
      toast.success(response.data.message);
      setMessage(response.data.message);
      openModal(true)
      console.log(response.data.message);
   
      setData({
        roomNumber: "",
        roomType: "select",
        numberOfBeds: "",
        bedType: "select",
        floor: "select",
        department: "",
      });
    } catch (error) {
      if (error.response) {
        // Access error message from response
        console.error("Error:", error.response.data.message);
        toast.error(error.response.data.message); 
      } else {
        console.error("Unknown Error:", error);
        alert("An unknown error occurred.");
      }
     
    }
  };

  return (
    <div className="w-full h-[85vh] bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 p-3 flex justify-center items-center">
      <div className="w-full flex gap-3 h-full bg-white rounded-xl overflow-y-scroll ">
        <div className="w-full bg-white rounded-lg p-6">
          <h2 className="text-3xl font-semibold text-blue-500 mb-6 text-center ">
            Add Rooms
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-3 w-full ">
              {/* Name */}
              <div className="w-3/6">
                <label
                  htmlFor="roomNumber"
                  className="block text-sm font-semibold text-gray-600"
                >
                  Room Number
                </label>
                <input
                  type="text"
                  name="roomNumber"
                  id="roomNumber"
                  placeholder="Enter full Room Number"
                  value={Data.roomNumber}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  required
                />
              </div>

              {/* roomType */}
              <div className="w-3/6">
                <label
                  htmlFor="roomType"
                  className="block text-sm font-semibold text-gray-600"
                >
                  Room Type
                </label>
                <select
                  name="roomType"
                  id="roomType"
                  value={Data.roomType}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                >
                  <option value="Select">Select Room Type</option>
                  <option value="ICU">ICU</option>
                  <option value="General">General Ward</option>

                  <option value="Private">Private Room</option>

                  <option value="Semi-Private">Semi-Private Room</option>

                  <option value="NICU">
                    NICU (Neonatal Intensive Care Unit) Room
                  </option>

                  <option value="Isolation">Isolation Room</option>

                  <option value="Emergency">Emergency Room</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3/6">
                <label
                  htmlFor="numberOfBeds"
                  className="block text-sm font-semibold text-gray-600"
                >
                  Numbers of Beds
                </label>
                <input
                  type="number"
                  name="numberOfBeds"
                  id="numberOfBeds"
                  placeholder="Enter Numbers of Beds"
                  value={Data.numberOfBeds}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  required
                />
              </div>
              <div className="w-3/6">
                <label
                  htmlFor="bedType"
                  className="block text-sm font-semibold text-gray-600"
                >
                  Bed Type
                </label>
                <select
                  name="bedType"
                  id="bedType"
                  value={Data.bedType}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                >
                  <option value="Select">Select Bed Type</option>
                  <option value="Pediatric">Pediatric</option>
                  <option value="Bariatric">Bariatric</option>
                  <option value="Low Bed">Low Bed</option>
                  <option value="LDR">LDR (Labor, Delivery, Recovery)</option>
                  <option value="Air Mattress">Air Mattress</option>
                  <option value="Recovery">Recovery Bed</option>
                  <option value="Fowler">Fowler Bed</option>
                  <option value="Tilt">Tilt Bed</option>
                  <option value="Electric Profiling">
                    Electric Profiling Bed
                  </option>
                  <option value="Examination Couch">Examination Couch</option>
                  <option value="Psychiatric">Psychiatric Bed</option>
                  <option value="Burn Care">Burn Care Bed</option>
                  <option value="Orthopedic">Orthopedic Bed</option>
                  <option value="Neonatal">Neonatal Bed</option>
                  <option value="Stretchers">Stretchers/Gurneys</option>
                </select>
              </div>
            </div>
            <div className="w-3/6">
              <label
                htmlFor="floor"
                className="block text-sm font-semibold text-gray-600"
              >
                Floor
              </label>
              <select
                name="floor"
                id="floor"
                value={Data.floor}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="Select">Select Floor</option>
                <option value="second">Second floor</option>
                <option value="first">First floor</option>
                <option value="ground">Ground floor</option>
              </select>
            </div>

            <div className="w-3/6">
              <label
                htmlFor="department"
                className="block text-sm font-semibold text-gray-600"
              >
                Department
              </label>
              <select
                name="department"
                id="department"
                value={Data.department}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                {departments.map((department, index) => (
                  <option key={index} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:outline-none transition duration-300"
              >
                Add Room
              </button>
            </div>
          </form>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-center text-2xl font-semibold text-blue-600 flex flex-col items-center mb-4">
              <img
                src="/assets/check.png"
                alt="Success Icon"
                className="w-24 mb-2"
              />
              <p>{Message}</p>
            </h2>

            <div className="mt-4 text-center">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddRooms;
