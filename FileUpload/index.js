const express = require("express")
const dotenv = require("dotenv")
const fileUpload = require("express-fileupload")
dotenv.config();
const connectDB = require("./config/database")
const connectCloudinary = require("./config/cloudinary");
const { localFileUpload } = require("./controllers/fileRoutes");
const fileUploadRoutes = require("./routes/fileUploadRoutes");

const app = express();

app.use(express.json());
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/temp/"
}));

connectDB();
connectCloudinary();


app.use("/api/v1/upload",fileUploadRoutes);
app.get("/",(req, res)=>{
    res.send(`<h1>This is home page route</h1>`)
})

const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`App is running at ${port}`)
})
