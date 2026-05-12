const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  applyToJob,
  getMyApplications,
  getApplicants,
  updateApplicationStatus,
  getEachApp,
} = require("../controllers/applicationController");
const router = express.Router();

router.post("/jobs/:jobId/apply", authMiddleware, applyToJob);
router.get("/applications/myapplications", authMiddleware, getMyApplications);
router.get("/applications/job/:jobId", authMiddleware, getApplicants);
router.get("/applicants/:userId", authMiddleware, getEachApp);
router.patch(
  "/applications/:id/status",
  authMiddleware,
  updateApplicationStatus,
);

module.exports = router;
