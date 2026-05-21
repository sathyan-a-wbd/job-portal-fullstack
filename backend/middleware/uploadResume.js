const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const path = require("path");

const storage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => {
    const ext = path.extname(file.originalname);

    const fileName = path
      .basename(file.originalname, ext)
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9_-]/g, "");

    return {
      folder: "resumes",

      resource_type: "image",

      format: "pdf",

      public_id: `resume_${Date.now()}_${fileName}`,
    };
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ["application/pdf"];

  if (!allowed.includes(file.mimetype)) {
    return cb(new Error("Only PDF files allowed"), false);
  }

  cb(null, true);
};

const uploadResume = multer({
  storage,

  fileFilter,

  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

module.exports = uploadResume;
