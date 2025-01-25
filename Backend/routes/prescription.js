const router = require("express").Router();
const mongoose = require("mongoose");
const Queue = require("../models/queue");
const { authenticateToken } = require("./userAuth");
const Doctor = require("../models/staff");
const Patient = require("../models/patient");
const Prescription = require("../models/prescription");

router.post("/add-prescription", authenticateToken, async (req, res) => {
  try {
    const { patientId, doctorId, medicines } = req.body;

    // Validate required fields
    if (!patientId || !doctorId || !medicines || medicines.length === 0) {
      return res.status(400).json({
        message: "Missing required fields or no medicines provided.",
      });
    }

    // Validate doctor existence
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found." });
    }

    // Validate patient existence
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found." });
    }

    // Create a new prescription
    const prescription = new Prescription({
      patientId,
      doctorId,
      medicines,
    });

    // Save the prescription
    const savedPrescription = await prescription.save();

    // Link prescription to patient
    patient.prescriptions.push(savedPrescription._id);
    await patient.save();

    res.status(201).json({
      message: "Prescription added successfully.",
      prescription: savedPrescription,
    });
  } catch (error) {
    console.error("Error adding prescription:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});


module.exports = router;