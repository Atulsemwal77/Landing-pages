const mongoose = require("mongoose");

const studentSchemaFreelancer = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    num: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Invalid email"],
    },
    skill: { type: String, default: "", trim: true },
    
    bio: { type: String, default: "", trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Freelancer-Student", studentSchemaFreelancer);
