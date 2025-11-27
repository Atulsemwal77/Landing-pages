const mongoose = require("mongoose");

const DbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, { dbName: "Landing_Page" });
    console.log("Connected to Database");
  } catch (error) {
    console.log("Failed to connect db" , error);
  }
};

module.exports = DbConnection;



