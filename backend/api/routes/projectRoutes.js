const express = require("express");
const router = express.Router();
const { getProjects,addProject,getProjectsById,updateProjectWithModification, updateProject, deleteProject } = require("../controllers/projectController");
const Project = require("../models/Project"); // Your Mongoose model
const authMiddleware = require("../middleware/AuthUser");

// Get all projects
router.get("/", getProjects);
router.get("/:id", getProjectsById);


// Add new project (directly in the route)
// router.post("/", addProject);  
router.post("/",  authMiddleware, addProject);


// router.put("/:id", updateProject);
router.patch("/:id/modify",authMiddleware ,updateProjectWithModification)
router.put("/:id"   ,authMiddleware, updateProject);

// Delete a project
router.delete("/:id",authMiddleware, deleteProject);


module.exports = router;
