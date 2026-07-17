const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const File = require("../models/File");

exports.localFileUpload = async (req, res) => {
  try {
    const file = req.files.file;

    console.log("Image file =>", file);

    // Extract file extension
    const extension = file.name.split(".")[1];

    // Create file path
    const path = __dirname + "/files/" + Date.now() + "." + extension;

    file.mv(path, (error) => {
      if (error) {
        console.log(error.message);
        return res.status(500).json({
          success: false,
          message: "File upload failed",
        });
      }

      return res.status(200).json({
        success: true,
        message: "File uploaded successfully",
      });
    });
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

function isSupportedType(fileType, supportedTypes) {
  return supportedTypes.includes(fileType);
}

async function uploadFileToCloudinary(file, folder, quality) {
  const options = {
    folder: folder,
    resource_type: "auto",
  };

  if (quality) {
    options.quality = quality;
  }

  const response = await cloudinary.uploader.upload(
    file.tempFilePath,
    options
  );

  return response;
}

exports.imageUpload = async (req, res) => {
  try {
    const { name, email, tags } = req.body;

    const imageFile = req.files.imageFile;

    console.log("imageFile:", imageFile);

    const fileType = imageFile.name
      .split(".")
      .pop()
      .toLowerCase();

    console.log("image type:", fileType);

    const supportedTypes = ["jpg", "png", "jpeg"];

    if (!isSupportedType(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "Image type not supported",
      });
    }

    const response = await uploadFileToCloudinary(
      imageFile,
      "FileUpload/images"
    );

    console.log("response:",response);

    const data = await File.create({
      name,
      imageUrl: response.secure_url,
      tags,
      email,
    });

    return res.status(200).json({
      success: true,
      message: "Image file uploaded to Cloudinary successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.videoUpload = async(req, res) =>{
  try {

    const { name, email, tags } = req.body;
    let videoFile = req.files.videoFile;
    const videoType = videoFile.name.split(".").pop().toLowerCase();
    const supportedType = ["mp4","mov", "mkv"];
    if(!isSupportedType(videoType, supportedType)){
      return res.status(500).json({
        success:true,
        message:"video file do not support"
      })
    }
    const response = await uploadFileToCloudinary(videoFile, "FileUpload/videos");

    const data = await File.create({
      name,
      imageUrl:response.secure_url,
      tags,
      email,
    })

    return res.status(400).json({
      success:true,
      message:"VideoFile Uploaded to cloudinary successfully..",
      data:data
    })

  } catch (error) {
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
}

exports.imageSizeReducer = async (req, res) => {
  try {
    const { name, tags, email } = req.body;

    const file = req.files.imageFile;

    const supportedTypes = ["jpg", "jpeg", "png"];

    const fileType = file.name.split(".").pop().toLowerCase();

    if (!isSupportedType(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "Image type is not supported",
      });
    }

    // Upload image with quality reduction
    const response = await uploadFileToCloudinary(
      file,
      "FileUpload/reduced-images",
      "auto"
    );

    const fileData = await File.create({
      name,
      imageUrl: response.secure_url,
      tags,
      email,
    });

    return res.status(200).json({
      success: true,
      message: "Image size reduced and uploaded successfully",
      data: fileData,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while reducing image size",
      error: error.message,
    });
  }
};
