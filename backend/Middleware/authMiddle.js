const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET || "mySuperSecretKey";

const verifyAdmin = (req, res, next) => {
  const {adminToken} = req.cookies;
  // console.log(adminToken)

  if (!adminToken) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(adminToken, SECRET_KEY);
    req.adminId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid adminToken" });
  }
};

module.exports = verifyAdmin;
