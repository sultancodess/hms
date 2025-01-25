const patient = require("../models/patient");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");
const Admin = require("../models/admin");
const Patient = require("../models/patient");
const Staff = require("../models/staff");
const nodemailer = require("nodemailer");

// Sign-up route
// router.post("/sign-up", async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     // Check name length is more than 4
//     if (username.length < 4) {
//       return res
//         .status(400)
//         .json({ message: "Name should be at least 4 characters long" });
//     }

//     // Check username already present
//     const existingUsername = await patient.findOne({ username: username });
//     if (existingUsername) {
//       return res.status(400).json({ message: "Username already exists" });
//     }

//     // Check email already present
//     const existingEmail = await patient.findOne({ email: email });
//     if (existingEmail) {
//       return res.status(400).json({ message: "Email already exists" });
//     }

//     // Check password length
//     if (password.length <= 5) {
//       return res
//         .status(400)
//         .json({ message: "Password should be at least 5 characters long" });
//     }

//     const hashPassword = await bcrypt.hash(password, 10);

//     // Create new user
//     const newPatient = new patient({
//       username: username,
//       email: email,
//       password: hashPassword,
//     });

//     await newPatient.save();
//     res.status(200).json({ message: "User created successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });
//all signup
// router.post("/sign-up", async (req, res) => {
//   const { name, email, username, password } = req.body;

//   try {
//     // Input validation
//     if (username.length < 4) {
//       return res
//         .status(400)
//         .json({ message: "Username should be at least 4 characters long" });
//     }

//     if (password.length <= 5) {
//       return res
//         .status(400)
//         .json({ message: "Password should be at least 5 characters long" });
//     }

//     // Check for duplicate username and email across all collections (Admin, Staff, Patient)
//     const existingUser = await Admin.findOne({
//       $or: [{ username }, { email }],
//     });
//     if (existingUser) {
//       return res
//         .status(400)
//         .json({ message: "Username or email already exists in Admin" });
//     }

//     const existingPatient = await Patient.findOne({
//       $or: [{ username }, { email }],
//     });
//     if (existingPatient) {
//       return res
//         .status(400)
//         .json({ message: "Username or email already exists in Patient" });
//     }

//     // const existingStaff = await Staff.findOne({
//     //   $or: [{ username }, { email }],
//     // });
//     // if (existingStaff) {
//     //   return res
//     //     .status(400)
//     //     .json({ message: "Username or email already exists in Staff" });
//     // }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Determine the role based on email or username
//     let role = "";
//     let user = null;

//     if (email.endsWith("@hospitaladmin.com")) {
//       role = "admin";
//       user = new Admin({ name, email, username, password: hashedPassword });
//     // } else if (email.includes("staff") || username.includes("staff")) {
//     //   role = "staff";
//     //   user = new Staff({
//     //     name,
//     //     email,
//     //     username,
//     //     password: hashedPassword,
//     //     department: "Default Department", // You can set the default department if necessary
//     //   });
//     } else {
//       role = "patient";
//       user = new Patient({ name, email, username, password: hashedPassword });
//     }

//     // Save the user to the respective collection
//     await user.save();

//     res.status(201).json({ message: `${role} registered successfully!` });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error registering user", error });
//   }
// });

router.post("/sign-up", async (req, res) => {
  const { name, email, username, password } = req.body;

  try {
    // Validate required fields
    if (!name || !email || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Input validation
    if (username.length < 4) {
      return res
        .status(400)
        .json({ message: "Username should be at least 4 characters long" });
    }

    if (password.length <= 5) {
      return res
        .status(400)
        .json({ message: "Password should be at least 5 characters long" });
    }

    // Check for duplicates
    const existingUser = await Admin.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      return res.status(400).json({
        message:
          existingUser.username === username
            ? "Username already exists in Admin"
            : "Email already exists in Admin",
      });
    }

    const existingPatient = await Patient.findOne({
      $or: [{ username }, { email }],
    });
    if (existingPatient) {
      return res.status(400).json({
        message:
          existingPatient.username === username
            ? "Username already exists in Patient"
            : "Email already exists in Patient",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let role = "";
    let user = null;

    if (email.endsWith("@hospitaladmin.com")) {
      role = "admin";
      user = new Admin({ name, email, username, password: hashedPassword });
    } else if (email.includes("staff") || username.includes("staff")) {
      role = "staff";
      user = new Staff({
        name,
        email,
        username,
        password: hashedPassword,
        department: "Default Department",
      });
    } else {
      role = "patient";
      user = new Patient({ name, email, username, password: hashedPassword });
    }

    // Save user
    await user.save();

    res.status(201).json({ message: `${role} registered successfully!` });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({
      message: "An error occurred while registering. Please try again later.",
    });
  }
});
router.post("/sign-in", async (req, res) => {
  try {
    const { usernameOremail, password } = req.body;

    if (!usernameOremail || !password) {
      return res
        .status(400)
        .json({ message: "Username Or Email and password are required" });
    }

    let user = null;
    let role = null;

    const admin = await Admin.findOne({
      $or: [{ email: usernameOremail }, { username: usernameOremail }],
    });

    if (admin) {
      user = admin;
      role = "admin";
      user.status = "active";
          await user.save();
    } else {
      const patient = await Patient.findOne({
        $or: [{ email: usernameOremail }, { username: usernameOremail }],
      });
      if (patient) {
        user = patient;
        role = "patient";
         user.status = "active";
         await user.save();
      } else {
        if (!user) {
          user = await Staff.findOne({
            $or: [{ email: usernameOremail }, { username: usernameOremail }],
          });
          if (user) {
            user = user;
            role = user.role;
             user.status = "active";
             await user.save();
          }
        }
      }
    }

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!user.password) {
      return res
        .status(400)
        .json({ message: "Password not set for this user" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const authClaims = {
      id: user._id,
      username: user.username,
      role: role,
    };

    const token = jwt.sign(authClaims, "smarthospital", { expiresIn: "30d" });

    // Return user details and token in response
    return res.status(200).json({
      id: user._id,
      username: user.username,
      role: role,
      token: token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
router.get("/get-user-information", authenticateToken, async (req, res) => {
  try {
    const { id, role } = req.user; // Accessing the user ID and role from the token payload

    if (!id) {
      return res.status(400).json({ message: "User ID not found in token" });
    }

    // Determine which collection to query based on the role
    let data;
    if (role === "admin") {
      data = await Admin.findById(id).select("-password"); // Exclude password
    } else if (role === "doctor" || role === "receptionist") {
      data = await Staff.findById(id).select("-password"); // Exclude password
    } else if (role === "patient") {
      data = await Patient.findById(id).select("-password"); // Exclude password
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    // If no data is found
    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
router.get("/patient/:id", async (req, res) => {
  try {
    const patientId = req.params.id;
    const patient = await Patient.findById(patientId); 
    if (!patient) {
      return res.status(404).json({ message: "Patient not found." });
    }
    res.status(200).json({ patient });
  } catch (err) {
    res.status(500).json({ message: "Error fetching patient data." });
  }
});
router.put("/update-patient/:id", async (req, res) => {
  try {
    const patientId = req.params.id; // Get the patient ID from the request parameters
    const updatedData = req.body; // Get the updated data from the request body

    // Validate the incoming data (you can add your own validation logic here)

    // Update the patient in the database
    const updatedPatient = await Patient.findByIdAndUpdate(
      patientId,
      updatedData,
      { new: true }
    );

    if (!updatedPatient) {
      return res.status(404).json({ message: "Patient not found." });
    }

    res.status(200).json({ patient: updatedPatient }); // Send back the updated patient
  } catch (err) {
    console.error("Error updating patient:", err);

    // Send an appropriate error response
    res.status(500).json({
      message: "An error occurred while updating patient data.",
      error: err.message,
    });
  }
});
router.delete("/delete-patient/:id", async (req, res) => {
  try {
    const patientId = req.params.id; // Get the patient ID from the request parameters

    // Find and delete the patient by ID
    const deletedPatient = await Patient.findByIdAndDelete(patientId);

    if (!deletedPatient) {
      return res.status(404).json({ message: "Patient not found." });
    }

    res
      .status(200)
      .json({
        message: "Patient deleted successfully.",
        patient: deletedPatient,
      });
  } catch (err) {
    console.error("Error deleting patient:", err);

    // Send an appropriate error response
    res.status(500).json({
      message: "An error occurred while deleting patient data.",
      error: err.message,
    });
  }
});
router.get("/patients", async (req, res) => {
  try {
    // Fetch all patients from the database
    const patients = await Patient.find(); // Replace 'Patient' with your model
    if (patients.length === 0) {
      return res.status(404).json({ message: "No patients found." });
    }
    res.status(200).json({ patients });
  } catch (err) {
    res.status(500).json({ message: "Error fetching patients data." });
  }
});
router.get('/admins', async (req, res) => { 
    try {
      // Fetch all patients from the database
      const admins = await Admin.find(); // Replace 'Patient' with your model
      if (admins.length === 0) {
        return res.status(404).json({ message: "No admins found." });
      }
      res.status(200).json({ admins });
    } catch (err) {
      res.status(500).json({ message: "Error fetching admins data." });
    }
})
router.put("/update-admin/:id", async (req, res) => {
  try {
    const adminId = req.params.id;
    const updateData = req.body;


    if (!adminId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid admin ID." });
    }


    const updatedAdmin = await Admin.findByIdAndUpdate(adminId, updateData, {
      new: true,
      runValidators: true, 
    });

    if (!updatedAdmin) {
      return res.status(404).json({ message: "Admin not found." });
    }

    res.status(200).json({ admin: updatedAdmin });
  } catch (err) {
    console.error("Error updating admin data:", err);
    res.status(500).json({ message: "Error updating admin data." });
  }
});
router.delete("/delete-admin/:id", async (req, res) => {
  try {
    const adminId = req.params.id;

    // Validate the ID (ensure it's a valid MongoDB ObjectId)
    if (!adminId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid admin ID." });
    }

    // Find and delete the admin by ID
    const deletedAdmin = await Admin.findByIdAndDelete(adminId);

    if (!deletedAdmin) {
      return res.status(404).json({ message: "Admin not found." });
    }

    res.status(200).json({ message: "Admin deleted successfully." });
  } catch (err) {
    console.error("Error deleting admin data:", err);
    res.status(500).json({ message: "Error deleting admin data." });
  }
});
router.post("/forget-password", async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the user exists in any collection (Patient, Admin, Staff)
    let user = await Patient.findOne({ email });

    if (!user) {
      user = await Admin.findOne({ email });
    }

    if (!user) {
      user = await Staff.findOne({ email });
    }

    // If no user is found in all collections, return an error
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Generate a reset token (expires in 15 minutes)
    const token = jwt.sign({ userId: user._id }, "smarthospital", {
      expiresIn: "15m",
    });

    // Create reset link
    const resetLink = `http://localhost:3000/reset-password?token=${token}`;

    // Create a transporter object using Mailtrap SMTP settings
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });

    // Define mail options
    const mailOptions = {
      from: process.env.MAILTRAP_USERNAME, // Use Mailtrap's username as "from"
      to: email,
      subject: "Password Reset Request",
      html: `<h2>Password Reset</h2>
             <p>Click the link below to reset your password:</p>
             <a href="${resetLink}">Reset Password</a>
             <p>This link will expire in 15 minutes.</p>`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Respond with success message
    res
      .status(200)
      .json({ message: "Password reset link sent to your email." });
  } catch (error) {
    console.error("Error in forget-password:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Verify the reset token
    const decoded = jwt.verify(token, "smarthospital");

    // Check if the user exists in the collections (Patient, Admin, Staff)
    let user = await Patient.findById(decoded.userId);
    if (!user) {
      user = await Admin.findById(decoded.userId);
    }
    if (!user) {
      user = await Staff.findById(decoded.userId);
    }

    // If no user is found
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Hash the new password before saving
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    // Respond with success message
    res.status(200).json({ message: "Password successfully reset." });
  } catch (error) {
    console.error("Error in reset-password:", error);
    res.status(400).json({ message: "Invalid or expired token." });
  }
});




module.exports = router;

