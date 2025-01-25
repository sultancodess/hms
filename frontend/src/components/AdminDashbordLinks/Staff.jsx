import React, { useEffect, useState } from "react";
import {
  FaDownload,
  FaFilter,
  FaChevronLeft,
  FaChevronRight,
  FaEdit,
  FaTrash,
  FaStethoscope,
  FaUser,
} from "react-icons/fa";
import { MdPerson } from "react-icons/md";
import axios from "axios";
import Avatar from "react-avatar";
import { TbRefresh } from "react-icons/tb";
import toast from "react-hot-toast";


const Staff = () => {
  const [activeTab, setActiveTab] = useState("Doctors");
  const [doctorData, setDoctorData] = useState([]);
  const [receptionistData, setReceptionistData] = useState([]);
  const [adminsData, setAdminsData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState({
   
    name: "",
    email: "",
    phone: "",
    role: "",
    avatar: "",
    OpdNo: "",
    department: "",
    specialization: "",

  });


   useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1000/api/v1/get-doctor-data`
        );
        if (Array.isArray(response.data.doctors)) {
          setDoctorData(response.data.doctors);
        } else {
          console.error("Expected an array but got:", response.data);
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchDoctors();

    const fetchReceptionist = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1000/api/v1/get-receptionist-data`
        );
        if (Array.isArray(response.data.receptionist)) {
          setReceptionistData(response.data.receptionist);
        } else {
          console.error("Expected an array but got:");
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };
    fetchReceptionist();

     const fetchAdmins = async () => {
       try {
         const response = await axios.get(
           `http://localhost:1000/api/v1/admins`
         );
         if (Array.isArray(response.data.admins)) {
           console.log(response.data.admins)
           setAdminsData(response.data.admins);
         } else {
           console.error("Expected an array but got:", response.data);
         }
       } catch (error) {
         console.error("Error fetching admins data:", error);
       }
     };

     fetchAdmins();
  }, []);

    const handleDoctorRefresh = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1000/api/v1/get-doctor-data`
        );
        if (Array.isArray(response.data.doctors)) {
          setDoctorData(response.data.doctors);
          toast.success("Refreshed Doctor Data");
        } else {
          console.error("Expected an array but got:", response.data.doctors);
        }
      } catch (error) {
        console.error("Error refreshing doctors data:", error);
      }
  };
  
      const handleReceptionistRefresh = async () => {
        try {
          const response = await axios.get(
            `http://localhost:1000/api/v1/get-receptionist-data`
          );
          if (Array.isArray(response.data.receptionist)) {
            setReceptionistData(response.data.receptionist);
            toast.success("Refreshed Receptionist Data");
          } else {
            console.error(
              "Expected an array but got:",
              response.data.receptionist
            );
          }
        } catch (error) {
          console.error("Error refreshing receptionist data:", error);
        }
  };
  
   const handleAdminsRefresh = async () => {
     try {
       const response = await axios.get(
         `http://localhost:1000/api/v1/admins`
       );
       if (Array.isArray(response.data.admins)) {
         setAdminsData(response.data.admins);
         toast.success("Refreshed Admins Data");
       } else {
         console.error(
           "Expected an array but got:",
           response.data.admins
         );
       }
     } catch (error) {
       console.error("Error refreshing admins data:", error);
     }
   };


const openEditModal = (staff, staffType) => {
  setSelectedStaff({ ...staff, type: staffType }); 
    console.log("Selected staff for edit:", staff._id);
  setIsModalOpen(true);
};

const closeModal = () => {
  setIsModalOpen(false);
  setSelectedStaff(null);
};

const openDeleteModal = (staff, staffType) => {
  setSelectedStaff({ ...staff, type: staffType }); 
  setDeleteModalOpen(true);
};

const closeDeleteModal = () => {
  setDeleteModalOpen(false);
  setSelectedStaff(null);
  };
  
  const handleEditStaff = async (e) => {
      e.preventDefault();
      console.log("Selected staff object:", selectedStaff); // Log the object to see its structure
    
      

    try {
      const { id, type, ...staffDetails } = selectedStaff;
     
     const headers = {
          id: localStorage.getItem("userId"),
          authorization: `Bearer ${localStorage.getItem("token")}`,
        };

      let endpoint = "";
      if (type === "Doctor") {
        endpoint = `http://localhost:1000/api/v1/update-staff/${staffDetails._id}`;
      } else if (type === "Receptionist") {
        endpoint = `http://localhost:1000/api/v1/update-staff/${staffDetails._id}`;
      } else if (type === "Admin") {
        endpoint = `http://localhost:1000/api/v1/update-admin/${staffDetails._id}`;
      }

      const response = await axios.put(endpoint, staffDetails,{headers});

      if (response.status === 200) {
        toast.success(`${type} data updated successfully`);
      
        if (type === "Doctor") {
          await handleDoctorRefresh();
        } else if (type === "Receptionist") {
          await handleReceptionistRefresh();
        } else if (type === "Admin") {
          await handleAdminsRefresh();
        }
      }
      closeModal();
    } catch (error) {
      console.error(`Error updating ${selectedStaff.type} data:`, error);
      toast.error(`Failed to update ${selectedStaff.type} data`);
    } 
  };

  const handleDeleteStaff = async () => {
    if (!selectedStaff) return;

    try {
      const { type } = selectedStaff;

      const headers = {
        id: localStorage.getItem("userId"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      let endpoint = "";
      if (type === "Doctor" || type === "Receptionist") {
        endpoint = `http://localhost:1000/api/v1/delete-staff/${selectedStaff._id}`;
     } else if (type === "Admin") {
        endpoint = `http://localhost:1000/api/v1/delete-admin/${selectedStaff._id}`;
      }

      const response = await axios.delete(endpoint,{headers});

      if (response.status === 200) {
        toast.success(`${type} data deleted successfully`);
  
        if (type === "Doctor") {
          await handleDoctorRefresh();
        } else if (type === "Receptionist") {
          await handleReceptionistRefresh();
        } else if (type === "Admin") {
          await handleAdminsRefresh();
        }
      }
    } catch (error) {
      console.error(`Error deleting ${selectedStaff.type} data:`, error);
      toast.error(`Failed to delete ${selectedStaff.type} data`);
    } finally {
      closeDeleteModal();
    }
  };


  return (
    <div className="w-full h-[85vh] bg-gray-50 p-3">
      <div className="w-full h-full bg-white rounded-xl min-h-[80vh] ">
        <div className="p-6 min-h-screen">
          <h1 className="text-3xl font-semibold text-blue-500 mb-5">
            Staff Management
          </h1>
          {/* Tabs */}
          <div className="flex justify-start space-x-2 mb-8 p-2 bg-gray-100 rounded-lg">
            {["Doctors", "Receptionist", "Admins"].map((tab) => (
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
          {activeTab === "Doctors" && (
            <>
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                  <span className="p-2 bg-gray-100 rounded">
                    <FaStethoscope size={15} />
                  </span>
                  {doctorData.length}{" "}
                  <span className="text-xs text-gray-500">Doctors</span>
                </h1>
                <div className="flex space-x-4">
                  <button
                    className="bg-gray-200 text-gray-500 px-3 py-1 text-sm rounded-md hover:bg-gray-300 hover:text-gray-600 flex items-center"
                    onClick={handleDoctorRefresh} // Use the refresh function here
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

              <div className="bg-white rounded-lg shadow-lg overflow-x-scroll">
                <table className="min-w-full table-auto ">
                  <thead className="bg-gray-200 text-gray-600 text-semibold capitalize text-xs">
                    <tr>
                      <th className="py-3 px-6  text-left">Profile</th>
                      <th className="py-3 px-6 text-left">Name</th>
                      <th className="py-3 px-6 text-left">Registration No</th>
                      <th className="py-3 px-6 text-left">Specialization</th>
                      <th className="py-3 px-6 text-left">OPD No</th>
                      <th className="py-3 px-6 text-left">Phone No</th>
                      <th className="py-3 px-6 text-left">Status</th>
                      <th className="py-3 px-6 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700 text-sm ">
                    {doctorData &&
                      doctorData.map((doctor, index) => (
                        <tr
                          key={index}
                          className={`${
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          } border-b hover:bg-gray-100`}
                        >
                          <td className="py-3 px-6">
                            {" "}
                            <div className="flex items-center space-x-3 cursor-pointer">
                              <Avatar
                                name={doctor?.name}
                                src={doctor?.avatar}
                                round={true}
                                size="40"
                              />
                            </div>
                          </td>
                          <td className="py-3 px-6">{doctor.name}</td>
                          <td className="py-3 px-6">{doctor.registrationNo}</td>
                          <td className="py-3 px-6">{doctor.specialization}</td>
                          <td className="py-3 px-6">{doctor.OpdNo}</td>
                          <td className="py-3 px-6">{doctor.phone}</td>
                          <td
                            className={`py-3 px-6 capitalize flex items-center justify-center`}
                          >
                            <span
                              className={`px-2 py-1 rounded-lg font-semibold text-sm ${
                                doctor.status === "active"
                                  ? "text-green-600 bg-green-300"
                                  : "text-red-600 bg-red-300"
                              } `}
                            >
                              {doctor.status}
                            </span>
                          </td>
                          <td className="py-3 px-6 text-center">
                            <div className="flex items-center gap-3 text-lg">
                              <button
                                onClick={() => openEditModal(doctor, "Doctor")}
                                className="text-gray-400  hover:text-gray-500 hover:cursor-pointer transition-all duration-300"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() =>
                                  openDeleteModal(doctor, "Doctor")
                                }
                                className="text-gray-400  hover:text-gray-500 hover:cursor-pointer transition-all duration-300"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

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

          {activeTab === "Receptionist" && (
            <>
              {" "}
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                  <span className="p-2 bg-gray-100 rounded">
                    <FaUser size={15} />
                  </span>
                  {receptionistData.length}{" "}
                  <span className="text-xs text-gray-500">Receptionist</span>
                </h1>
                <div className="flex space-x-4">
                  <button
                    className="bg-gray-200 text-gray-500 px-3 py-1 text-sm rounded-md hover:bg-gray-300 hover:text-gray-600 flex items-center"
                    onClick={handleReceptionistRefresh}
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
              <div className="bg-white rounded-lg shadow-lg overflow-x-scroll">
                <table className="min-w-full table-auto">
                  <thead className="bg-gray-200 text-gray-600 text-semibold capitalize text-xs">
                    <tr>
                      <th className="py-3 px-6 text-left">Profile</th>
                      <th className="py-3 px-6 text-left">Name</th>
                      <th className="py-3 px-6 text-left">Phone No</th>
                      <th className="py-3 px-6 text-left">Email</th>
                      <th className="py-3 px-6 text-left">Username</th>
                      <th className="py-3 px-6 text-left">Status</th>
                      <th className="py-3 px-6 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700 text-sm">
                    {receptionistData &&
                      receptionistData.map((receptionist, index) => (
                        <tr
                          key={index}
                          className={`${
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          } border-b`}
                        >
                          <td className="py-3 px-6">
                            {" "}
                            <div className="flex items-center space-x-3 cursor-pointer">
                              <Avatar
                                name={receptionist?.name}
                                src={receptionist?.avatar}
                                round={true}
                                size="40"
                              />
                            </div>
                          </td>
                          <td className="py-3 px-6">{receptionist.name}</td>
                          <td className="py-3 px-6">{receptionist.phone}</td>
                          <td className="py-3 px-6">{receptionist.email}</td>
                          <td className="py-3 px-6">{receptionist.username}</td>
                          <td
                            className={`py-3 px-6 capitalize flex items-center justify-center`}
                          >
                            <span
                              className={`px-2 py-1 rounded-lg font-semibold text-sm ${
                                receptionist.status === "active"
                                  ? "text-green-600 bg-green-300"
                                  : "text-red-600 bg-red-300"
                              } `}
                            >
                              {receptionist.status}
                            </span>
                          </td>
                          <td className="py-3 px-6 text-center">
                            <div className="flex items-center gap-3 text-lg">
                              <button
                                onClick={() =>
                                  openEditModal(receptionist, "Receptionist")
                                }
                                className="text-gray-400  hover:text-gray-500 hover:cursor-pointer transition-all duration-300"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() =>
                                  openDeleteModal(receptionist, "Receptionist")
                                }
                                className="text-gray-400  hover:text-gray-500 hover:cursor-pointer transition-all duration-300"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
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

          {activeTab === "Admins" && (
            <>
              {" "}
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                  <span className="p-2 bg-gray-100 rounded">
                    <FaUser size={15} />
                  </span>
                  {adminsData.length}{" "}
                  <span className="text-xs text-gray-500">Admins</span>
                </h1>
                <div className="flex space-x-4">
                  <button
                    className="bg-gray-200 text-gray-500 px-3 py-1 text-sm rounded-md hover:bg-gray-300 hover:text-gray-600 flex items-center"
                    onClick={handleAdminsRefresh}
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
              <div className="bg-white rounded-lg shadow-lg overflow-x-scroll">
                <table className="min-w-full table-auto">
                  <thead className="bg-gray-200 text-gray-600 text-semibold capitalize text-xs">
                    <tr>
                      <th className="py-3 px-6 text-left">Profile</th>
                      <th className="py-3 px-6 text-left">Name</th>
                      <th className="py-3 px-6 text-left">Phone No</th>
                      <th className="py-3 px-6 text-left">Email</th>
                      <th className="py-3 px-6 text-left">Username</th>
                      <th className="py-3 px-6 text-left">Status</th>
                      <th className="py-3 px-6 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700 text-sm">
                    {adminsData &&
                      adminsData.map((admin, index) => (
                        <tr
                          key={index}
                          className={`${
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          } border-b`}
                        >
                          <td className="py-3 px-6">
                            {" "}
                            <div className="flex items-center space-x-3 cursor-pointer">
                              <Avatar
                                name={admin?.name}
                                src={admin?.avatar}
                                round={true}
                                size="40"
                              />
                            </div>
                          </td>
                          <td className="py-3 px-6">{admin.name}</td>
                          <td className="py-3 px-6">{admin.phone}</td>
                          <td className="py-3 px-6">{admin.email}</td>
                          <td className="py-3 px-6">{admin.username}</td>
                          <td
                            className={`py-3 px-6 capitalize flex items-center justify-center`}
                          >
                            <span
                              className={`px-2 py-1 rounded-lg font-semibold text-sm ${
                                admin.status === "active"
                                  ? "text-green-600 bg-green-300"
                                  : "text-red-600 bg-red-300"
                              } `}
                            >
                              {admin.status}
                            </span>
                          </td>
                          <td className="py-3 px-6 text-center">
                            <div className="flex items-center gap-3 text-lg">
                              <button
                                onClick={() => openEditModal(admin, "Admin")}
                                className="text-gray-400  hover:text-gray-500 hover:cursor-pointer transition-all duration-300"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => openDeleteModal(admin, "Admin")}
                                className="text-gray-400  hover:text-gray-500 hover:cursor-pointer transition-all duration-300"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
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
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 z-50 mt-28 h-fit max-h-[70vh]">
            <h2 className="text-xl font-bold mb-4 text-gray-700">
              Edit {selectedStaff.type} Details
            </h2>
            <form onSubmit={handleEditStaff}>
              <div className="p-3 w-full h-fit max-h-[50vh] overflow-y-scroll shadow-inner">
                <div className="flex gap-3">
                  <div className="mb-4 w-3/6">
                    <label className="block text-gray-700 mb-2" htmlFor="name">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={selectedStaff?.name || ""}
                      onChange={(e) =>
                        setSelectedStaff({
                          ...selectedStaff,
                          name: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-md p-2"
                      required
                    />
                  </div>
                  <div className="mb-4 w-3/6">
                    <label className="block text-gray-700 mb-2" htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={selectedStaff?.email || ""}
                      onChange={(e) =>
                        setSelectedStaff({
                          ...selectedStaff,
                          email: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-md p-2"
                      required
                    />
                  </div>
                </div>
                {selectedStaff?.type === "Doctor" && (
                  <>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 mb-2"
                        htmlFor="specialization"
                      >
                        Specialization
                      </label>
                      <input
                        id="specialization"
                        type="text"
                        value={selectedStaff?.specialization || ""}
                        onChange={(e) =>
                          setSelectedStaff({
                            ...selectedStaff,
                            specialization: e.target.value,
                            new: true,
                          })
                        }
                        className="w-full border border-gray-300 rounded-md p-2"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        className="block text-gray-700 mb-2"
                        htmlFor="department"
                      >
                        Registration No
                      </label>
                      <input
                        id="registrationNo"
                        type="text"
                        value={selectedStaff?.registrationNo || ""}
                        onChange={(e) =>
                          setSelectedStaff({
                            ...selectedStaff,
                            registrationNo: e.target.value,
                            new: true,
                          })
                        }
                        className="w-full border border-gray-300 rounded-md p-2"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        className="block text-gray-700 mb-2"
                        htmlFor="department"
                      >
                        OPD No
                      </label>
                      <input
                        id="OpdNo"
                        type="text"
                        value={selectedStaff?.OpdNo || ""}
                        onChange={(e) =>
                          setSelectedStaff({
                            ...selectedStaff,
                            OpdNo: e.target.value,
                            new: true,
                          })
                        }
                        className="w-full border border-gray-300 rounded-md p-2"
                        required
                      />
                    </div>
                  </>
                )}

                <div className="flex gap-3">
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="role">
                      Role
                    </label>
                    <input
                      id="role"
                      type="text"
                      value={selectedStaff?.role || ""}
                      onChange={(e) =>
                        setSelectedStaff({
                          ...selectedStaff,
                          role: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-md p-2"
                      required
                    />
                  </div>
                </div>
                {/* Contact Number */}
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="contact">
                    Contact Number
                  </label>
                  <input
                    id="phone"
                    type="text"
                    value={selectedStaff?.phone || ""}
                    onChange={(e) =>
                      setSelectedStaff({
                        ...selectedStaff,
                        phone: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                </div>
              </div>
              {/* Buttons */}
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
              Are you sure you want to delete the staff member{" "}
              <strong>{selectedStaff?.name}</strong>?
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
                    await handleDeleteStaff(selectedStaff?._id);
                  } catch (error) {
                    console.error("Error deleting staff:", error);
                    alert("An error occurred while deleting the staff member.");
                  }
                }}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Staff;

