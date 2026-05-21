const express = require("express");
const router = express.Router();

const {
  uploadResume,
  updateResume,
  deleteResume,
  getResume,
} = require("../controllers/resumeController");
const upload = require("../middleware/uploadMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

// All routes are protected — only logged-in jobseekers
router.get("/", authMiddleware, getResume);
router.post("/upload", authMiddleware, upload.single("resume"), uploadResume);
router.put("/update", authMiddleware, upload.single("resume"), updateResume);
router.delete("/delete", authMiddleware, deleteResume);

module.exports = router;
