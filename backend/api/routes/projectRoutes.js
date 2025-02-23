const express = require("express");
const router = express.Router();
const { getProjects,addProject,getProjectsById,updateProjectWithModification, updateProject, deleteProject } = require("../controllers/projectController");
const Project = require("../models/Project"); // Your Mongoose model
const upload = require("../middleware/upload");

// Get all projects
router.get("/", getProjects);
router.get("/:id", getProjectsById);


// Add new project (directly in the route)
// router.post("/", addProject);  
router.post("/", addProject);


// router.put("/:id", updateProject);
router.patch("/:id/modify",updateProjectWithModification)
router.put("/:id", updateProject);

// Delete a project
router.delete("/:id", deleteProject);


module.exports = router;
