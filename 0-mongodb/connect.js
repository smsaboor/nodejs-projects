const mongoose = require("mongoose");

const MONGODB_URL = "mongodb://localhost:27017/collectionName";

const connectDB = () => {
  console.log(`i am in connected ==> ${MONGODB_URL}  <==`);
  console.log(`i am in connected ==>  <==`);
  return mongoose.connect(MONGODB_URL);
};

const closeDB = () => {
  mongoose.connection
    .close()
    .then(() => {
      console.log("MongoDB connection closed");
    })
    .catch((err) => {
      console.error("Error closing MongoDB connection:", err);
    });
};

module.exports = { connectDB, closeDB };
