
import express from "express";
import dotenv from "dotenv";
import cors  from "cors"; 
import razorpayRoutes from "./routes/razorpayRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use(razorpayRoutes);

app.listen(5000,()=>{
    console.log("App is running at port: 5000")
})
