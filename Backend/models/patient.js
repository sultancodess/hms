const mongoose = require("mongoose");

// Define schema for the patient
const PatientSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Patient username is required"],
    trim: true,
    minlength: [3, "Name should be at least 3 characters long"],
  },
  name: {
    type: String,
    required: [true, "Patient name is required"],
    trim: true,
    minlength: [3, "Name should be at least 3 characters long"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      "Please provide a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },

  role: {
    type: String,
    enum: ["patient", "doctor", "admin", "receptionist"],
    default: "patient",
    required: [true, "Role is required"],
  },
  age: {
    type: Number,
    min: [0, "Age must be a positive number"],
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  weight: {
    type: String,
  },

  street: { type: String, trim: true },
  city: { type: String, trim: true },
  state: { type: String, trim: true },
  postalCode: {
    type: String,
    match: [/^\d{5,6}$/, "Postal code must be 5 or 6 digits"],
  },
  country: { type: String, default: "India", trim: true },

  prescriptions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Prescription", 
    },
  ],
  opdQueueStatus: {
    type: String,
    enum: ["waiting", "in-consultation", "completed", "cancelled"],
    default: "waiting",
  },
  dateOfVisit: {
    type: Date,
    default: Date.now,
  },
  medicalHistory: [
    {
      condition: { type: String, required: true, trim: true },
      diagnosedAt: { type: Date },
      notes: { type: String, trim: true },
    },
  ],
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  dateOfBirth: {
    type: Date,
    validate: {
      validator: function (value) {
        return value <= new Date();
      },
      message: "Date of birth must be a past date",
    },
  },
  status: {
    type: String,
    enum: ["active", "inactive"], // Restrict to allowed values
    default: "inactive", // Default status when a user is created
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [500, "Notes cannot exceed 500 characters"],
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

// Pre-save middleware to automatically update the `updatedAt` field
PatientSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create and export the model


module.exports = mongoose.model("Patient", PatientSchema);;
