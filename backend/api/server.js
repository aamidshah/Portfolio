const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const projectRoutes = require("./routes/projectRoutes");
const reviewRoutes = require("./routes/reviews");


dotenv.config();
const app = express();
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve images

app.use("/api/reviews", reviewRoutes);
app.use("/api/projects", projectRoutes);

// app.use("/uploads", express.static("uploads"));




mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));




const PORT = process.env.PORT || 5000;


app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
