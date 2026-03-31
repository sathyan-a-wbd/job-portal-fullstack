const express = require("express");
const router = express.Router();
const Job = require("../models/jobModel");

router.post("/job_post", async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
