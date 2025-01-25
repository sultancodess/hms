// const mongoose = require("mongoose");

// const queueSchema = new mongoose.Schema({
//   doctorId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Doctor",
//     required: true,
//   },
//   patientName: String,
//   patientAge: Number,
//   patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
//   status: {
//     type: String,
//     enum: ["waiting", "in-progress", "completed"],
//     default: "waiting",
//   },
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("Queue", queueSchema);
const mongoose = require("mongoose");

const QueueSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  status: {
    type: String,
    enum: ["waiting", "completed", "cancelled"],
    default: "waiting",
  },
  priority: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Queue", QueueSchema);