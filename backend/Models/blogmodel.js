const mongoose = require("mongoose");
const fs = require("fs").promises;
const path = require("path");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String,  },
    date: { type: Date, },
    author: { type: String },
    tags: [{ type: String }],
    content: { type: String },
    image: { type: String }, // stored as "uploads/<filename>"
  },
  {
    timestamps: true,
  }
);

// Delete image when blog is deleted via findOneAndDelete
blogSchema.pre("findOneAndDelete", async function (next) {
  try {
    const blog = await this.model.findOne(this.getFilter());
    if (blog && blog.image) {
      const imagePath = path.join(__dirname, "..", blog.image);
      try {
        await fs.unlink(imagePath);
      } catch (err) {
        if (err.code !== "ENOENT") console.error("Error deleting image:", err);
      }
    }
    next();
  } catch (err) {
    console.error("Pre-delete hook error:", err);
    next(err);
  }
});

module.exports = mongoose.model("Blog", blogSchema);
