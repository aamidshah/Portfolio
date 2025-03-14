const express = require("express");
const { register, login, getUserInfo,logout,updateProfile,verifyProfile } = require("../controllers/authController");
const authMiddleware = require("../middleware/AuthUser")
const { check } = require("express-validator");

const router = express.Router();

router.post(
  "/register",
  [
    check("username", "Username is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({ min: 6 }),
  ],
  register
);

router.post("/login", login);
router.get("/user", authMiddleware, getUserInfo); // Protected route to get user info
router.post("/logout", authMiddleware, logout); // Protected route to logout
router.put("/update", authMiddleware, updateProfile); // Protected route to update profile
router.post("/verifyprofile", authMiddleware, verifyProfile )


module.exports = router;
