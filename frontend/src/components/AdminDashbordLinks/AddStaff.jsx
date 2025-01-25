import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const AddStaff = () => {
  const [Data, setData] = useState({
    name: "",
    role: "Select",
    email: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    department: "",
    registrationNo: "",
    specialization: "",
    qualification: "",
    experience: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    OpdNo: "",
    languages: "",
  });
  const [staffCredentials, setStaffCredentials] = useState(null);


   const [isModalOpen, setIsModalOpen] = useState(false);

   const openModal = () => {
     setIsModalOpen(true);
   };

   const closeModal = () => {
     setIsModalOpen(false);
   };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };


  const departments = [
    "Select Department",
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "General Surgery",
    "Oncology",
    "Radiology",
    "Gynecology",
    "Dermatology",
  ];

  const headers = {
    id: localStorage.getItem("userId"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };


const handleCountryCodeChange = (e) => {
  const newCountryCode = e.target.value;
  const [, phoneWithoutCode] = Data.phone.split(" ", 2); // Extract only the phone part
  setData({
    ...Data,
    countryCode: newCountryCode,
    phone: `${newCountryCode} ${phoneWithoutCode || ""}`, // Handle cases where phone is empty
  });
};

const handlePhoneChange = (e) => {
  const newPhone = e.target.value.trim();
  const currentCountryCode = Data.countryCode; // Retain the current country code
  const phoneWithoutCode = newPhone.startsWith(currentCountryCode)
    ? newPhone.slice(currentCountryCode.length).trim()
    : newPhone; // Remove duplicate country code if present
  setData({
    ...Data,
    phone: `${currentCountryCode} ${phoneWithoutCode}`,
  });
};

const handleSubmit = async (e) => {
  e.preventDefault(); 
  try {
    // Send a POST request to the server with the form data and headers
    const response = await axios.post(
      "http://localhost:1000/api/v1/add-staff",
      Data,
      { headers }
    );

   
    toast.success(response.data.message);
    console.log(response.data);
    openModal(true);

    const { username, password } = response.data.credentials;

  
    setStaffCredentials({ username, password });

   
    setData({
      name: "",
      role: "Select",
      email: "",
      phone: "",
      gender: "",
      dateOfBirth: "",
      department: "",
      registrationNo: "",
      specialization: "",
      qualification: "",
      experience: "",
      city: "",
      state: "",
      postalCode: "",
      country: "India",
      OpdNo: "",
      languages: "",
    });
  } catch (error) {
  
    if (error.response) {
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
            Add Staff
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-3 w-full ">
              {/* Name */}
              <div className="w-3/4">
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-600"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter full name"
                  value={Data.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  required
                />
              </div>

              {/* Role */}
              <div className="w-3/12">
                <label
                  htmlFor="role"
                  className="block text-sm font-semibold text-gray-600"
                >
                  Role
                </label>
                <select
                  name="role"
                  id="role"
                  value={Data.role}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                >
                  <option value="Select">Select Role</option>
                  <option value="doctor">Doctor</option>
                  <option value="receptionist">Receptionist</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Email */}
              <div className="w-3/6">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter email address"
                  value={Data.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  required
                />
              </div>
              {/* Phone */}
              <div className="flex flex-col w-1/3">
                <label
                  htmlFor="countryCode"
                  className="block text-sm font-semibold text-gray-600"
                >
                  Country Code
                </label>
                <select
                  name="countryCode"
                  id="countryCode"
                  value={Data.countryCode}
                  onChange={handleCountryCodeChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  required
                >
                  <option value="" selected disabled>
                    Select
                  </option>
                  <option value="+91">+91 India</option>
                  <option value="+1">+1 US</option>
                </select>
              </div>
              {/* Phone Number Input */}
              <div className="flex flex-col w-2/3">
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-gray-600"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="Enter phone number"
                  value={Data.phone} // Display the full phone number
                  onChange={handlePhoneChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  required
                />
              </div>{" "}
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3/6">
                <label
                  htmlFor="DOB"
                  className="block text-sm font-semibold text-gray-600"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  id="dateOfBirth"
                  placeholder="Enter dateOfBirth"
                  value={Data.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
              <div className="w-3/6">
                <label
                  htmlFor="gender"
                  className="block text-sm font-semibold text-gray-600"
                >
                  Gender
                </label>
                <select
                  name="gender"
                  id="gender"
                  value={Data.gender}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                >
                  <option value="Select">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3/6">
                <label htmlFor="city" className="block text-gray-700">
                  City:
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={Data.city}
                  onChange={handleInputChange} // Use handleInputChange here
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              {/* State */}
              <div className="w-3/6">
                <label htmlFor="state" className="block text-gray-700">
                  State:
                </label>
                <input
                  type="text"
                  name="state"
                  id="state"
                  value={Data.state}
                  onChange={handleInputChange} // Use handleInputChange here
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Postal Code */}
              <div className="w-3/6">
                <label htmlFor="postalCode" className="block text-gray-700">
                  Postal Code:
                </label>
                <input
                  type="text"
                  name="postalCode"
                  id="postalCode"
                  value={Data.postalCode}
                  onChange={handleInputChange} // Use handleInputChange here
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              <div className="w-3/6">
                <label htmlFor="country" className="block text-gray-700">
                  Country:
                </label>
                <select
                  name="country"
                  id="country"
                  value={Data.country}
                  onChange={handleInputChange} // Use handleInputChange here
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                >
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>
            </div>
            {Data.role === "doctor" && (
              <>
                <div className="flex items-center gap-3">
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

                  {/* Registration Number */}
                  <div className="w-3/6">
                    <label
                      htmlFor="registrationNo"
                      className="block text-sm font-semibold text-gray-600"
                    >
                      Registration Number
                    </label>
                    <input
                      type="text"
                      name="registrationNo"
                      id="registrationNo"
                      placeholder="Enter registration number"
                      value={Data.registrationNo}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-3/6">
                    <label
                      htmlFor="specialization"
                      className="block text-sm font-semibold text-gray-600"
                    >
                      Specialization
                    </label>
                    <input
                      type="text"
                      name="specialization"
                      id="specialization"
                      placeholder="Enter specialization"
                      value={Data.specialization}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                  </div>

                  <div className="w-3/6">
                    <label
                      htmlFor="qualification"
                      className="block text-sm font-semibold text-gray-600"
                    >
                      Qualification
                    </label>
                    <input
                      type="text"
                      name="qualification"
                      id="qualification"
                      placeholder="Enter qualification"
                      value={Data.qualification}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-3/6">
                    <label
                      htmlFor="experience"
                      className="block text-sm font-semibold text-gray-600"
                    >
                      Experience
                    </label>
                    <input
                      type="text"
                      name="experience"
                      id="experience"
                      placeholder="Enter experience"
                      value={Data.experience}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                  </div>

                  <div className="w-3/6">
                    <label
                      htmlFor="OpdNo"
                      className="block text-sm font-semibold text-gray-600"
                    >
                      OPD Number
                    </label>
                    <input
                      type="text"
                      name="OpdNo"
                      id="OpdNo"
                      placeholder="Enter OPD Number"
                      value={Data.OpdNo}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="languages"
                    className="block text-sm font-semibold text-gray-600"
                  >
                    Languages
                  </label>
                  <input
                    type="text"
                    name="languages"
                    id="languages"
                    placeholder="Enter languages"
                    value={Data.languages}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                </div>
              </>
            )}

            <div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:outline-none transition duration-300"
              >
                Add Staff
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
              Staff Added Successfully
            </h2>
            <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Staff Credentials
              </h3>
              <p className="mb-1">
                <span className="font-bold text-gray-800">Username:</span>{" "}
                {staffCredentials.username}
              </p>
              <p>
                <span className="font-bold text-gray-800">Password:</span>{" "}
                {staffCredentials.password}
              </p>
            </div>
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

export default AddStaff;
