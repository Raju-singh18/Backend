const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

const connectCloudinary = async()=>{
     try {
        await cloudinary.config({
            cloud_name:process.env.CLOUD_NAME,
            api_key:process.env.API_KEY,
            api_secret:process.env.API_SECRET
        })

        console.log("Cloudinary Connected Successfully..")
     } catch (error) {
        console.log(error.message);
     }
}

module.exports=connectCloudinary;
