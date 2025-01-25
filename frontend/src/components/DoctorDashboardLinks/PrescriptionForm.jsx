import React, { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf"; // Import jsPDF for generating PDF
import toast from "react-hot-toast";
import "jspdf-autotable";

const PrescriptionForm = ({ patientId, doctorId, selectedPatient }) => {
  const [medicines, setMedicines] = useState([
    { name: "", dosage: "", frequency: "", duration: "", notes: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submittedPrescription, setSubmittedPrescription] = useState(null);
  const [formVisible, setFormVisible] = useState(true);

  const medicineSuggestions = [
    "Paracetamol",
    "Ibuprofen",
    "Aspirin",
    "Amoxicillin",
    "Metformin",
    "Lisinopril",
    "Cetirizine",
    "Omeprazole",
    "Atorvastatin",
    "Losartan",
  ];

  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);

  const handleMedicineChange = (index, event) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index][event.target.name] = event.target.value;
    setMedicines(updatedMedicines);

    if (event.target.name === "name") {
      const filtered = medicineSuggestions.filter((medicine) =>
        medicine.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    }
  };

  const handleSuggestionClick = (suggestion, index) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index].name = suggestion;
    setMedicines(updatedMedicines);
    setFilteredSuggestions([]); // Clear suggestions after selection
  };

  const addMedicine = () => {
    setMedicines([
      ...medicines,
      { name: "", dosage: "", frequency: "", duration: "", notes: "" },
    ]);
  };

  const removeMedicine = (index) => {
    const updatedMedicines = medicines.filter((_, i) => i !== index);
    setMedicines(updatedMedicines);
  };

  useEffect(() => {
    setFormVisible(true);
  }, [patientId, doctorId]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      patientId,
      doctorId,
      medicines,
    };

    try {
      const response = await axios.post(
        "http://localhost:1000/api/v1/add-prescription",
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 201) {
        setMedicines([
          { name: "", dosage: "", frequency: "", duration: "", notes: "" },
        ]);
        setSubmittedPrescription(response.data.prescription); 
        setFormVisible(false);
        toast.success("Prescription added successfully");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };



const downloadPDF = () => {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(16);
  doc.text("MEDICARE", 20, 20); 
  doc.text("Prescription", 20, 30); 

  // Patient and Doctor Information
  const patientInfo = [
    { label: "Patient ID:", value: submittedPrescription.patientId },
    { label: "Patient Name:", value: selectedPatient.name },
    { label: "Date:", value: new Date().toLocaleDateString() },
    { label: "Time:", value: new Date().toLocaleTimeString() },
    { label: "Doctor ID:", value: submittedPrescription.doctorId },
  ];

  let yOffset = 30; // Initial Y position for the info

  // Loop through the information and position it in two columns
  patientInfo.forEach((info, index) => {
    const x1 = 20; // Left column X position
    const x2 = 110; // Right column X position
    const y = yOffset + Math.floor(index / 2) * 10; // Increment Y every two items

    const x = index % 2 === 0 ? x1 : x2; // Alternate between left and right column
    doc.setFontSize(12);
    doc.text(`${info.label} ${info.value}`, x, y);
  });

  // Adjust Y position for the table
  const startY = yOffset + Math.ceil(patientInfo.length / 2) * 10 + 10;

  // Medicines Table
  const tableColumnHeaders = [
    "#",
    "Medicine Name",
    "Dosage",
    "Frequency",
    "Duration",
    "Notes",
  ];
  const tableRows = submittedPrescription.medicines.map((medicine, index) => [
    index + 1,
    medicine.name,
    medicine.dosage,
    medicine.frequency,
    medicine.duration,
    medicine.notes || "-",
  ]);

  // Add Table
  doc.autoTable({
    head: [tableColumnHeaders],
    body: tableRows,
    startY, // Start position dynamically calculated
    theme: "grid", // Table style (grid, plain, striped)
    headStyles: { fillColor: [22, 160, 133] }, // Header row color
    styles: { fontSize: 10, cellPadding: 4 }, // General styles
  });

  // Save the PDF
  doc.save("prescription.pdf");
};
  return (
    <div className="w-full mx-auto p-3 bg-white shadow-md rounded-lg">
      {formVisible && (
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Add Prescription
          </h2>

          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          <h3 className="text-xl font-semibold mb-4">Medicines</h3>
          {medicines.map((medicine, index) => (
            <div
              key={index}
              className="mb-4 relative p-4 grid grid-cols-4 gap-2 bg-gray-100 rounded-md shadow-sm"
            >
              <div className="mb-4">
                <label className="block text-gray-700">Medicine Name:</label>
                <input
                  type="text"
                  name="name"
                  value={medicine.name}
                  onChange={(e) => handleMedicineChange(index, e)}
                  required
                  className="w-full relative p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {filteredSuggestions.length > 0 && (
                  <ul className="mt-2 absolute z-10 w-[200px] bg-white border border-gray-300 shadow-md rounded-md max-h-40 overflow-y-auto">
                    {filteredSuggestions.map((suggestion, suggestionIndex) => (
                      <li
                        key={suggestionIndex}
                        onClick={() => handleSuggestionClick(suggestion, index)}
                        className={`p-2 cursor-pointer hover:bg-gray-200 ${
                          suggestionIndex === activeSuggestionIndex
                            ? "bg-gray-300"
                            : ""
                        }`}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Dosage:</label>
                <select
                  name="dosage"
                  value={medicine.dosage}
                  onChange={(e) => handleMedicineChange(index, e)}
                  required
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="" disabled>
                    Select Dosage
                  </option>
                  <option value="1mg">1 mg</option>
                  <option value="5mg">5 mg</option>
                  <option value="10mg">10 mg</option>
                  <option value="25mg">25 mg</option>
                  <option value="50mg">50 mg</option>
                  <option value="100mg">100 mg</option>
                  <option value="500mg">500 mg</option>
                  <option value="1g">1 g</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Frequency:</label>
                <select
                  name="frequency"
                  value={medicine.frequency}
                  onChange={(e) => handleMedicineChange(index, e)}
                  required
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="" disabled>
                    Select Frequency
                  </option>
                  <option value="Once a day">Once a day</option>
                  <option value="Twice a day">Twice a day</option>
                  <option value="Thrice a day">Thrice a day</option>
                  <option value="Every 6 hours">Every 6 hours</option>
                  <option value="Every 8 hours">Every 8 hours</option>
                  <option value="As needed">As needed</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Duration:</label>
                <select
                  name="duration"
                  value={medicine.duration}
                  onChange={(e) => handleMedicineChange(index, e)}
                  required
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="" disabled>
                    Select Duration
                  </option>
                  <option value="1 day">1 day</option>
                  <option value="3 days">3 days</option>
                  <option value="5 days">5 days</option>
                  <option value="7 days">7 days</option>
                  <option value="10 days">10 days</option>
                  <option value="2 weeks">2 weeks</option>
                  <option value="1 month">1 month</option>
                  <option value="As advised">As advised</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Notes:</label>
                <select
                  name="notes"
                  value={medicine.notes}
                  onChange={(e) => handleMedicineChange(index, e)}
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="" disabled>
                    Select Notes
                  </option>
                  <option value="Before Meal">Before Meal</option>
                  <option value="After Meal">After Meal</option>
                  <option value="With Meal">With Meal</option>
                  <option value="Empty Stomach">Empty Stomach</option>
                  <option value="As Directed by Doctor">
                    As Directed by Doctor
                  </option>
                </select>
              </div>

              {medicines.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeMedicine(index)}
                  className="bg-red-500 absolute bottom-5 right-5 py-2 px-3 w-fit text-sm h-fit self-center rounded-lg text-white  hover:bg-red-700"
                >
                  Remove Medicine
                </button>
              )}
            </div>
          ))}

          <div className="flex gap-3 flex-col items-end">
            <button
              type="button"
              onClick={addMedicine}
              className=" p-2 w-fit  bg-blue-500 text-white rounded-md  hover:bg-blue-600"
            >
              Add Medicine
            </button>

            <button
              type="submit"
              className="mt-4 p-3 w-full bg-green-500 text-white rounded-md hover:bg-green-600"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Prescription"}
            </button>
          </div>
        </form>
      )}

      {submittedPrescription && !formVisible && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-4">Prescription Details</h3>
          <div className="bg-gray-100 p-4 rounded-md">
            <h4 className="mt-4 text-lg font-semibold">Medicines</h4>
            <table className="min-w-full table-auto mt-2">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">#</th>
                  <th className="px-4 py-2 border">Medicine Name</th>
                  <th className="px-4 py-2 border">Dosage</th>
                  <th className="px-4 py-2 border">Frequency</th>
                  <th className="px-4 py-2 border">Duration</th>
                  <th className="px-4 py-2 border">Notes</th>
                </tr>
              </thead>
              <tbody>
                {submittedPrescription.medicines.map((medicine, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-4 py-2 border">{medicine.name}</td>
                    <td className="px-4 py-2 border">{medicine.dosage}</td>
                    <td className="px-4 py-2 border">{medicine.frequency}</td>
                    <td className="px-4 py-2 border">{medicine.duration}</td>
                    <td className="px-4 py-2 border">{medicine.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={downloadPDF}
            className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-4"
          >
            Download Prescription as PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default PrescriptionForm;
