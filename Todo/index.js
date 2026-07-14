const express = require("express");
require("dotenv").config();

const app = express();

const connectDb = require("./config/database");
const todoRoutes = require("./routes/todoRoutes");

const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Database Connection
connectDb();

// Routes
app.use("/api/v1", todoRoutes);


// Home Route
app.get("/", (req, res) => {
    res.send(`<h1>This is home page...</h1>`);
});


// Server
app.listen(port, () => {
    console.log(`App is running at port ${port}`);
});