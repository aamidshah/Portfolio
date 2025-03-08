const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  proficiency: { type: Number, min: 1, max: 100, required: true } ,

  category: { type: String, required: true }, // e.g., Frontend, Backend
});

const Skill = mongoose.model("Skill", skillSchema);
module.exports = Skill;