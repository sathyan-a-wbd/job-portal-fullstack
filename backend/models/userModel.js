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

const companySchema = new Schema({
  companyName: { type: String, default: "" },
  companyEmail: { type: String, default: "" },
  companyLocation: { type: String, default: "" },
  website: { type: String, default: "" },
  description: { type: String, default: "" },
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
    location: { type: String, default: "" },
    dob: { type: String, default: "" },

    profileSummary: { type: String, default: "", maxlength: 500 },

    skills: { type: [String], default: [] },
    languages: { type: [String], default: [] },

    jobPrefrence: { type: [String], default: [] },
    availabilty: {
      type: String,
      enum: ["Immediate", "15 Days", "1 Month", "2 Months", "3 Months", ""],
      default: "",
    },

    preferredLocation: { type: [String], default: [] },

    experience: { type: [experienceSchema], default: [] },
    educations: { type: [educationSchema], default: [] },

    profileImage: { type: String, default: "" },

    company: {
      type: companySchema,
      default: null,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
