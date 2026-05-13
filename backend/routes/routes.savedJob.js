const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  saveJob,
  unsaveJob,
  getSavedJobs,
} = require("../controllers/controller.savedJobs");
const router = express.Router();

router.post("/save/:jobId", authMiddleware, saveJob);

router.delete("/unsave/:jobId", authMiddleware, unsaveJob);

router.get("/saved", authMiddleware, getSavedJobs);

module.exports = router;
