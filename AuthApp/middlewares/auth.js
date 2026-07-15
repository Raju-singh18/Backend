const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

exports.auth = async (req, res, next) => {
  try {
    // ! Authorization through token of re body
    const token = req.body.token;
    // ! Authorization through cookie
    // const token = req.cookies.token;
    // ! Authorization through headers
    // const authHeader = req.headers.authorization;

    // if (!authHeader) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Authorization header is missing",
    //   });
    // }

    // const token = authHeader.replace("Bearer ", "");

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
      message: "Token id missing",
    });
  }
};

exports.isStudent = async(req ,res, next)=>{
    try {
        const role = req.user.role;
        if(role != "User"){
          return res.status(400).json({
            success:false,
            message:"Your role is not matching because This is protected route for User"
          })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Your Role is missing..."
        })
    }
}

exports.isAdmin = async(req, res, next)=>{
    try {
        const role = req.user.role;
        if(role !="Admin"){
            return res.status(500).json({
                success:false,
                message:"Your role is not matching because This is protected route for Admin"
            })
        }

        next();
    } catch (error) {
        return res.status({
            success:false,
            message:"Your Role is missing..."
        })
    }
}
