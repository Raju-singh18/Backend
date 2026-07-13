const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      rquired: true,
      unique: true,
    },
    city: {
      type: String,
    },
    address: {
      type: String,
    },
    state: {
      type: String,
    },
    pinCode: {
      type: Number,
    },
    phoneNumber: {
      type: Number,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    semester: {
      type: Number,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
    },
    rollNumber: {
      type: String,
      required: true,
      unique: true,
    },
    cgpa: {
      type: Number,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model("Student", studentSchema);
