const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Student = require("../models/studentModel");

//@desc Get student
//@route GET /api/students
//@access Private
const getStudent = asyncHandler(async (req, res) => {
  const students = await Student.find();
  res.status(200).json(students);
});

//@desc Set student
//@route POST /api/students
//@access Private
const setStudent = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    mobile,
    dob,
    faculty,
    course,
    year,
    country,
    gender,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !mobile ||
    !dob ||
    !faculty ||
    !course ||
    !year ||
    !country ||
    !gender
  ) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  //Check if student exists using email
  const studentData = await Student.findOne({ email });

  if (studentData) {
    res.status(400);
    throw new Error("Student already exists");
  }

  //Hash password
  //const salt = await bcrypt.genSalt(10);
  //const hashedPassword = await bcrypt.hash(password, salt);

  //Create student
  const student = await Student.create({
    firstName,
    lastName,
    email,
    mobile,
    dob,
    faculty,
    course,
    year,
    country,
    gender,
  });

  if (student) {
    res.status(201).json({
      _id: student.id,
      firstName: student.firstName,
      email: student.lastName,
      mobile: student.mobile,
      dob: student.dob,
    });
  } else {
    res.status(400);
    throw new Error("Invalid student data");
  }
});

//@desc Update student
//@route PUT /api/students/:id
//@access Private
const updateStudent = asyncHandler(async (req, res) => {
  const recordId = await Student.findById(req.params.id);
  if (!recordId) {
    res.status(400);
    throw new Error("Student not found");
  }

  const updateStudent = await Student.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updateStudent);
  //res.status(200).json({ message: `Update student ${req.params.id}` });
});

//@desc Delete students
//@route DELETE /api/students/:id
//@access Private
const deleteStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (!student) {
    res.status(400);
    throw new Error("Student not found");
  }

  await student.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getStudent,
  setStudent,
  updateStudent,
  deleteStudent,
};
