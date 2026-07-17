const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT;

connectDB();

app.use("/api/v1/auth", userRoutes);

app.get("/",(req, res)=>{
    res.send(`<h1>This is Home page of my route</h1>`)
})
app.listen(port,()=>{
console.log(`App is running at ${port}`);
})