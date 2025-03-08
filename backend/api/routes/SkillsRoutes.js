
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/AuthUser");


const { getSkills, AddSkill, UpdateSkill,getSkillsByProject, DeleteSkill} = require("../controllers/skillsController");

router.get("/", getSkills);
router.get("/:id", getSkillsByProject);
router.post("/", authMiddleware, AddSkill);
router.put("/:id",  authMiddleware, UpdateSkill);
router.delete("/:id",authMiddleware, DeleteSkill);

module.exports = router;
