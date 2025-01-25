const patient = require("../models/patient");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");
const Staff = require("../models/staff");
const Admin = require("../models/admin");
const twilio = require("twilio");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN; 
const client = twilio(accountSid, authToken);


// Utility functions
function generateUsername(name, role) {
  const nameParts = name.toLowerCase().split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts[1] || "";
  const randomNumber = Math.floor(Math.random() * 90) + 10;
  return `${firstName}.${lastName}.${role.toLowerCase()}${randomNumber}`;
}

function generateRandomPassword() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$";
  let password = "";
  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

//add staff
// router.post("/add-staff", authenticateToken, async (req, res) => {
//     try {
//       const { id } = req.headers;
//       if (!id) {
//         return res
//           .status(400)
//           .json({ message: "User ID is missing from the request" });
//       }
//       const user = await Admin.findById(id);
      
       
//       const {
//         name,
//         role,
//         email,
//         phone,
//         city,
//         state,
//         postalCode,
//         country,
//         department,
//         specialization,
//       } = req.body;
        
//       if (user.role !== "admin") {
//             return res.status(403).json({ message: "Unauthorized access" });
//         }
              
//           const username = generateUsername(name, role);

//           // Generate random password and hash it
//           const plainPassword = generateRandomPassword();
//           const hashedPassword = await bcrypt.hash(plainPassword, 10);

//         const staff = new Staff({
//           name,
//           role,
//           email,
//           phone,
//           city,
//           state,
//           postalCode,
//           country,
         
         
//           username,
//           password: hashedPassword,
//           department: department || null,
//           specialization: specialization || null,
//         });

//         await staff.save();

//  res.status(201).json({
//    message: `${
//      role.charAt(0).toUpperCase() + role.slice(1)
//    } added successfully`,
//    credentials: { username, password: plainPassword },
//  });
//     } catch (error) {
//         console.error(error);
//       return res.status(500).json({ message: "Internal Server Error" });
//     }
// })

async function sendSmsNotification(phone, role, username, plainPassword) {
  try {
    const message = await client.messages.create({
      body: `New staff added successfully: ${
        role.charAt(0).toUpperCase() + role.slice(1)
      } - Username: ${username}, Password: ${plainPassword}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });
    console.log("Message sent successfully:", message.sid);
    return { success: true }; // Return a success object if SMS is sent
  } catch (error) {
    console.error("Twilio error occurred:", error.message);
    if (error.code) {
      console.error("Error code:", error.code);
      if (error.code === 21211) {
        console.error("Invalid phone number provided.");
        return { success: false, message: "Invalid phone number provided." };
      } else if (error.code === 21608) {
        console.error("Phone number is not enabled for SMS.");
        return {
          success: false,
          message: "Phone number is not enabled for SMS.",
        };
      }
    }
    return {
      success: false,
      message: "An unknown error occurred while sending the SMS.",
    };
  }
}

router.post("/add-staff", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    if (!id) {
      return res
        .status(400)
        .json({ message: "User ID is missing from the request" });
    }

    const user = await Admin.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const {
      name,
      role,
      email,
      phone,
      city,
      state,
      postalCode,
      country,
      department,
      specialization,
    } = req.body;

    const username = generateUsername(name, role);
    const plainPassword = generateRandomPassword();
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const staff = new Staff({
      name,
      role,
      email,
      phone,
      city,
      state,
      postalCode,
      country,
      username,
      password: hashedPassword,
      department: department || null,
      specialization: specialization || null,
    });

   
 await staff.save();
    // Send SMS notification
     const smsResult = await sendSmsNotification(
       phone,
       role,
       username,
       plainPassword
     );
    if (!smsResult || !smsResult.success) {
      return res
        .status(400)
        .json({
          message: smsResult
            ? smsResult.message
            : "An unknown error occurred while sending the SMS.",
        });
    }

    res.status(201).json({
      message: `${
        role.charAt(0).toUpperCase() + role.slice(1)
      } added successfully`,
      credentials: { username, password: plainPassword },
    });
  } catch (error) {
    console.error("Error occurred while adding staff:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


//delete staff
router.delete("/delete-staff/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params; // Extract ID from route parameters
    const adminId = req.user.id; // Assume `authenticateToken` attaches user info to `req.user`

    const admin = await Admin.findById(adminId);
    if (!admin || admin.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const staff = await Staff.findById(id);
    if (!staff) {
      return res.status(404).json({ message: "Staff member not found" });
    }

    await Staff.findByIdAndDelete(id); // Delete the staff member

    res.status(200).json({
      message: `Staff member deleted successfully`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/update-staff/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params; 
    const adminId = req.user.id; 
    const updateData = req.body; 

    // Check if the user is an admin
    const admin = await Admin.findById(adminId);
    if (!admin || admin.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    // Check if the staff member exists
    const staff = await Staff.findById(id);
    if (!staff) {
      return res.status(404).json({ message: "Staff member not found" });
    }

    // Update the staff member's data
    const updatedStaff = await Staff.findByIdAndUpdate(
      id,
      updateData,
      { new: true } // Return the updated document
    );

    res.status(200).json({
      message: "Staff member updated successfully",
      staff: updatedStaff,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
router.get("/get-doctor-data", async (req, res) => {
  try {
    const doctors = await Staff.find({ role: "doctor" }).select(
      "-password"
    );

    if (doctors.length === 0) {
      return res.status(404).json({ message: "No doctors found" });
    }

    
    return res.status(200).json({ doctors });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/get-receptionist-data", async (req, res) => {
  try {
    // Query for doctors from the Staff collection (assuming 'designation' or 'role' field exists)
    const receptionist = await Staff.find({ role: "receptionist" }).select(
      "-password"
    );

    // If no doctors are found
    if (receptionist.length === 0) {
      return res.status(404).json({ message: "No receptionist found" });
    }

    // Return doctor data
    return res.status(200).json({ receptionist });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});


router.get("/get-staff/:id", async (req, res) => {
  try {
    const { id } = req.params; 

   
    const data = await Staff.findById(id).select("-password");
    if (!data) {
      return res.status(404).json({ message: "Staff member not found" });
    }

  
    return res.status(200).json({ data });
  } catch (error) {
    console.error(error);

    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid staff ID" });
    }


    return res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports = router