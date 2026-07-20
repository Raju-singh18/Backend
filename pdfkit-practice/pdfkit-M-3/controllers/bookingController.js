
const generateReceiptPdf = require("../utils/generateReceiptPdf");

const booking = {
  bookingReference: "EVT-2026-1001",
  status: "confirmed",
  totalAmount: 1500,

  tickets: [
    {
      ticketType: "VIP",
      price: 1000,
      quantity: 1,
    },
    {
      ticketType: "Regular",
      price: 500,
      quantity: 1,
    },
  ],
};

const event = {
  title: "Tech Innovation Summit 2026",
  date: "2026-08-15T00:00:00.000Z",
  time: "10:00 AM - 5:00 PM",

  location: {
    venue: "India Expo Centre",
    city: "Greater Noida",
    country: "India",
  },
};

const user = {
  name: "Raju Kumar Singh",
  email: "rajusingh@example.com",
};


exports.downloadReceipt = (req, res) => {
  try {
    // Generate PDF document
    const doc = generateReceiptPdf(
      booking,
      event,
      user
    );

    // Tell client that response is PDF
    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    // Tell browser to download the file
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="eventme-receipt.pdf"'
    );

    // Send PDF to client
    doc.pipe(res);

    // Finish PDF
    doc.end();

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "PDF generation failed",
      error: error.message,
    });
  }
};
