const jwt = require("jsonwebtoken");
const { tokenBlacklist } = require("../controllers/authController");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  console.log("Received Token:", token);

  if (!token || tokenBlacklist.has(token)) {
    console.log("Token is blacklisted or missing.");
    return res.status(401).json({ isLoggedIn: false, message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);

    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return res.status(401).json({ isLoggedIn: false, message: "Invalid Token" });
  }
};

module.exports = authMiddleware;
