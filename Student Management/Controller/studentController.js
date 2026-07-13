const Student = require("../model/Student");

exports.createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Students created Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const allStudents = await Student.find();
    return res.status(201).json({
      success: true,
      message: "All Students found Successfully...",
      students: allStudents,
    });
  } catch (error) {
    return res.status(400).json({
      success: true,
      message: error.message,
    });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    return res.status(201).json({
      success: true,
      message: "Student found by Id Successfully...",
      student: student,
    });
  } catch (error) {
    return res.status(400).json(
        { success: false,
          message: error.message 
        });
  }
};

exports.updateStudent = async(req, res)=>{
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body,{new:true});
        return res.status(201).json({
            success:true,
            message:"Student updated successfully...",
            updatedStudent:student
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

exports.deleteStudent = async(req, res)=>{
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        return res.status(201).json({
            success:true,
            message:"Student Deleted Successfully",
            deletedStudent:deletedStudent
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

exports.searchStudentByName = async (req, res) => {
    try {
        const { name } = req.query;

        const searchedStudents = await Student.find({
            firstName: {
                $regex: name,
                $options: "i"
            }
        });

        if (searchedStudents.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No student found."
            });
        }

        return res.status(200).json({
            success: true,
            totalSearchedStudents: searchedStudents.length,
            searchedStudents,
            message: "Students found successfully."
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.searchStudentByDepartment = async(req, res)=>{
    try {
        const department = req.query.department;
        const students = await Student.find({department});

        return res.status(201).json({
            success:true,
            message :"Student found by department",
            searchedStudentBydepartment:students
        })
    } catch (error) {
        return res.status(400).json({
            success:true,
            message: error.message
        })
    }
}

exports.searchByCourse = async(req, res) =>{
    try {
        const students = await Student.find({course: req.query.course});

        return res.status(201).json({
            success:true,
            message: "Students found by Course",
            students: students
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

// !Filter by Gender
exports.searchByGender= async(req, res) =>{
    try {
        const searchedStudents = await Student.find(
            {
                gender: req.query.gender
            }
        );

        return res.status(201).json({
            success:true,
            message: "Students founds successfully by gender...",
            students:searchedStudents
        })
    } catch (error) {
        return res.status(400).json({
            success:true,
            message:error.message
        })
    }
}

//! Filter by CGPA
exports.searchByCgpa = async(req, res)=>{
    try {
        const searchedStudents = await Student.find({
            cgpa:req.query.cgpa
        });
        if(searchedStudents.length===0){
            return res.status(401).json({
                success:false,
                message:"There is no student with cgpa"
            })
        }else{
            return res.status(201).json({
                success:true,
                message:"Students Founds...",
                students:searchedStudents
            })
        }
    } catch (error) {
        return res.status(400).json({
            success:true,
            message:error.message
        })
    }
}

// !Pagination
exports.getStudentsWithLimit = async(req, res) =>{
    try {
        const page=Number(req.query.page);
        const limit=Number(req.query.limit);

        const searchedStudents = await Student.find()
        .skip((page - 1) * limit).limit(limit);

        return res.status(201).json({
            success:true,
            message:"Student Found Successfully...",
            students: searchedStudents
        })
    } catch (error) {
        return res.status(400).json({
            success:true,
            message:error.message
        })
    }
}

// !Sort by Name
// ? Ascending Order
exports.sortedStudent = async(req, res)=>{
    try {
        const students = await Student.find().sort({
            firstName: 1
        })

        return res.status(201).json({
            success: true,
            message:"All Students found Successfully...",
            students
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

//? Descending Order 
exports.sortedStudentDesc = async(req, res)=>{
    try {
        const students = await Student.find().sort({
            firstName: -1
        })

        return res.status(201).json({
            success: true,
            message:"All Students found Successfully...",
            students
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

// !Count Total Students
exports.countTotalStudents = async(req, res)=>{
    try {
        const totalStudents = await Student.find().countDocuments();
        
        return res.status(201).json({
            success:true,
            message:"Total Count of Students found Successfully...",
            totalStudents
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message: erroe.message
        })
    }
}

//! Active Students
exports.ActiveStudents = async(rea,res)=>{
    try {
        const Activestudents = await Student.find({
            isActive:true
        })

        return res.status(201).json({
            success:true,
            message:"Active Students found successfully...",
            Activestudents
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

// ! Student by City
exports.searchStudentByCity = async(req, res)=>{
    try {
        const students = await Student.find({
            city:req.query.city
        });

        return res.status(200).json({
            success:true,
            message:"Students Found Successfully...",
            students
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

// ! Top 5 Students by CGPA
exports.topFiveStudents = async(req, res)=>{
    try {

        const students = await Student.find()
            .sort({
                cgpa: -1
            })
            .limit(5);


        return res.status(200).json({
            success: true,
            message:"Top Five Students found successfully...",
            students
        });

    } catch (error) {

        return res.status(400).json({
            success:false,
            message:error.message
        });

    }
};