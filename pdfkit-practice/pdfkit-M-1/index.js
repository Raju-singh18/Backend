const express = require("express");
const PDFDocument = require("pdfkit");
const fs = require("fs");

const app = express();

const doc = new PDFDocument({
    margin:0,
    size:"A4"
})

doc.pipe(fs.createWriteStream("receipt.pdf"));

// ? method=1
// doc.fontSize(25).text('EventMe Receipt');
// ? method=2
doc.fontSize(25);
doc.text("EventMe Receipt");

doc.end();

app.listen(5000,()=>{
    console.log("App is running at port: 5000")
})
