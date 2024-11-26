const mongoose = require("mongoose");

const MONGO_URI = "mongodb://127.0.0.1:27017/CurD_app";

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(MONGO_URI);
    if (!connect) {
      console.log("MongoDb connection failed");
    }
    console.log(`Database connection on server${MONGO_URI}`);
  } catch (error) {
    console.log("Connection Failed due to some error", error);
  }
};

module.exports = connectDb;
