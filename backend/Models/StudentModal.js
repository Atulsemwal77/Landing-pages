const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
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
    education: { type: String, default: "", trim: true },
    location: { type: String, default: "", trim: true },
    interest: { type: String, default: "", trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
