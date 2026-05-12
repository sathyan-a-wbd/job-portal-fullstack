const router = require("express").Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const {
  saveJob,
  unsaveJob,
  getSavedJobs,
} = require("../controllers/controller.savedJobs");

router.post("/save/:jobId", authMiddleware, saveJob);

router.delete("/unsave/:jobId", authMiddleware, unsaveJob);

router.get("/saved", authMiddleware, getSavedJobs);
