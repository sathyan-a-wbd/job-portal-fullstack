const express = require("express");
const router = express.Router();
const Job = require("../models/jobModel");
const { User, Employer } = require("../models/userModel");
const authMiddleware = require("../middleware/authMiddleware");

const mongoose = require("mongoose");
router.post("/create-job", authMiddleware, async (req, res) => {
  try {
    if (req.userRole !== "employer") {
      return res
        .status(403)
        .json({ message: "Only employers can create jobs" });
    }
    const employer = await Employer.findOne({ userId: req.userId });
    if (!employer) {
      return res.status(404).json({ message: "Employer profile not found" });
    }
    const job = await Job.create({
      ...req.body,

      companyName: employer.companyName,
      companyLogo: employer.profileImage,
      companyEmail: employer.companyEmail,
      createdBy: req.userId,
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.get("/all-jobs", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const totalJobs = await Job.countDocuments();

    const jobs = await Job.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    res.status(200).json({
      jobs,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalJobs / limit),
        hasNextPage: page < Math.ceil(totalJobs / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/my-jobs-employer", authMiddleware, async (req, res) => {
  try {
    if (!req.userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No user ID found" });
    }
    if (req.userRole !== "employer") {
      return res
        .status(403)
        .json({ message: "Only employers can Access this resource" });
    }

    const jobs = await Job.find({
      createdBy: new mongoose.Types.ObjectId(req.userId),
    }).sort({
      createdAt: -1,
    });

    res.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: error.message });
  }
});

router.put("/update-job/:id", authMiddleware, async (req, res) => {
  try {
    if (req.userRole !== "employer") {
      return res
        .status(403)
        .json({ message: "Only employers can update jobs" });
    }
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    if (job.createdBy.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "You can only update your own jobs" });
    }
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.delete("/delete-job/:id", authMiddleware, async (req, res) => {
  try {
    if (req.userRole !== "employer") {
      return res
        .status(403)
        .json({ message: "Only employers can delete jobs" });
    }
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
