
const PDFDocument = require("pdfkit");

const generateReceiptPdf = (booking, event, user) => {
  const doc = new PDFDocument({
    size: "A4",
    margin: 50,
  });

  // PDF title
  doc
    .fontSize(25)
    .font("Helvetica-Bold")
    .fillColor("#7c3aed")
    .text("EventMe Booking Receipt");

  doc.moveDown();

  // Booking Reference
  doc
    .fontSize(12)
    .font("Helvetica")
    .fillColor("black")
    .text("Booking Reference: ", {
      continued: true,
    })
    .fillColor("#7c3aed")
    .text(booking.bookingReference);

  // Customer Name
  doc
    .fillColor("black")
    .text("Customer Name: ", {
      continued: true,
    })
    .fillColor("#dc2626")
    .text(user.name);

  // Email
  doc
    .fillColor("black")
    .text(`Email: ${user.email}`);

  doc.moveDown();

  // Event Details
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

  doc.text(
    `Venue: ${event.location.venue}`
  );

  doc.text(
    `Location: ${event.location.city}, ${event.location.country}`
  );

  doc.moveDown();

  // Ticket Details
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

  // Total Amount
  doc
    .fontSize(16)
    .font("Helvetica-Bold")
    .fillColor("#059669")
    .text(
      `Total Amount: Rs.${booking.totalAmount}`
    );

  return doc;
};

module.exports = generateReceiptPdf;
