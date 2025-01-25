const mongoose = require("mongoose");

// Define schema for the staff
const StaffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [3, "Name should be at least 3 characters long"],
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  dateOfBirth: {
    type: Date,
   
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
  username: {
    type: String,
    required: [true, "Staff username is required"],
    trim: true,
    minlength: [3, "Name should be at least 3 characters long"],
  },
  phone: { type: String },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
  role: {
    type: String,
    enum: ["doctor", "receptionist", "admin", "nurse", "technician"],
  },
  avatar: {
    type: String,
    default: "https://example.com/default-avatar.png",
  },
  OpdNo: {
    type: Number,
    unique: true,
    min: [1, "OPD number must be a positive integer"],
  },
  specialization: {
    type: String,
    trim: true,
    validate: {
      validator: function (value) {
        // Specialization is required only if the role is 'doctor'
        if (this.role === "doctor" && !value) {
          throw new Error("Specialization is required for doctors");
        }
        return true;
      },
      message: "Specialization is required for doctors",
    },
  },
  department: {
    type: String,
  },
  experience: {
    type: Number,
    min: [0, "Experience must be a positive number"],
    validate: {
      validator: function (value) {
        // Experience is required only if the role is 'doctor'
        if (this.role === "doctor" && value === undefined) {
          throw new Error("Experience is required for doctors");
        }
        return true;
      },
      message: "Experience is required for doctors",
    },
  },
  qualification: {
    type: String,
    trim: true,
    validate: {
      validator: function (value) {
        // Qualification is required only if the role is 'doctor'
        if (this.role === "doctor" && !value) {
          throw new Error("Qualification is required for doctors");
        }
        return true;
      },
      message: "Qualification is required for doctors",
    },
  },
  // availability: {
  //   days: {
  //     type: [String],
  //     validate: {
  //       validator: function (value) {
  //         // Ensure that the role is 'doctor' and availability days are provided
  //         if (this.role === "doctor") {
  //           if (!value || value.length === 0) {
  //             throw new Error("Availability days are required for doctors");
  //           }
  //           // Ensure each day is a valid weekday
  //           const validDays = [
  //             "Monday",
  //             "Tuesday",
  //             "Wednesday",
  //             "Thursday",
  //             "Friday",
  //             "Saturday",
  //             "Sunday",
  //           ];
  //           for (let day of value) {
  //             if (!validDays.includes(day)) {
  //               throw new Error(`${day} is not a valid weekday`);
  //             }
  //           }
  //         }
  //         return true;
  //       },
  //       message: "Availability days are required for doctors",
  //     },
  //   },
  //   timeSlots: [
  //     {
  //       start: { type: String, required: true }, // e.g., "09:00 AM"
  //       end: { type: String, required: true }, // e.g., "01:00 PM"
  //     },
  //   ],
  // },
  registrationNo: {
    type: String,
    unique: true,
    validate: {
      validator: function (value) {
        // Only make registrationNo required if the role is 'doctor'
        if (this.role === "doctor" && !value) {
          throw new Error("Registration number is required for doctors");
        }
        return true;
      },
      message: "Registration number is required for doctors",
    },
  },
  languages: {
    type: [String], // Array of strings to store multiple languages
  },


  city: { type: String, trim: true },
  state: { type: String, trim: true },
  postalCode: {
      type: String,
      match: [/^\d{5,6}$/, "Postal code must be 5 or 6 digits"],
    },
  country: { type: String, default: "India", trim: true },
 
  status: {
    type: String,
    enum: ["active", "inactive"], // Restrict to allowed values
    default: "inactive", // Default status when a user is created
    
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
StaffSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create and export the model
module.exports = mongoose.model("Staff", StaffSchema);
