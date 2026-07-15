const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    // Check whether user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      role,
    });

    // Save user
    await user.save();

    return res.status(201).json({
      success: true,
      user,
      message: "User registered successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not exist with this email",
      });
    }
    const isMatchedPassword = await bcrypt.compare(password, user.password);
    if (!isMatchedPassword) {
      return res.status(400).json({
        success: false,
        message: "Password do not match",
      });
    }

    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };

    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    user = user.toObject();
    user.token = token;
    user.password = undefined;

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    // ! TOKEN IN HTTP-ONLY COOKIE
    // res.cookie("token",token,options).json({
    //     success:true,
    //     message:"User loggedIn Successfully..."
    // });

    // ! TOKEN IN RESPONSE BODY
    return res.status(200).json({
        success:true,
        message:"User logged In Successfully..",
        user:user
    })

    // ! TOKEN IN AUTHORIZATION RESPONSE HEADER
    // res.setHeader("Authorization", `Bearer ${token}`); 
    
    // return res.status(200).json({
    //   success: true,
    //   message: "User logged in successfully",
    // });

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
