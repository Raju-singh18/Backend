const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDb Connected Successfully..");
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = connectDB;