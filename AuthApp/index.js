const express = require("express");
const dotenv=require("dotenv");
const connectDB = require("./config/database");
const userRoutes = require("./routes/userRoutes")
const cookieParser = require("cookie-parser");


dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

connectDB();

app.use("/api/v1/user",userRoutes)
const port = process.env.PORT

app.get("/",(req, res)=>{
    res.send(`<h1>This is Home Page of AuthApp</h1>`)
})
app.listen(port,()=>{
    console.log(`App is running at port: ${port}`);
})
