const { User } = require("../models/userModel");
const cloudinary = require("../config/cloudinary");

// exports.updateResume = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     const user = await User.findById(req.userId);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     //  STEP 1: Delete old resume if exists
//     if (user.resume) {
//       const oldPath = path.join(__dirname, "..", user.resume);

//       if (fs.existsSync(oldPath)) {
//         fs.unlinkSync(oldPath); // delete file
//       }
//     }

//     // STEP 2: Save new resume
//     const resumePath = req.file.path.replace(/\\/g, "/");

//     // STEP 3: Update DB
//     user.resume = resumePath;
//     user.resumeName = req.file.originalname;

//     await user.save();

//     return res.status(200).json({
//       message: "Resume updated successfully",
//       resume: user.resume,
//       resumeName: user.resumeName,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Resume upload failed" });
//   }
// };

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
// exports.deleteResume = async (req, res) => {
//   try {
//     const user = await User.findById(req.userId);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Delete file from folder
//     if (user.resume) {
//       const filePath = path.join(__dirname, "..", user.resume);

//       if (fs.existsSync(filePath)) {
//         fs.unlinkSync(filePath);
//       }
//     }

//     //Remove from DB
//     user.resume = "";
//     user.resumeName = "";

//     await user.save();

//     return res.status(200).json({
//       message: "Resume deleted successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Delete failed" });
//   }
// };
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
