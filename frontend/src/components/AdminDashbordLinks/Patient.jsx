import React, { useEffect, useState } from "react";
import {
  FaDownload,
  FaFilter,
  FaChevronLeft,
  FaChevronRight,
  FaEdit,
  FaTrashAlt,
  FaUser,
} from "react-icons/fa";
import { MdPerson } from "react-icons/md";
import axios from "axios";
import Avatar from "react-avatar";
import { TbRefresh } from "react-icons/tb";
import toast from "react-hot-toast";
import Modal from "react-modal";

const Patient = () => {
  const [activeTab, setActiveTab] = useState("Patients");
  const [patientData, setPatientData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Corrected useEffect to use an async function inside
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1000/api/v1/patients`
        );
        if (Array.isArray(response.data.patients)) {
          setPatientData(response.data.patients);
        } else {
          console.error("Expected an array but got:", response.data.patients);
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchPatients();
  }, []);

  

  // Function to refresh the patient list
  const handleRefresh = async () => {
    try {
      const response = await axios.get(`http://localhost:1000/api/v1/patients`);
      console.log("Refreshed Data:", response.data); // Debugging the refreshed data
      if (Array.isArray(response.data.patients)) {
        setPatientData(response.data.patients);
        toast.success("Refreshed Patient Data")
      } else {
        console.error("Expected an array but got:", response.data.patients);
      }
    } catch (error) {
      console.error("Error refreshing patient data:", error);
    }
  };

    const openEditModal = (patient) => {
      setSelectedPatient(patient);
      setIsModalOpen(true);
  };
    
  
   const closeModal = () => {
     setIsModalOpen(false);
     setSelectedPatient(null);
  };
  const openDeleteModal = (patient) => {
        setSelectedPatient(patient);
        setDeleteModalOpen(true);
  };
     const closeDeleteModal = () => {
       setDeleteModalOpen(false);
       setSelectedPatient(null);
     };
  
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send updated patient details to the server
      await axios.put(
        `http://localhost:1000/api/v1/update-patient/${selectedPatient._id}`,
        selectedPatient
      );
      toast.success("Patient details updated successfully");
      setIsModalOpen(false);

      // Optionally refresh patient data here
    } catch (error) {
      console.error("Error updating patient details:", error);
      toast.error("Failed to update patient");
    }
  };

  const handleDeletePatient = async (e) => {
   
   try {
     // Send updated patient details to the server
     await axios.delete(
       `http://localhost:1000/api/v1/delete-patient/${selectedPatient._id}`,
       selectedPatient
     );
     toast.success("Patient Deleted successfully");
     setDeleteModalOpen(false);

     // Optionally refresh patient data here
   } catch (error) {
     console.error("Error Deleting patient details:", error);
     toast.error("Failed to delete patient");
   }
  }

  return (
    <div className="w-full h-[85vh] bg-gray-50 p-3">
      <div className="w-full h-full bg-white rounded-xl overflow-y-scroll">
        <div className="p-6 min-h-screen">
          <h1 className="text-3xl font-semibold text-blue-500 mb-5">
            Patient Management
          </h1>
          {/* Tabs */}
          <div className="flex justify-start space-x-2 mb-8 p-2 bg-gray-100 rounded-lg">
            {["Overview", "Patients", "Hospital", "Doctors"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-md font-medium ${
                  activeTab === tab
                    ? "bg-blue-500 text-white"
                    : "text-gray-500 hover:bg-gray-200"
                }`}
              >
                <MdPerson className="inline-block mr-2" />
                {tab}
              </button>
            ))}
          </div>

          {/* Content for Active Tab */}
          {activeTab === "Patients" && (
            <>
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
                  <span className="p-2 bg-gray-100 rounded">
                    <FaUser size={15} />
                  </span>
                  {patientData.length}{" "}
                  <span className="text-xs text-gray-500">Patients</span>
                </h1>
                <div className="flex space-x-4">
                  <button
                    className="bg-gray-200 text-gray-500 px-3 py-1 text-sm rounded-md hover:bg-gray-300 hover:text-gray-600 flex items-center"
                    onClick={handleRefresh} // Use the refresh function here
                  >
                    <TbRefresh className="mr-2" />
                    Refresh
                  </button>
                  <button className="bg-blue-500 text-white px-3 py-1 text-sm rounded-md flex items-center">
                    <FaDownload className="mr-2" />
                    Download Report
                  </button>
                  <button className="border border-gray-300 px-3 py-1 text-sm rounded-md flex items-center">
                    <FaFilter className="mr-2" />
                    Filter
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <table className="min-w-full table-auto">
                  <thead className="bg-gray-200 text-gray-600 uppercase text-sm">
                    <tr>
                      <th className="py-3 px-6 text-left">Profile</th>
                      <th className="py-3 px-6 text-left">Name</th>
                      <th className="py-3 px-6 text-left">Date</th>
                      <th className="py-3 px-6 text-left">Email</th>
                      <th className="py-3 px-6 text-left">Username</th>
                      <th className="py-3 px-6 text-left">Status</th>
                      <th className="py-3 px-6 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700 text-sm">
                    {patientData &&
                      patientData.map((patient, index) => (
                        <tr
                          key={index}
                          className={`${
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          } border-b`}
                        >
                          <td className="py-3 px-6">
                            <div className="w-10 h-10 rounded overflow-hidden">
                              <Avatar
                                name={patient?.name}
                                src={patient?.avatarURL}
                                size="40"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </td>
                          <td className="py-3 px-6">{patient.name}</td>
                          <td className="py-3 px-6">{patient.createdAt}</td>
                          <td className="py-3 px-6">{patient.email}</td>
                          <td className="py-3 px-6">{patient.username}</td>
                          <td
                            className={`py-3 px-6 capitalize flex items-center justify-center`}
                          >
                            <span
                              className={`px-2 py-1 rounded-lg font-semibold text-sm ${
                                patient.status === "active"
                                  ? "text-green-600 bg-green-300"
                                  : "text-red-600 bg-red-300"
                              } `}
                            >
                              {patient.status}
                            </span>
                          </td>
                          <td className="py-3 px-6 text-center">
                            <div className="flex items-center gap-3 text-lg">
                              <button
                                className="text-gray-400  hover:text-gray-500 hover:cursor-pointer transition-all duration-300 "
                                onClick={() => openEditModal(patient)}
                              >
                                <FaEdit />
                              </button>
                              <button
                                className="text-gray-400   hover:text-gray-500 hover:cursor-pointer transition-all duration-300"
                                onClick={() => openDeleteModal(patient)}
                              >
                                <FaTrashAlt />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>

                {/* Modal Component */}
                {isModalOpen && (
                  <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 ">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 z-50 mt-28">
                      <h2 className="text-xl font-bold mb-4 text-gray-700">
                        Edit Patient
                      </h2>
                      <form onSubmit={handleEditSubmit}>
                        {/* Name */}
                        <div className="flex gap-3">
                          <div className="mb-4 w-3/6">
                            <label
                              className="block text-gray-700 mb-2"
                              htmlFor="name"
                            >
                              Name
                            </label>
                            <input
                              id="name"
                              type="text"
                              value={selectedPatient?.name || ""}
                              onChange={(e) =>
                                setSelectedPatient({
                                  ...selectedPatient,
                                  name: e.target.value,
                                })
                              }
                              className="w-full border border-gray-300 rounded-md p-2"
                              required
                            />
                          </div>

                          {/* Email */}
                          <div className="mb-4 w-3/6">
                            <label
                              className="block text-gray-700 mb-2"
                              htmlFor="email"
                            >
                              Email
                            </label>
                            <input
                              id="email"
                              type="email"
                              value={selectedPatient?.email || ""}
                              onChange={(e) =>
                                setSelectedPatient({
                                  ...selectedPatient,
                                  email: e.target.value,
                                })
                              }
                              className="w-full border border-gray-300 rounded-md p-2"
                              required
                            />
                          </div>
                        </div>
                        <div className="flex gap-3">
                          {/* Age */}
                          <div className="mb-4">
                            <label
                              className="block text-gray-700 mb-2"
                              htmlFor="age"
                            >
                              Age
                            </label>
                            <input
                              id="age"
                              type="number"
                              value={selectedPatient?.age || ""}
                              onChange={(e) =>
                                setSelectedPatient({
                                  ...selectedPatient,
                                  age: e.target.value,
                                })
                              }
                              className="w-56 border border-gray-300 rounded-md p-2"
                              min="0"
                            />
                          </div>

                          {/* Gender */}
                          <div className="mb-4">
                            <label
                              className="block text-gray-700 mb-2"
                              htmlFor="gender"
                            >
                              Gender
                            </label>
                            <select
                              id="gender"
                              value={selectedPatient?.gender || ""}
                              onChange={(e) =>
                                setSelectedPatient({
                                  ...selectedPatient,
                                  gender: e.target.value,
                                })
                              }
                              className="w-60 border border-gray-300 rounded-md p-2"
                            >
                              <option value="">Select Gender</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                            </select>
                          </div>

                          {/* Weight */}
                          <div className="mb-4">
                            <label
                              className="block text-gray-700 mb-2"
                              htmlFor="weight"
                            >
                              Weight (kg)
                            </label>
                            <input
                              id="weight"
                              type="number"
                              value={selectedPatient?.weight || ""}
                              onChange={(e) =>
                                setSelectedPatient({
                                  ...selectedPatient,
                                  weight: e.target.value,
                                })
                              }
                              className="w-56 border border-gray-300 rounded-md p-2"
                              min="0"
                            />
                          </div>
                        </div>
                        {/* Address */}
                        <label className="block text-gray-700 mb-2">
                          Address
                        </label>
                        <div className="mb-4">
                          <div className="flex gap-3">
                            <input
                              type="text"
                              placeholder="Street"
                              value={selectedPatient?.street || ""}
                              onChange={(e) =>
                                setSelectedPatient({
                                  ...selectedPatient,
                                  street: e.target.value,
                                })
                              }
                              className="w-full border border-gray-300 rounded-md p-2 mb-2"
                            />
                            <input
                              type="text"
                              placeholder="City"
                              value={selectedPatient?.city || ""}
                              onChange={(e) =>
                                setSelectedPatient({
                                  ...selectedPatient,
                                  city: e.target.value,
                                })
                              }
                              className="w-full border border-gray-300 rounded-md p-2 mb-2"
                            />
                            <input
                              type="text"
                              placeholder="Country"
                              value={selectedPatient?.country || ""}
                              onChange={(e) =>
                                setSelectedPatient({
                                  ...selectedPatient,
                                  country: e.target.value,
                                })
                              }
                              className="w-full border border-gray-300 rounded-md p-2 mb-2"
                            />
                          </div>
                          <div className="flex gap-3">
                            <input
                              type="text"
                              placeholder="State"
                              value={selectedPatient?.state || ""}
                              onChange={(e) =>
                                setSelectedPatient({
                                  ...selectedPatient,

                                  state: e.target.value,
                                })
                              }
                              className="w-full border border-gray-300 rounded-md p-2 mb-2"
                            />
                            <input
                              type="text"
                              placeholder="Postal Code"
                              value={selectedPatient?.postalCode || ""}
                              onChange={(e) =>
                                setSelectedPatient({
                                  ...selectedPatient,

                                  postalCode: e.target.value,
                                })
                              }
                              className="w-full border border-gray-300 rounded-md p-2 mb-2"
                            />
                          </div>
                        </div>
                        {/* Date of Birth */}
                        <div className="flex gap-3">
                          <div className="mb-4">
                            <label
                              className="block text-gray-700 mb-2"
                              htmlFor="dob"
                            >
                              Date of Birth
                            </label>
                            <input
                              id="dob"
                              type="date"
                              value={selectedPatient?.dateOfBirth || ""}
                              onChange={(e) =>
                                setSelectedPatient({
                                  ...selectedPatient,
                                  dateOfBirth: e.target.value,
                                })
                              }
                              className="w-full border border-gray-300 rounded-md p-2"
                            />
                          </div>

                          {/* Status */}
                          <div className="mb-4">
                            <label
                              className="block text-gray-700 mb-2"
                              htmlFor="status"
                            >
                              Status
                            </label>
                            <select
                              id="status"
                              value={selectedPatient?.status || "inactive"}
                              onChange={(e) =>
                                setSelectedPatient({
                                  ...selectedPatient,
                                  status: e.target.value,
                                })
                              }
                              className="w-full border border-gray-300 rounded-md p-2"
                            >
                              <option value="active">Active</option>
                              <option value="inactive">Inactive</option>
                            </select>
                          </div>
                        </div>

                        <div className="flex justify-end space-x-3 mt-4">
                          <button
                            type="button"
                            onClick={closeModal}
                            className="bg-gray-300 px-4 py-2 rounded"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            onClick={handleRefresh}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                          >
                            Save
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {isDeleteModalOpen && (
                  <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                      <h2 className="text-xl font-bold mb-4 text-gray-700">
                        Confirm Deletion
                      </h2>
                      <p className="text-gray-700 mb-4">
                        Are you sure you want to delete the patient{" "}
                        <strong>{selectedPatient?.name}</strong>?
                      </p>
                      <p className="text-sm text-gray-500 mb-6">
                        This action cannot be undone.
                      </p>
                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          onClick={closeDeleteModal}
                          className="bg-gray-300 px-4 py-2 rounded"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={async () => {
                            try {
                              await handleDeletePatient(selectedPatient?._id);
                              handleRefresh(); // Refresh after deletion
                            } catch (error) {
                              console.error("Error deleting patient:", error);
                              alert(
                                "An error occurred while deleting the patient."
                              );
                            }
                          }}
                          className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                          Delete
                        </button>{" "}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* Pagination */}
              <div className="flex justify-between items-center py-4">
                <p className="text-gray-600">Page 1 of 8</p>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 border border-gray-300 rounded-md flex items-center">
                    <FaChevronLeft className="mr-2" />
                    Prev
                  </button>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-md flex items-center">
                    <FaChevronRight className="mr-2" />
                    Next
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Placeholder for Other Tabs */}
          {activeTab !== "Patients" && (
            <div className="text-center text-gray-600">
              <h2 className="text-xl font-bold">{activeTab} Section</h2>
              <p>Content for the {activeTab} tab will go here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Patient;
