const express = require("express");

const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

app.use(express.json());

app.use(
  "/api/bookings",
  bookingRoutes
);

app.listen(5000, () => {
  console.log(
    "Server running on port 5000"
  );
});
