const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient", // References the Patient collection
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor", // References the Doctor collection
      required: true,
    },
    medicines: [
      {
        name: {
          type: String,
          required: true, 
        },
        dosage: {
          type: String,
          required: true, 
        },
        frequency: {
          type: String,
          required: true, 
        },
        duration: {
          type: String,
          required: true, 
        },
        notes: {
          type: String, 
          default: "",
        },
      },
    ],
    date: {
      type: Date,
      default: Date.now,
    },
    isDeleted: {
      type: Boolean,
      default: false, 
    },
  },
  {
    timestamps: true, 
  }
);


prescriptionSchema.index({ patientId: 1 });

module.exports = mongoose.model("Prescription", prescriptionSchema);
