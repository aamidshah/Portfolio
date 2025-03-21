const User = require("../models/AuthModel"); // Ensure correct path
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const crypto = require("crypto"); // ✅ For generating tokens
const nodemailer = require("nodemailer"); 

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

// **Register User**
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;
  

  try {
    // Check for existing username and email together
    const existingUser = await User.findOne({
      $or: [
        { username: { $regex: new RegExp(`^${username}$`, "i") } },
        { email: email }
      ]
    });
    

    if (existingUser) {
      if (existingUser.username.toLowerCase() === username.toLowerCase() && existingUser.email.toLowerCase() === email.toLowerCase()) {
        return res.status(400).json({ message: "Username and email are already in use!" });
      }
      if (existingUser.username.toLowerCase() === username.toLowerCase()) {
        return res.status(400).json({ message: "Username already taken!" });
      }
      if (existingUser.email.toLowerCase() === email.toLowerCase()) {
        return res.status(400).json({ message: "Email already in use!" });
      }
    }
    

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    // Generate Token
    const token = generateToken(user);

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error("❌ Server error:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

// **Login User**
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Generate Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    user.isLoggedIn = true;
    await user.save();
    res.json({ message: "Login successful!", user, token });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Exclude password
    if (!user) {
      return res.status(404).json({ isLoggedIn: false, message: "User not found" });
    }
    res.status(200).json({ isLoggedIn: true, user });
  } catch (error) {
    res.status(500).json({ isLoggedIn: false, message: "Server Error" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { bio, socialLinks, profilePicture, currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update profile fields
    if (bio !== undefined) user.bio = bio;
    if (socialLinks !== undefined) user.socialLinks = socialLinks;
    if (profilePicture !== undefined) user.profilePicture = profilePicture;

    // Handle password update
    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Current password is incorrect." });
      }
      user.password = await bcrypt.hash(newPassword, 10);
    }

    await user.save();
    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

exports.verifyProfile = async (req, res) => {
  try {
      console.log("Received request to verify password:", req.body);
      const { password } = req.body;
      
      if (!password) {
          console.log("Password missing from request");
          return res.status(400).json({ success: false, message: "Password is required" });
      }

      const user = await User.findById(req.user.id);
      if (!user) {
          console.log("User not found");
          return res.status(404).json({ success: false, message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      console.log("Password match:", isMatch);

      if (!isMatch) {
          return res.status(401).json({ success: false, message: "Incorrect password" });
      }

      console.log("Password verified successfully");
      res.json({ success: true });
  } catch (error) {
      console.error("Error verifying password:", error);
      res.status(500).json({ success: false, message: "Server error" });
  }
};


const tokenBlacklist = new Set(); // Store invalidated tokens in memory (Use Redis for production)
exports.tokenBlacklist = tokenBlacklist; // ✅ Export tokenBlacklist separately

exports.logout = async (req, res) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(400).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await User.findByIdAndUpdate(decoded.id, { isLoggedIn: false });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
