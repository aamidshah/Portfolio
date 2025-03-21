

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const serverless = require("serverless-http");

const cors = require("cors");
const projectRoutes = require("./api/routes/projectRoutes");
const reviewRoutes = require("./api/routes/reviews");
const authRoutes = require("./api/routes/authRoutes");
const statsRoutes = require("./api/routes/statsRoutes");
const SkillsRoutes = require("./api/routes/SkillsRoutes");

dotenv.config();
const app = express();



app.use(
  cors({
    origin: ["https://portfoliodash-6oz96r1gn-aamids-projects.vercel.app", "https://portfoliodash-q0zqydjrz-aamids-projects.vercel.app","http://localhost:5173",
     "https://portfoliodash-b6l6lf1nh-aamids-projects.vercel.app",
     "https://portfoliodash.vercel.app",
     "https://portfoliodash-awglweezx-aamids-projects.vercel.app"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies and auth headers
  })
);






app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));


app.use("/api/auth", authRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/skills", SkillsRoutes)
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working!" });
});
// Connect to MongoDB
const connectDB = async () => {
  try {
    if (!mongoose.connection.readyState) {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("✅ MongoDB Connected Successfully!");
    }
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
  }
};
app.use((req, res, next) => {
  console.log("Incoming Request:", req.method, req.path, "Origin:", req.headers.origin);
  next();
});


connectDB();
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}
module.exports = app;
module.exports.handler = serverless(app);