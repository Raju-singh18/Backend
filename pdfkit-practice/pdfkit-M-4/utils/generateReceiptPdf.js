const {booking, event, user} = require("../data");
const PDFDocument = require("pdfkit");

const generateReceiptPdf = () => {

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: "A4",
      margin: 50,
    });

    const chunks = [];

    // PDF data is generated in chunks
    doc.on("data", (chunk) => {
        console.log(chunk);
      chunks.push(chunk);
    });

    // PDF generation completed
    doc.on("end", () => {
      const pdfBuffer = Buffer.concat(chunks);

      resolve(pdfBuffer);
    });

    // Error handling
    doc.on("error", (error) => {
      reject(error);
    });


    // -------------------------
    // PDF CONTENT
    // -------------------------

    doc
      .fontSize(25)
      .font("Helvetica-Bold")
      .fillColor("#7c3aed")
      .text("EventMe Booking Receipt");

    doc.moveDown();


    // Booking details

    doc
      .fontSize(12)
      .font("Helvetica")
      .fillColor("black")
      .text("Booking Reference: ", {
        continued: true,
      })
      .fillColor("#7c3aed")
      .text(booking.bookingReference);


    doc
      .fillColor("black")
      .text("Status: ", {
        continued: true,
      })
      .fillColor("#059669")
      .text(booking.status);


    doc
      .fillColor("black")
      .text("Booking Date: ", {
        continued: true,
      })
      .fillColor("#374151")
      .text(
        new Date(booking.createdAt).toLocaleDateString()
      );


    doc.moveDown();


    // Customer details

    doc
      .fontSize(18)
      .font("Helvetica-Bold")
      .fillColor("#7c3aed")
      .text("Customer Details");

    doc
      .fontSize(12)
      .font("Helvetica")
      .fillColor("black")
      .text(`Name: ${user.name}`);

    doc.text(`Email: ${user.email}`);


    doc.moveDown();


    // Event details

    doc
      .fontSize(18)
      .font("Helvetica-Bold")
      .fillColor("#7c3aed")
      .text("Event Details");

    doc
      .fontSize(12)
      .font("Helvetica")
      .fillColor("black")
      .text(`Event: ${event.title}`);

    doc.text(
      `Date: ${new Date(event.date).toLocaleDateString()}`
    );

    doc.text(`Time: ${event.time}`);

    doc.text(`Venue: ${event.location.venue}`);

    doc.text(
      `Location: ${event.location.city}, ${event.location.country}`
    );


    doc.moveDown();


    // Ticket details

    doc
      .fontSize(18)
      .font("Helvetica-Bold")
      .fillColor("#7c3aed")
      .text("Ticket Details");

    booking.tickets.forEach((ticket) => {
      const subtotal =
        ticket.price * ticket.quantity;

      doc
        .fontSize(12)
        .font("Helvetica")
        .fillColor("black")
        .text(
          `${ticket.ticketType} | Quantity: ${ticket.quantity} | Price: Rs.${ticket.price} | Subtotal: Rs.${subtotal}`
        );
    });


    doc.moveDown();


    // Total amount

    doc
      .fontSize(16)
      .font("Helvetica-Bold")
      .fillColor("#059669")
      .text(
        `Total Amount: Rs.${booking.totalAmount}`
      );


    // Very important
    doc.end();
  });
};

module.exports = generateReceiptPdf;
