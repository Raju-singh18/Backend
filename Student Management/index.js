const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const studentRoutes = require("./Routes/studentRoutes");

dotenv.config();
connectDb();
 
const app = express();
app.use(express.json());

app.use("/api/v1/students", studentRoutes);

const port = process.env.PORT || 5000;
console.log(port);

app.get("/", (req, res) => {
    res.send("Student Management API");
});

app.listen(port,()=>{
console.log(`App is listeninig at port: ${port}`)
})
