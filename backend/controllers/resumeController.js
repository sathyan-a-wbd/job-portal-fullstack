const cloudinary = require("../config/cloudinary");
const { Jobseeker } = require("../models/userModel");
const { Readable } = require("stream");

// ─── Helper: upload buffer to Cloudinary ─────────────────────────────────────
const uploadToCloudinary = (buffer, originalName) => {
  return new Promise((resolve, reject) => {
    const publicId = `${Date.now()}_${originalName
      .replace(/\s+/g, "_")
      .replace(/\.pdf$/i, "")}`;

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw",
        public_id: publicId,
        format: "pdf",
        overwrite: false,
        access_mode: "public",
        type: "upload",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      },
    );

    Readable.from(buffer).pipe(uploadStream);
  });
};

// ─── Helper: delete from Cloudinary ──────────────────────────────────────────
const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });
  } catch (err) {
    console.error("Cloudinary delete error:", err.message);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Upload resume (first time)
// @route   POST /api/resume/upload
// @access  Private (jobseeker)
// ─────────────────────────────────────────────────────────────────────────────
const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file provided" });
    }

    const jobseeker = await Jobseeker.findOne({ userId: req.userId });
    if (!jobseeker) {
      return res
        .status(404)
        .json({ success: false, message: "Jobseeker profile not found" });
    }

    if (jobseeker.resume) {
      return res.status(400).json({
        success: false,
        message:
          "Resume already exists. Use the update endpoint to replace it.",
      });
    }

    const result = await uploadToCloudinary(
      req.file.buffer,
      req.file.originalname,
    );

    jobseeker.resume = result.secure_url;
    jobseeker.resumePublicId = result.public_id;
    jobseeker.resumeName = req.file.originalname;
    await jobseeker.save();

    return res.status(201).json({
      success: true,
      message: "Resume uploaded successfully",
      data: {
        resumeUrl: jobseeker.resume,
        resumeName: jobseeker.resumeName,
        resumePublicId: jobseeker.resumePublicId,
      },
    });
  } catch (error) {
    console.error("uploadResume error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Update (replace) existing resume — old one deleted from Cloudinary
// @route   PUT /api/resume/update
// @access  Private (jobseeker)
// ─────────────────────────────────────────────────────────────────────────────
const updateResume = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file provided" });
    }

    const jobseeker = await Jobseeker.findOne({ userId: req.userId });
    if (!jobseeker) {
      return res
        .status(404)
        .json({ success: false, message: "Jobseeker profile not found" });
    }

    if (jobseeker.resumePublicId) {
      await deleteFromCloudinary(jobseeker.resumePublicId);
    }

    const result = await uploadToCloudinary(
      req.file.buffer,
      req.file.originalname,
    );

    jobseeker.resume = result.secure_url;
    jobseeker.resumePublicId = result.public_id;
    jobseeker.resumeName = req.file.originalname;
    await jobseeker.save();

    return res.status(200).json({
      success: true,
      message: "Resume updated successfully. Old resume deleted.",
      data: {
        resumeUrl: jobseeker.resume,
        resumeName: jobseeker.resumeName,
        resumePublicId: jobseeker.resumePublicId,
      },
    });
  } catch (error) {
    console.error("updateResume error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Delete resume from Cloudinary + clear DB fields
// @route   DELETE /api/resume/delete
// @access  Private (jobseeker)
// ─────────────────────────────────────────────────────────────────────────────
const deleteResume = async (req, res) => {
  try {
    const jobseeker = await Jobseeker.findOne({ userId: req.userId });
    if (!jobseeker) {
      return res
        .status(404)
        .json({ success: false, message: "Jobseeker profile not found" });
    }

    if (!jobseeker.resume) {
      return res
        .status(400)
        .json({ success: false, message: "No resume to delete" });
    }

    await deleteFromCloudinary(jobseeker.resumePublicId);

    jobseeker.resume = "";
    jobseeker.resumePublicId = "";
    jobseeker.resumeName = "";
    await jobseeker.save();

    return res.status(200).json({
      success: true,
      message: "Resume deleted successfully",
    });
  } catch (error) {
    console.error("deleteResume error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Get current resume info
// @route   GET /api/resume
// @access  Private (jobseeker)
// ─────────────────────────────────────────────────────────────────────────────
const getResume = async (req, res) => {
  try {
    const jobseeker = await Jobseeker.findOne({ userId: req.userId }).select(
      "resume resumeName resumePublicId",
    );

    if (!jobseeker) {
      return res
        .status(404)
        .json({ success: false, message: "Jobseeker profile not found" });
    }

    return res.status(200).json({
      success: true,
      data: {
        resumeUrl: jobseeker.resume || null,
        resumeName: jobseeker.resumeName || null,
        resumePublicId: jobseeker.resumePublicId || null,
        hasResume: !!jobseeker.resume,
      },
    });
  } catch (error) {
    console.error("getResume error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

module.exports = { uploadResume, updateResume, deleteResume, getResume };
