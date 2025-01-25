const mongoose = require("mongoose");


// Define schema for the admin
const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Admin name is required"],
    trim: true,
    minlength: [3, "Name should be at least 3 characters long"],
  },
  phone: {
    type: String,
    unique: true,
    
  },
  username: {
    type: String,
    required: [true, "Admin username is required"],
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
    default: "admin",
    required: [true, "Role is required"],
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
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
  lastLogin: {
    type: Date,
    default: null,
  },
  lastPasswordUpdate: {
    type: Date,
    default: null,
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


module.exports = mongoose.model("Admin", AdminSchema);
