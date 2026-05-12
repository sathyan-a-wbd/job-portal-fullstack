const { Jobseeker } = require("../models/userModel");
const cloudinary = require("../config/cloudinary");

exports.updateResume = async (req, res) => {
  let newUploadedPublicId = null;

  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const jobseeker = await Jobseeker.findOne({ userId: req.userId });

    if (!jobseeker) {
      await cloudinary.uploader.destroy(req.file.filename, {
        resource_type: "raw",
      });
      return res.status(404).json({ message: "User not found" });
    }

    newUploadedPublicId = req.file.filename;

    // Delete old resume if exists
    if (jobseeker.resumePublicId) {
      try {
        await cloudinary.uploader.destroy(jobseeker.resumePublicId, {
          resource_type: "raw",
        });
      } catch (deleteErr) {
        console.log("Old resume deletion failed:", deleteErr.message);
      }
    }

    // Save new resume
    const updated = await Jobseeker.findOneAndUpdate(
      { userId: req.userId },
      {
        resume: req.file.path,
        resumeName: req.file.originalname,
        resumePublicId: req.file.filename,
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Resume uploaded successfully",
      resume: updated.resume,
      resumeName: updated.resumeName,
      resumePublicId: updated.resumePublicId,
    });
  } catch (err) {
    console.log("Resume upload error:", err.message);

    if (newUploadedPublicId) {
      try {
        await cloudinary.uploader.destroy(newUploadedPublicId, {
          resource_type: "raw",
        });
      } catch (cleanupErr) {
        console.log("Cleanup failed:", cleanupErr.message);
      }
    }

    return res.status(500).json({
      message: "Resume upload failed",
      error: err.message,
    });
  }
};

exports.deleteResume = async (req, res) => {
  try {
    const jobseeker = await Jobseeker.findOne({ userId: req.userId });

    if (!jobseeker) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!jobseeker.resumePublicId) {
      return res.status(400).json({ message: "No resume found to delete" });
    }

    // Delete from Cloudinary
    try {
      await cloudinary.uploader.destroy(jobseeker.resumePublicId, {
        resource_type: "raw",
      });
    } catch (deleteErr) {
      console.log("Cloudinary delete failed:", deleteErr.message);
      return res.status(500).json({ message: "Cloud file deletion failed" });
    }

    // Clear from DB
    await Jobseeker.findOneAndUpdate(
      { userId: req.userId },
      {
        resume: "",
        resumeName: "",
        resumePublicId: "",
      }
    );

    return res.status(200).json({
      message: "Resume deleted successfully",
    });
  } catch (err) {
    console.log("Delete resume error:", err);
    return res.status(500).json({
      message: "Resume delete failed",
      error: err.message,
    });
  }
};