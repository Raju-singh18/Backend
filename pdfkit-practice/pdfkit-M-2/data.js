const booking = {
  bookingReference: "EVT-2026-1001",
  status: "confirmed",
  createdAt: "2026-07-20T10:30:00.000Z",
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

module.exports = {booking,event, user};
