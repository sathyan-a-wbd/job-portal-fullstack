const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const experienceSchema = new Schema(
  {
    role: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    duration: {
      type: [String],
      validate: {
        validator: (val) => val.length === 2,
        message: "Duration must have start and end",
      },
      default: [],
    },
    description: { type: String, default: "", trim: true },
  },
  { _id: true },
);

const educationSchema = new Schema(
  {
    courseName: { type: String, required: true, trim: true },
    collegeName: { type: String, required: true, trim: true },
    duration: {
      type: [String],
      validate: {
        validator: (val) => val.length === 2,
        message: "Duration must have start and end",
      },
      default: [],
    },
  },
  { _id: true },
);

const employerSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
  companyName: { type: String, default: "" },
  companyEmail: { type: String, default: "" },
  companyLocation: { type: String, default: "" },
  website: { type: String, default: "" },
  companyAddress: { type: String, default: "" },
  companyLocationMapLink: { type: String, default: "" },
  description: { type: String, default: "" },
  profileImage: { type: String, default: "" },
});

const userSchema = new Schema(
  {
    userType: {
      type: String,
      enum: ["jobseeker", "employer"],
      required: true,
    },

    fname: { type: String, required: true, trim: true },

    mail: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email"],
    },

    password: { type: String, required: true, minlength: 6 },

    mobile: { type: String, default: "" },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true },
);
const jobseekerSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
  location: { type: String, default: "" },
  dob: { type: String, default: "" },

  profileSummary: { type: String, default: "", maxlength: 500 },

  skills: { type: [String], default: [] },
  languages: { type: [String], default: [] },

  jobPrefrence: { type: [String], default: [] },
  availabilty: {
    type: String,
    enum: ["Immediate", "15 Days", "1 Month", "2 Month", "3 Month", ""],
    default: "",
  },

  preferredLocation: { type: [String], default: [] },

  experience: { type: [experienceSchema], default: [] },
  educations: { type: [educationSchema], default: [] },

  profileImage: { type: String, default: "" },

  // company: {
  //   type: companySchema,
  //   default: null,
  // },
  resume: {
    type: String,
    default: "",
  },
  aiSummaryCount: {
    type: Number,
    default: 0,
  },
  lastSummaryDate: {
    type: Date,
    default: null,
  },
  resumeUrl: {
    type: String,
    default: "",
  },
  resumeName: {
    type: String,
    default: "",
  },
  resumePublicId: {
    type: String,
  },
});
const User = mongoose.model("User", userSchema);
const Employer = mongoose.model("Employer", employerSchema);
const Jobseeker = mongoose.model("Jobseeker", jobseekerSchema);
module.exports = { User, Employer, Jobseeker };
