const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./Models/AdminModal");
require("dotenv").config();

const createAdmin = async () => {
  try {
    // 1️⃣ Connect to DB
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "Landing_Page",
    });

    console.log("📌 DB Connected");

    const email = "ghost@gmail.com";
    const plainPassword = "Ghost@123";

    // 2️⃣ Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      console.log("✅ Admin already exists");
      return process.exit();
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // 4️⃣ Create admin
    const admin = new Admin({
      email,
      password: hashedPassword,
      name: "Admin",
    });

    await admin.save();
    console.log("🎉 Admin created successfully");

  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    process.exit();
  }
};

createAdmin();
