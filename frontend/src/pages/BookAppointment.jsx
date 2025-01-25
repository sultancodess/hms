import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AppointmentForm = () => {
  const [doctors, setDoctors] = useState([]);
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
    const [patientCondition, setPatientCondition] = useState("");

  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [status, setStatus] = useState("waiting");

 const [isModalOpen, setIsModalOpen] = useState(false);

 const openModal = () => {
   setIsModalOpen(true);
 };

 const closeModal = () => {
   setIsModalOpen(false);
 };


  const headers = {
    id: localStorage.getItem("userId"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  // Fetch doctors and patient data
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-doctor-data"
        );
        setDoctors(response.data.doctors || []);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    const fetchPatient = async () => {
      const patientIdFromStorage = localStorage.getItem("userId");
     
      try {
        const response = await axios.get(
          `http://localhost:1000/api/v1/patient/${patientIdFromStorage}`
        );
        const patient = response.data.patient || {};
        setPatientName(patient.name || "");
        setPatientAge(patient.age || "");
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchDoctors();
    fetchPatient();
  }, []);

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const appointmentData = {
      doctorId: selectedDoctorId,
      patientName,
      patientAge,
      patientCondition,
      status,
    };

    try {
      const response = await axios.post(
        "http://localhost:1000/api/v1/book-appointment",
        appointmentData,
        {headers}
      );
      toast.success("Appointment booked successfully!");
      openModal(true);
      console.log("Appointment response:", response.data);
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book the appointment.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Book an Appointment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Patient Name Field */}
        <div className="flex flex-col">
          <label htmlFor="patientName" className="text-gray-700 mb-1">
            Patient Name:
          </label>
          <input
            type="text"
            id="patientName"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        {/* Patient Age Field */}
        <div className="flex flex-col">
          <label htmlFor="patientAge" className="text-gray-700 mb-1">
            Patient Age:
          </label>
          <input
            type="number"
            id="patientAge"
            value={patientAge}
            onChange={(e) => setPatientAge(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="patientAge" className="text-gray-700 mb-1">
            Condition:
          </label>
          <input
            type="text"
            id="condition"
            value={patientCondition}
            onChange={(e) => setPatientCondition(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        {/* Doctor Selection Field */}
        <div className="flex flex-col">
          <label htmlFor="doctor" className="text-gray-700 mb-1">
            Doctor:
          </label>
          <select
            id="doctor"
            value={selectedDoctorId}
            onChange={(e) => setSelectedDoctorId(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          >
            <option value="">Select a doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor._id} value={doctor._id}>
                {doctor.name || "Unknown Doctor"} -{" "}
                {doctor.specialization || "Specialization not provided"}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
        >
          Book Appointment
        </button>
      </form>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-96 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl flex flex-col items-center justify-center font-bold text-center text-green-500">
              <img src="/assets/check.png" alt="check" className="w-24 mb-3" />
              Booking Successful!
            </h2>
            <p className="mt-4 text-center text-gray-700">
              Your appointment has been successfully booked.
            </p>
            <div className="mt-6 flex justify-center">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
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

export default AppointmentForm;
