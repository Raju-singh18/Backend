
const express = require("express");
const { createUser, loginUser } = require("../controllers/userControllers");
const { auth, isStudent, isAdmin } = require("../middlewares/auth");
const router = express.Router();

router.post("/register",createUser);
router.post("/login",loginUser);
router.post('/test',auth,(req, res)=>{
    res.status(200).json({
        success:true,
        message:"This is protected for test"
    })
})

router.post('/isStudent',auth, isStudent, (req, res)=>{
    res.status(200).json({
        success:true,
        message:"This is protected for Student"
    })
})

router.post('/isAdmin',auth, isAdmin, (req, res)=>{
    res.status(200).json({
        success:true,
        message:"This is protected for Admin"
    })
})

module.exports = router;
