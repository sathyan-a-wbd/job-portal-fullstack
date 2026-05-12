const SavedJobs = require("../models/SavedJobs");
const { Job } = require("../models/jobModel");

const SavedJob = require("../models/SavedJob");

const saveJob = async (req, res) => {
  try {
    const userId = req.userId;
    const { jobId } = req.params;

    // check already saved
    const alreadySaved = await SavedJob.findOne({
      user: userId,
      job: jobId,
    });

    if (alreadySaved) {
      return res.status(400).json({
        success: false,
        message: "Job already saved",
      });
    }

    const savedJob = await SavedJob.create({
      user: userId,
      job: jobId,
    });

    res.status(201).json({
      success: true,
      message: "Job saved successfully",
      savedJob,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const unsaveJob = async (req, res) => {
  try {
    const userId = req.userId;
    const { jobId } = req.params;

    await SavedJob.findOneAndDelete({
      user: userId,
      job: jobId,
    });

    res.status(200).json({
      success: true,
      message: "Job removed from saved",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const getSavedJobs = async (req, res) => {
  try {
    const userId = req.userId;

    const savedJobs = await SavedJob.find({
      user: userId,
    }).populate("job");

    res.status(200).json({
      success: true,
      savedJobs,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
