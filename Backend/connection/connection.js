const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    // Connect to MongoDB using the URI from .env file
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.error(`MongoDB Connection Error: ${err.message}`);
  }
};

module.exports = connectDB;
