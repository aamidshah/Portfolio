const User = require("../models/AuthModel"); // Ensure correct path
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

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
    const existingUser = await User.findOne({ username: { $regex: new RegExp(`^${username}$`, "i") } });

    if (existingUser) {
      if (existingUser.username === username) {
        console.log("❌ Username already exists!"); // Debugging

        return res.status(400).json({ message: "Username already taken!" });
      }
      if (existingUser.email === email) {
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

