const express = require("express");
const router = express.Router();
const Admin = require("../Models/AdminModal");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyAdmin = require("../Middleware/authMiddle");

const SECRET_KEY = process.env.JWT_SECRET || "mySuperSecretKey";

// Admin Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: "Invalid email" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Wrong password" });

    // Create JWT Token
    const token = jwt.sign({ id: admin._id }, SECRET_KEY, { expiresIn: "1d" });

    // Set cookie with token
    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: true, // true in production (HTTPS)
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Protected Route
router.get("/me", verifyAdmin, (req, res) => {
  res.json({
    message: "This is protected dashboard data",
    adminId: req.adminId,
  });
});

// Admin Logout Route
router.post("/logout", (req, res) => {
  res.clearCookie("adminToken", {
    httpOnly: true,
    secure: true, 
    sameSite: "None",
  });

  res.json({ message: "Logout successful" });
});

module.exports = router;
