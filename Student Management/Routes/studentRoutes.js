const express = require("express");
const router = express.Router();
const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  searchStudentByName,
  searchStudentByDepartment,
  searchByCourse,
  searchByGender,
  searchByCgpa,
  getStudentsWithLimit,
  sortedStudent,
  sortedStudentDesc,
  countTotalStudents,
  ActiveStudents,
  searchStudentByCity,
  topFiveStudents,
} = require("../Controller/studentController");

router.post("/create-student", createStudent);
router.get("/getAllStudents", getAllStudents);
router.get("/search", searchStudentByName);
router.get("/department", searchStudentByDepartment);
router.get("/gender", searchByGender);
router.get("/course", searchByCourse);
router.get("/cgpa",searchByCgpa);
router.get("/city",searchStudentByCity);
router.get("/getLimitedStudents",getStudentsWithLimit);
router.get("/sortedStudents", sortedStudent);
router.get("/sortedStudentsDsc", sortedStudentDesc);
router.get("/topStudents", topFiveStudents);
router.get("/totalStudents", countTotalStudents);
router.get("/activeStudents",ActiveStudents);
router.get("/:id", getStudentById);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;
