const mongoose = require("mongoose");
const User = require("../models/User");
const otpGenerator = require("otp-generator");
const OTP = require("../models/OTP");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mailSender = require("../utils/mailSender");
const Profile = require("../models/Profile");
require("dotenv").config();


// Send OTp
exports.sentOtp = async (req, res) => {
  try {
    const { email } = req.body;

    // check email is already exists or not
    const user = await User.findOne({ email: email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already registered with this email..",
      });
    }

    // ! OTP uniqueness using pahala tarika
    // let otp = otpGenerator.generate(6, {
    //   upperCaseAlphabets: false,
    //   lowerCaseAlphabets: false,
    //   specialChars: false,
    // });

    // let result = await OTP.findOne({ otp });
    // while (result) {
    //   otp = otpGenerator.generate(6, {
    //     upperCaseAlphabets: false,
    //     lowerCaseAlphabets: false,
    //     specialChars: false,
    //   });
    //   result = await OTP.findOne({ otp });
    // }

    // ! otp uniqueness using dusara tarika
    const otp = crypto.randomInt(100000, 1000000).toString();

    console.log(otp);
    await OTP.deleteMany({ email });

    const otpPayload = {
      email,
      otp,
    };

    await OTP.create(otpPayload);

    return res.status(200).json({
      success: true,
      message: "Otp Sent Successfully...!",
    });
  } catch (error) {
    console.error("Error while sending OTP:", error);

    return res.status(500).json({
      success: false,
      message: "Error while sending OTP.",
    });
  }
};

// Signup
exports.signUp = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      otp,
    } = req.body;
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res.status(402).json({
        success: false,
        message: "All Fields required...",
      });
    }
    if (password !== confirmPassword) {
      return res.status(500).json({
        success: false,
        message: "Password do not match..!",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email.",
      });
    }

    const DbOtp = await OTP.findOne({ email });
    // Check OTP exists
    if (!DbOtp) {
      return res.status(400).json({
        success: false,
        message: "OTP expired or not found. Please request a new OTP.",
      });
    }
    if (otp !== DbOtp.otp) {
      return res.status(200).json({
        success: false,
        message: "Otp does not match, please try again..",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let imageUrl = `https://api.dicebear.com/9.x/initials/svg?seed=${firstName} ${lastName}`;
    let profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
      image: imageUrl,
    });

    await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType,
      additionalDetails: profileDetails._id,
    });
    return res.status(200).json({
      success: true,
      message: "Email Verified and User Registered Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found with this email.",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(500).json({
        success: false,
        message: "Incorrect Password",
      });
    }

    const payload = {
      accountType: user.accountType,
      id: user._id,
      email: email,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res
      .cookie("token", token, options)
      .status(200)
      .json({
        success: true,
        message: "User logged In Successfully..!",
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          accountType: user.accountType,
        },
      });
  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Change Password
exports.changePassword = async (req, res) => {
  try {
    const userId = req.user.id;

    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    // Check required fields
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Check new password and confirm password
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirm password do not match.",
      });
    }

    // Find user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Compare old password
    const isPasswordMatched = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: "Old password is incorrect.",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully.",
    });
  } catch (error) {
    console.error("Change Password Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// resetPasswordToken
exports.resetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }
    const token = crypto.randomUUID();
    // Token expiration: 15 minutes
    const tokenExpiry = new Date(Date.now() + 15 * 60 * 1000);

    // Save token in database
    user.token = token;
    user.resetPasswordExpires = tokenExpiry;

    await user.save();

    // Reset password URL
    const url = `http://localhost:3000/resetpassword/${token}`;

    // Send email
    await mailSender(
      email,
      "Reset Password Link",
      `Click the link below to reset your password:
      
      <a href="${url}">${url}</a>
      
      This link will expire in 15 minutes.`,
    );
    return res.status(200).json({
      success: true,
      message: "Reset password verification link sent Successfully..!",
      user
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ResetPassword
exports.resetPassword = async (req, res) => {
  try {
    const {token, newPassword, confirmNewPassword } = req.body;
    console.log("token => ",token);
    // Validate input
    if (!token || !newPassword ||!confirmNewPassword) {
      return res.status(400).json({
        success: false,
        message: "Token,confirmNewPassword and new password are required.",
      });
    }

    // Check new password and confirm password
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirm password do not match.",
      });
    }

    // Find user by reset token
    const user = await User.findOne({ token });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid password reset token.",
      });
    }

    // Check token expiration
    if (
      !user.resetPasswordExpires ||
      user.resetPasswordExpires < Date.now()
    ) {
      return res.status(400).json({
        success: false,
        message: "Reset password link expired. Please try again.",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    // Update password
    user.password = hashedPassword;

    // Invalidate reset token
    user.token = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Your password was reset successfully.",
    });
  } catch (error) {
    console.error("Reset Password Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

