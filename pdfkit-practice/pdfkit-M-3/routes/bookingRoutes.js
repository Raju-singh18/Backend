const express = require("express");

const router = express.Router();

const {
  downloadReceipt,
} = require("../controllers/bookingController");

router.get(
  "/download-receipt",
  downloadReceipt
);

module.exports = router;
