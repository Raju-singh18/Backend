const express = require("express");
const {
  localFileUpload,
  imageUpload,
  videoUpload,
  imageSizeReducer,
} = require("../controllers/fileRoutes");
const router = express.Router();

router.post("/fileUpload", localFileUpload);
router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);
router.post("/imageSizeReducer",imageSizeReducer)

module.exports = router;
