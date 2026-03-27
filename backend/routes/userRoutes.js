const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");

// ✅ Register
router.post("/register", async (req, res) => {
  try {
    const { fname, mail, mobile, password, userType } = req.body;

    if (!fname || !mail || !password || !userType) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const existingUser = await User.findOne({ mail });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser = {
      fname,
      mail,
      mobile,
      password: hashedPassword,
      userType,
    };

    if (userType === "employer") {
      newUser.company = {
        companyName: "",
        companyEmail: mail,
      };
    }

    const user = await User.create(newUser);

    res.status(201).json({ message: "User created", userId: user._id });
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
      { expiresIn: "1d" },
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

// ✅ Get Profile
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Update Profile (partial update)
router.put("/profile", authMiddleware, async (req, res) => {
  try {
    console.log("BODY:", req.body); // 👈 add this
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { $set: req.body },

      { new: true },
    ).select("-password");

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});

module.exports = router;
