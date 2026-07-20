
const express =require("express");
const PDFDocument = require("pdfkit");

const {booking, event, user} = require("./data");
const fs = require("fs");

const app = express();

const doc = new PDFDocument();

doc.pipe(fs.createWriteStream("EvenmtME.pdf"));
doc.fontSize(25).font("Helvetica-Bold").text("EventME Booking Receipt");
doc.moveDown();

doc
  .fontSize(12)
  .fillColor("#7c3aed")
  .font("Helvetica")
  .text(`Booking Reference: ${booking.bookingReference}`);

doc.fillColor("#dc2626").text(`Customer Name: ${user.name}`);

doc.fillColor("#059669").text(`Email: ${user.email}`);

doc
  .dash(5, {
    space: 5,
  })
  .moveTo(50, 300)
  .lineTo(545, 300)
  .stroke();

doc.moveDown();

doc.fontSize(12).font("Helvetica").text(`Event: ${event.title}`);

doc.text(`Date: ${event.date}`);
doc.text(`Time: ${event.time}`);
doc.text(`Venue : ${event.location.venue}`);

doc.text(`Location: ${event.location.city}, ${event.location.country}`);

doc.moveDown();

doc.fontSize(16).font("Helvetica-Bold").text("PaymentDdetails");

doc
  .fontSize(12)
  .font("Helvetica")
  .text(`Total Amount: Rs.${booking.totalAmount}`);

doc.end();


app.listen(5000, ()=>{
    console.log(`App is running at Port: 5000`)
})