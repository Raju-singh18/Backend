const express = require("express");
const {
  signUp,
  login,
  sentOtp,
  changePassword,
  resetPasswordToken,
  resetPassword,
} = require("../controllers/AuthControllers");
const {auth } = require("../middlewares/auth")

const router = express.Router();

router.post("/send-otp", sentOtp);
router.post("/signup", signUp);
router.post("/login", login);
router.post("/change-password",auth, changePassword);
router.post("/reset-password-token",auth, resetPasswordToken);
router.post("/reset-password", auth, resetPassword);

module.exports = router;
