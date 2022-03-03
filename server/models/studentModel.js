const mongoose = require("mongoose");

const studentSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please add First name."],
    },
    lastName: {
      type: String,
      required: [true, "Please add Last name."],
    },
    email: {
      type: String,
      required: [true, "Please add email."],
      unique: true,
    },
    mobile: {
      type: String,
      required: [true, "Please add mobile."],
    },
    dob: {
      type: String,
      required: [true, "Please add date of birth."],
    },
    faculty: {
      type: String,
      required: [true, "Please add faculty."],
    },
    course: {
      type: String,
      required: [true, "Please add course."],
    },
    year: {
      type: String,
      required: [true, "Please add year."],
    },
    country: {
      type: String,
      required: [true, "Please add country."],
    },
    gender: {
      type: String,
      required: [true, "Please add gender."],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("student", studentSchema);
