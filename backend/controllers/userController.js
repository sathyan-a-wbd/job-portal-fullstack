const { User } = require("../models/userModel");
const cloudinary = require("../config/cloudinary");

exports.updateResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete old resume from Cloudinary
    if (user.resumePublicId) {
      await cloudinary.uploader.destroy(user.resumePublicId, {
        resource_type: "raw",
      });
    }

    // Save new resume
    user.resume = req.file.path; // URL
    user.resumeName = req.file.originalname;
    user.resumePublicId = req.file.filename;

    await user.save();

    res.status(200).json({
      message: "Resume uploaded",
      resume: user.resume,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Upload failed" });
  }
};

exports.deleteResume = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (user.resumePublicId) {
      await cloudinary.uploader.destroy(user.resumePublicId, {
        resource_type: "raw",
      });
    }

    user.resume = "";
    user.resumePublicId = "";
    user.resumeName = "";

    await user.save();

    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};
