const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    companyImg: {
      type: String,
      default: "https://via.placeholder.com/150",
    },
    experience: {
      type: String,
      required: true,
      default: "0-1 years",
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    skills: {
      type: [String], // Array of strings
      default: [],
    },
    responsibilities: {
      type: [String],
      default: [],
    },
    workLocation: {
      type: String,
      enum: ["Remote", "On-site", "Hybrid"], // Restricts to these 3 options
      default: "On-site",
    },
    salary: {
      type: String,
      default: "Not Disclosed",
    },
    industryType: {
      type: String,
      default: "",
    },
    department: {
      type: String,
      default: "",
    },
    employmentType: {
      type: String,
      default: "Full Time, Permanent",
    },
    roleCategory: {
      type: String,
      default: "",
    },
    saved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
