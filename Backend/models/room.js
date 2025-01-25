const mongoose = require("mongoose");

// Bed Schema
const bedSchema = new mongoose.Schema({
  bedNumber: { type: String, required: true },
  isOccupied: { type: Boolean, default: false },
  occupant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient", 
    
  },
  type: { type: String, required: true }, 
});


const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true },
  roomType: { type: String, required: true },
  beds: [bedSchema], 
 
  floor: {
    type: String,
    required: [true, "Floor number is required"],
  },
  department: {
    type: String,
    required: [true, "Department is required"],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Room", roomSchema);
