const express = require("express");
const connectDB = require("./connection/connection");
const http = require("http");
const app = express();
const cors = require("cors");


// Socket.io setup



require("dotenv").config();
require("./connection/connection");
connectDB();
const user = require("./routes/user");
const Queue = require("./routes/queue");
const staff = require("./routes/staff");
const Room = require("./routes/room");
const Prescription = require("./routes/prescription");





app.use(cors()); 
app.use(express.json());

app.use("/api/v1", user);
app.use("/api/v1", Room);
app.use("/api/v1", Queue);
app.use("/api/v1", staff);
app.use("/api/v1", Prescription);




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
