

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const serverless = require("serverless-http");

const cors = require("cors");
const projectRoutes = require("./api/routes/projectRoutes");
const reviewRoutes = require("./api/routes/reviews");
const authRoutes = require("./api/routes/authRoutes");

dotenv.config();
const app = express();


app.use(
  cors({
    origin: [
      "http://localhost:5173", // ✅ Allow local development
      "https://portfoliodash-1kh0l0asa-aamids-projects.vercel.app", // ✅ Allow deployed frontend
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/reviews", reviewRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/auth", authRoutes);

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

connectDB();
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}
module.exports = app;
module.exports.handler = serverless(app);