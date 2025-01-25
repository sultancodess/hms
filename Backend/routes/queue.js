const router = require("express").Router();
const mongoose = require("mongoose");
const Queue = require("../models/queue");
const { authenticateToken } = require("./userAuth");
const Doctor = require("../models/staff");
const twilio = require("twilio");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Function to send SMS
const sendSMS = (to, message) => {
  client.messages
    .create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER, // Use your Twilio phone number from environment variable
      to: to,
    })
    .then((message) => console.log("Message sent:", message.sid))
    .catch((error) => console.error("Error sending message:", error));
};

// Example endpoint to send SMS
router.post("/send-sms", (req, res) => {
  const { phoneNumber, message } = req.body;

  // Call the sendSMS function
  sendSMS(phoneNumber, message);

  res.status(200).send("SMS sent");
});


router.post("/book-appointment", authenticateToken, async (req, res) => {
  try {
    const { doctorId, patientName, patientAge } = req.body;

    // Validate input
    if (!doctorId || !patientName || !patientAge) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if the doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found." });
    }

    // Check if the patient is already in the queue for this doctor
    const existingQueue = await Queue.findOne({
      doctorId,
      patientName,
      patientAge,
      status: "waiting",
    });
    if (existingQueue) {
      return res
        .status(400)
        .json({ message: "You are already in the queue for this doctor." });
    }

    // Create a new queue entry
    const queueEntry = new Queue({
      doctorId,
      patientId: req.user.id, // Ensure `req.user` is populated by authentication middleware
      patientName,
      patientAge,
      status: "waiting",
    });

    await queueEntry.save();

    res
      .status(201)
      .json({ message: "Appointment booked successfully.", queueEntry });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

router.get("/appointments/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid doctor ID format." });
    }

    const doctorId = id;
    const appointments = await Queue.find({ doctorId }).populate(
      "patientId",
      ["name", "age", "avatar", "email", "phone", "city", "state", "country", "prescription", "medicalHistory", "gender", "dateOfBirth", "street", "username"]
    );
     


    if (!appointments.length) {
      return res
        .status(404)
        .json({ message: "No appointments found for this doctor." });
    }

    res.json({ success: true, data: appointments });
  } catch (error) {
    console.error(`Error fetching appointments for doctor ID ${id}:`, error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/find-pationt-appointments/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid doctor ID format." });
    }

    const patientId = id;
    const appointments = await Queue.find({ patientId });

    if (!appointments.length) {
      return res
        .status(404)
        .json({ message: "No appointments found for this patient." });
    }

    res.json({ success: true, data: appointments });
  } catch (error) {
    console.error(`Error fetching appointments for patient ID ${id}:`, error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/update-appointment/:id", authenticateToken, async (req, res) => { 
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid appointment ID format." });
    }

    const appointment = await Queue.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found." });
    }
    
    res.json({ success: true, data: appointment });

    await appointment.save();

    
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
})

module.exports = router;
