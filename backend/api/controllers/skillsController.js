const Skill = require("../models/skillsModel"); // Ensure correct path



// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find(); // Fetch all skills
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const getSkillsByProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const skills = await Skill.find({ projectId });

    if (!skills.length) {
      return res.status(404).json({ message: "No skills found for this project" });
    }

    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




// @desc    Add a new skill
// @route   POST /api/skills
// @access  Protected
const AddSkill = async (req, res) => {
  try {
    const { name, proficiency, category } = req.body;

    // Check if skill already exists
    const existingSkill = await Skill.findOne({ name });
    if (existingSkill) {
      return res.status(400).json({ message: "Skill already exists" });
    }

    const skill = new Skill({ name, proficiency, category });
    await skill.save();
    res.status(201).json({
      message: "Skill added successfully",
      skill,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc    Update a skill
// @route   PUT /api/skills/:id
// @access  Protected
const UpdateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, proficiency } = req.body;

    // Check if another skill with the same name exists
    const existingSkill = await Skill.findOne({ name });

    // If a different skill with the same name exists, return an error
    if (existingSkill && existingSkill._id.toString() !== id) {
      return res.status(400).json({ message: "A skill with this name already exists!" });
    }

    const updatedSkill = await Skill.findByIdAndUpdate(
      id,
      { name, category, proficiency },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedSkill);
  } catch (error) {
    res.status(500).json({ message: "Error updating skill", error: error.message });
  }
};




// @desc    Delete a skill
// @route   DELETE /api/skills/:id
// @access  Protected
const DeleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    await skill.deleteOne();
    res.json({ message: "Skill deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getSkills, AddSkill,getSkillsByProject, UpdateSkill, DeleteSkill };
