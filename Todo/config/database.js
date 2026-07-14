
const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Mongodb connection successfull..")
    }catch(error){
        console.log(error.message);
    }
}

module.exports = connectDb;
