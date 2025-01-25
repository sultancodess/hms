const patient = require("../models/patient");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");
const Room = require("../models/room");
const Admin = require("../models/admin");
const axios = require("axios");

//function for creating bed dynamically
async function createRoomWithBeds(
  roomNumber,
  roomType,
  numberOfBeds,
  floor,
  department,
  bedType
) {
  const room = new Room({
    roomNumber,
    roomType,
    floor,
    department,
    beds: [], 
  });

  const bedNumbers = [];
  for (let i = 1; i <= numberOfBeds; i++) {
    const bedNumber = `B${i}`;
    bedNumbers.push({
      bedNumber,
      type: bedType || "General", 
      isOccupied: false,
      
    });
  }

  room.beds.push(...bedNumbers);

  await room.save();
  console.log(
    `Room ${roomNumber} with ${numberOfBeds} beds created successfully.`
  );
}

//add rooms and beds
router.post("/add-room", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await Admin.findById(id);

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const { roomNumber, roomType, numberOfBeds, bedType, floor, department } =
      req.body;
    
    const existingRoom = await Room.findOne({ roomNumber });
    
    if (existingRoom) {
      return res.status(400).json({ message: "Room already exists" });
    }

    if (!roomNumber || !roomType || !numberOfBeds || !floor || !department) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    await createRoomWithBeds(
      roomNumber,
      roomType,
      numberOfBeds,
      floor,
      department,
      bedType
    );

    res.status(200).json({ message: `Room ${roomNumber} with ${numberOfBeds} beds created successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//update room and its beds
router.put("/update-room/:roomId", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await Admin.findById(id);

    // Check if the user is an admin
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const { roomId } = req.params;
    const { roomNumber, roomType, floor, department, numberOfBeds, bedType } =
      req.body;

    // Find the room by ID
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Update room details if provided
    if (roomNumber) room.roomNumber = roomNumber;
    if (roomType) room.roomType = roomType;
    if (floor) room.floor = floor;
    if (department) room.department = department;

    // Update the beds if numberOfBeds or bedType is updated
    if (numberOfBeds) {
      // Delete existing beds and regenerate based on new number of beds
      room.beds = [];
      for (let i = 1; i <= numberOfBeds; i++) {
        const bedNumber = `B${i}`;
        room.beds.push({
          bedNumber,
          type: bedType || "General", // Default to "General" if no type is provided
          isOccupied: false,
          occupant: null,
        });
      }
    } else if (bedType) {
      // Update bed type if bedType is passed
      room.beds.forEach((bed) => {
        bed.type = bedType;
      });
    }

    // Save the updated room
    await room.save();

    res.status(200).json({ message: "Room and beds updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete Room and all its beds
router.delete("/delete-room/:roomId", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await Admin.findById(id);

    // Check if the user is an admin
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const { roomId } = req.params;

    // Find the room by ID and delete it
    const room = await Room.findByIdAndDelete(roomId);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.status(200).json({ message: "Room and its beds deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//delete only beds
router.delete("/delete-bed/:roomId/:bedNumber",
  authenticateToken,
  async (req, res) => {
    try {
      const { id } = req.headers;
      const user = await Admin.findById(id);

      if (user.role !== "admin") {
        return res.status(403).json({ message: "Unauthorized access" });
      }

      const { roomId, bedNumber } = req.params;

      const room = await Room.findById(roomId);

      if (!room) {
        return res.status(404).json({ message: "Room not found" });
      }

      const bedIndex = room.beds.findIndex(
        (bed) => bed.bedNumber === bedNumber
      );

      if (bedIndex === -1) {
        return res.status(404).json({ message: "Bed not found" });
      }

      room.beds.splice(bedIndex, 1);
      await room.save(); 

      res
        .status(200)
        .json({ message: `Bed ${bedNumber} deleted successfully` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.get("/get-rooms", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching rooms", error: err.message });
  }
});
router.get("/view-bed-details/:roomId/:bedId", async (req, res) => {
  try {
    const { roomId, bedId } = req.params;

    // Find the room by ID and project only the beds array
    const room = await Room.findById(roomId, "beds");

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Find the specific bed by bedId
    const bed = room.beds.find((bed) => bed._id.toString() === bedId);

    if (!bed) {
      return res.status(404).json({ message: "Bed not found in this room" });
    }

    // Respond with the bed info
    res.json(bed);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching bed information",
      error: err.message,
    });
  }
});

module.exports = router;
