const express = require("express");
const router = express.Router();
const { User, Employer, Jobseeker } = require("../models/userModel");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadResume");
const { updateResume, deleteResume } = require("../controllers/userController");

// ✅ Register
router.post("/register", async (req, res) => {
  try {
    const {
      fname,
      mail,
      mobile,
      password,
      userType,
      companyName,
      companyEmail,
      companyLocation,
      website,
      description,
    } = req.body;

    const existingUser = await User.findOne({ mail });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let userData = {
      fname,
      mail,
      mobile,
      password: hashedPassword,
      userType,
    };
    const user = await User.create(userData);
    if (user.userType === "jobseeker") {
      await Jobseeker.create({ userId: user._id });
    } else {
      await Employer.create({
        userId: user._id,
        companyName,
        companyEmail,
        companyLocation,
        website,
        description,
      });
    }

    res.status(201).json({
      message: "User created",
      userId: user._id,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Login
router.post("/login", async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmail = regex.test(identifier);

    const user = await User.findOne(
      isEmail ? { mail: identifier } : { mobile: identifier },
    );

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.userType },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" },
    );

    res.json({
      token,
      user: {
        userId: user._id,
        fname: user.fname,
        role: user.userType,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let profile = null;

    if (user.userType === "jobseeker") {
      profile = await Jobseeker.findOne({ userId: user._id });
    } else if (user.userType === "employer") {
      profile = await Employer.findOne({ userId: user._id });
    }

    res.json({
      user,
      profile,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//Update Profile
router.put(
  "/profile",
  authMiddleware,
  upload.single("profileImage"),
  async (req, res) => {
    try {
      const userId = req.userId;

      //  USER FIELDS
      const { fname, mail, mobile } = req.body;
      let profileImage = req.body.profileImage;

      // if (req.file) {
      //   profileImage = req.file.path;
      // }
      //  JOBSEEKER FIELDS
      const {
        location,
        dob,
        profileSummary,
        skills,
        languages,
        jobPrefrence,
        availabilty,
        preferredLocation,
        experience,
        educations,

        resume,
        resumeName,
        aiSummaryCount,
        lastSummaryDate,
      } = req.body;

      // EMPLOYER FIELDS
      const {
        companyName,
        companyEmail,
        companyLocation,
        website,
        description,
      } = req.body;

      // UPDATE USER
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { fname, mail, mobile, profileImage },
        { new: true },
      ).select("-password");

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      let profile;

      // UPDATE JOBSEEKER
      if (updatedUser.userType === "jobseeker") {
        profile = await Jobseeker.findOneAndUpdate(
          { userId },
          {
            location,
            dob,
            profileSummary,
            skills,
            languages,
            jobPrefrence,
            availabilty,
            preferredLocation,
            experience,
            educations,
            profileImage,
            resume,
            resumeName,
            aiSummaryCount,
            lastSummaryDate,
          },
          { new: true },
        );
      }

      // UPDATE EMPLOYER
      else if (updatedUser.userType === "employer") {
        profile = await Employer.findOneAndUpdate(
          { userId },
          {
            companyName,
            companyEmail,
            companyLocation,
            website,
            description,
            profileImage,
          },
          { new: true },
        );
      }

      res.json({
        user: updatedUser,
        profile,
      });
    } catch (err) {
      console.error("ERROR:", err);
      res.status(500).json({ message: "Update failed" });
    }
  },
);
router.put("/resume", authMiddleware, upload.single("resume"), updateResume);
router.delete("/resume", authMiddleware, deleteResume);

router.post("/forgot-password", async (req, res) => {
  try {
    console.log("Received forgot password request for email:", req.body.email);
    const email = req.body.email;
    const user = await User.findOne({ mail: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    await user.save();
    const resetURL = `https://jobist.netlify.app/reset-password/${resetToken}`;

    await sendEmail({
      to: email,
      subject: "Password Reset Request",
      html: `
  <div style="font-family: Arial, sans-serif; background-color: #f4f7fb; padding: 30px 0;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 24px rgba(0,0,0,0.08);">
      
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #4f46e5, #3b82f6); padding: 20px 30px; color: white;">
        <h2 style="margin: 0; font-size: 22px;">Job Portal</h2>
        <p style="margin: 5px 0 0; font-size: 14px; opacity: 0.9;">
          Reset your password securely
        </p>
      </div>

      <!-- Body -->
      <div style="padding: 30px;">
        <h3 style="margin-top: 0; color: #111827;">Password Reset Request</h3>
        
        <p style="color: #4b5563; font-size: 14px; line-height: 1.6;">
          We received a request to reset your password. Click the button below to set a new one.
        </p>

        <!-- Button -->
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetURL}" 
             style="background: #4f46e5; color: #ffffff; padding: 12px 24px; 
                    text-decoration: none; border-radius: 8px; font-weight: 600; 
                    display: inline-block;">
            Reset Password
          </a>
        </div>

        <p style="color: #6b7280; font-size: 13px; text-align: center;">
          This link will expire in <strong>10 minutes</strong>.
        </p>

        <!-- Divider -->
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 25px 0;" />

        <!-- Fallback -->
        <p style="color: #9ca3af; font-size: 12px;">
          If the button doesn’t work, copy and paste this link into your browser:
        </p>
        <p style="word-break: break-all; font-size: 12px; color: #3b82f6;">
          ${resetURL}
        </p>
      </div>

      <!-- Footer -->
      <div style="background: #f9fafb; padding: 15px 30px; text-align: center;">
        <p style="margin: 0; font-size: 12px; color: #9ca3af;">
          © ${new Date().getFullYear()} Job Portal. All rights reserved.
        </p>
      </div>

    </div>
  </div>
`,
    });

    res.json({ message: "Reset link sent to email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/reset-password/:token", async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    user.password = hashedPassword;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.error(error);
  }
});
module.exports = router;
// tpqx vokf stun wkxm
