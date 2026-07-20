const express = require("express");
const downloadReceipt = require("./routes/downloadReceipt");


const app = express();
 

app.use("/api/v1",downloadReceipt)

const PORT=5000;
app.listen(PORT,()=>{
    console.log(`Server running on http://localhost: ${PORT}`)
})
