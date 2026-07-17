const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    if (!payload) {
      return res.status(400).json({
        success: false,
        message: "Token in Invalid",
      });
    }
    req.user = payload;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.isStudent = async (req, res, next) => {
  try {
    const role = req.user.accountType;
    if (role !== "Student") {
      return res.status(400).json({
        success: false,
        message:
          "Your role is not matching because This is protected route for Student",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Your Role is missing...",
    });
  }
};

exports.isInstructor = async (req, res, next) => {
  try {
    const role = req.user.accountType;
    if (role !== "Instructor") {
      return res.status(400).json({
        success: false,
        message:
          "Your role is not matching because This is protected route for Instructor",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Your Role is missing...",
    });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    const role = req.user.accountType;
    if (role !== "Admin") {
      return res.status(400).json({
        success: false,
        message:
          "Your role is not matching because This is protected route for Admin",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Your Role is missing...",
    });
  }
};

