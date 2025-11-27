const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Absolute path to backend/uploads
const uploadDir = path.join(__dirname, "uploads");

// Create folder if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("📁 Created uploads folder at:", uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // sanitize filename base (avoid path characters)
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const uniqueName = Date.now() + "-" + safeName;
    cb(null, uniqueName);
  },
});

// Accept only image mimetypes
function fileFilter(req, file, cb) {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
}

const upload = multer({
  storage,
  limits: {
    fieldSize: 10 * 1024 * 1024, // 10MB for non-file fields
    fileSize: 5 * 1024 * 1024,   // 5MB per file
  },
  fileFilter,
});

module.exports = upload;
