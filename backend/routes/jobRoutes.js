const express = require("express");
const router = express.Router();
const Job = require("../models/jobModel");
const { User, Employer } = require("../models/userModel");
const authMiddleware = require("../middleware/authMiddleware");
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
    const jobs = await Job.find().populate("createdBy", "name email");
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const mongoose = require("mongoose"); // Ensure mongoose is imported at the top

router.get("/my-jobs", authMiddleware, async (req, res) => {
  try {
    if (!req.userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No user ID found" });
    }

    const jobs = await Job.find({
      createdBy: new mongoose.Types.ObjectId(req.userId),
    }).sort({
      createdAt: -1,
    });

    console.log(`Found ${jobs.length} jobs for user ${req.userId}`);

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
