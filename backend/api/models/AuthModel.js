const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String, default: "" }, // Stores image URL
  bio: { type: String, default: "" }, // Short user bio
  socialLinks: { type: [String], default: [] }, // Array of social media links
  isLoggedIn: { type: Boolean, default: false }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
