const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const connectDB = async()=>{
     try {
        await mongoose.connect(MONGODB_URI);
        console.log("MongoDb connected successfully..!");
     } catch (error) {
        console.log("Error while connecting mongoDB");
        console.log(error.message);
        process.exit(1);
     }
}

module.exports = connectDB;
