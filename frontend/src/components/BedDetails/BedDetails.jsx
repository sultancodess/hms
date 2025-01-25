import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../BackBtn/BackButton";

const BedDetails = () => {
  const { roomId, bedId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [patientData, setPatientData] = useState(null);

  useEffect(() => {
    const fetchBedDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1000/api/v1/view-bed-details/${roomId}/${bedId}`
        );

        setData(response.data);
        setLoading(false);

        if (response.data.isOccupied && response.data.occupant) {
          const patientResponse = await axios.get(
            `http://localhost:1000/api/v1/patient/${response.data.occupant}`
          );
          setPatientData(patientResponse.data.patient);
        }
      } catch (err) {
        setError("Error fetching bed details");
        setLoading(false);
      }
    };

    fetchBedDetails();
  }, [roomId, bedId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center text-red-500">
        <p className="text-lg">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition duration-200"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-[75vh] bg-gray-100">
    
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <BackButton />
        <h2 className="text-2xl font-bold text-blue-600 border-b pb-2 mb-4">
          Bed Details
        </h2>
        {data ? (
          <>
            <div className="mb-4">
              <p className="text-lg">
                <span className="font-semibold">Bed Number:</span>{" "}
                {data.bedNumber}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Occupied:</span>{" "}
                {data.isOccupied ? "Yes" : "No"}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Occupant ID:</span>{" "}
                {data.occupant || "None"}
              </p>
            </div>

            {data.isOccupied && patientData ? (
              <div>
                <h3 className="text-xl font-bold text-gray-700 border-t pt-2 mt-4">
                  Patient Details
                </h3>
                <p className="text-lg">
                  <span className="font-semibold">Name:</span>{" "}
                  {patientData.name}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Age:</span>{" "}
                  {patientData.age || "N/A"}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Gender:</span>{" "}
                  {patientData.gender || "N/A"}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Condition:</span>{" "}
                  {patientData.condition || "N/A"}
                </p>
              
              
                <p className="text-lg">
                  <span className="font-semibold">Admission Date:</span>{" "}
                  {patientData.admissionDate
                    ? new Date(patientData.admissionDate).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            ) : (
              <p className="text-lg text-gray-500">
                No patient data available.
              </p>
            )}
          </>
        ) : (
          <p className="text-lg text-gray-500">
            No data available for this bed.
          </p>
        )}
      </div>
    </div>
  );
};

export default BedDetails;
