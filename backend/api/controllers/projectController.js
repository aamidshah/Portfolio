const Project = require("../models/Project");
const mongoose = require("mongoose");  // 👈 Add this

// Get all projects
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single project by ID
const getProjectsById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Received ID:", id);  // Debugging line to check if ID is received


    // Validate ObjectId before querying
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("Invalid Project ID");  // Debugging line

      return res.status(400).json({ error: "Invalid Project ID" });
    }

    const project = await Project.findById(id);
    console.log("Deleting Project ID:", id);
    console.log("Type of ID:", typeof id);

    if (!project) {
      console.log("Project not found");  // Debugging line

      return res.status(404).json({ error: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Add new project (move logic inside controller)
const addProject = async (req, res) => {
  try {
    console.log("Received Project Data:", req.body); // Debugging log

    const { name, technologyUsage,image, ...otherFields } = req.body;

    // If technologyUsage is passed, ensure it's an object
    if (technologyUsage && typeof technologyUsage !== 'object') {
      return res.status(400).json({ message: "Invalid technologyUsage format." });
    }
    if (image && !Array.isArray(image)) {
      return res.status(400).json({ message: "Images should be an array of URLs." });
    }

    // Check if a project with the same name already exists
    const existingProject = await Project.findOne({ name });

    if (existingProject) {
      return res.status(400).json({ message: "Project with this name already exists!" });
    }

    // Create new project and save to DB
    const project = new Project({
      name,
      technologyUsage,
      image, // Save array of image URLs
      ...otherFields,
    });    await project.save();

    // Return success response
    res.status(201).json({ message: "Project saved successfully!", project });
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ error: error.message });
  }
};





const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;

    // First, get the current project to fetch the existing technologyUsage
    const existingProject = await Project.findById(id);
    if (!existingProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Prepare update operations for contributors
    let updateOps = { ...updateFields };

    // Handle contributors separately, if present
    if (updateFields.contributors) {
      // Use $addToSet to avoid duplicates in contributors array
      updateOps.$addToSet = { contributors: { $each: updateFields.contributors } };
      delete updateOps.contributors;  // Remove contributors from $set to avoid replacing it
    }

    if (updateFields.image && !Array.isArray(updateFields.image)) {
      return res.status(400).json({ message: "Images should be an array of URLs." });
    }
    // Handle technologyUsage separately (merge new values with existing ones)
    if (updateFields.technologyUsage) {
      updateOps.technologyUsage = {
        ...existingProject.technologyUsage,  // Retain existing technologyUsage
        ...updateFields.technologyUsage,    // Merge new fields
      };
    }

    // If a technology removal is specified, use $unset to remove it
    if (updateFields.removeTechnology) {
      updateOps.$unset = { [`technologyUsage.${updateFields.removeTechnology}`]: "" };
    }

    // Update the project with the prepared update operations
    const project = await Project.findByIdAndUpdate(id, updateOps, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res.json({ message: "Project updated successfully", project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProjectWithModification = async (req, res) => {
  try {
    const { id } = req.params;
    let updateData = req.body;

    // Ensure _id is not part of the update payload
    if (updateData._id) {
      delete updateData._id;
    }

    // Fetch the current project to get the existing fields
    const existingProject = await Project.findById(id);
    if (!existingProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Filter out system fields from the update data
    const filteredData = Object.keys(updateData).reduce((acc, key) => {
      if (key !== '_id' && key !== 'createdAt' && key !== 'updatedAt' && key !== '__v') {
        acc[key] = updateData[key];
      }
      return acc;
    }, {});

    // Prepare fields for unset (to remove fields not passed)
    const unsetFields = {};

    // Loop through the existing project to find the fields that were not passed
    for (const field in existingProject.toObject()) {
      if (!(field in filteredData)) {
        unsetFields[field] = ""; // Unset these fields from the document
      }
    }

    // Ensure that we don't try to unset _id or system fields
    delete unsetFields._id;
    delete unsetFields.createdAt;
    delete unsetFields.updatedAt;
    delete unsetFields.__v;

    // Perform update operation
    const updatedProject = await Project.findByIdAndUpdate(id, {
      $set: filteredData,      // Update only the fields passed in the request
      $unset: unsetFields,     // Remove the fields that are not passed
    }, {
      new: true,               // Returns updated document
      runValidators: true,     // Ensure required fields are validated
      projection: { __v: 0 },  // Optional: exclude version key (__v)
    });

    // If no project was found
    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project updated successfully", project: updatedProject });

  } catch (error) {
    console.error('Error updating project:', error);  // Enhanced debugging for errors
    res.status(500).json({ error: error.message });
  }
};





 

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Project ID" });
    }

    const project = await Project.findByIdAndDelete(id);

    if (!project) return res.status(404).json({ message: "Project not found" });

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = { getProjects, getProjectsById, updateProjectWithModification,addProject, updateProject, deleteProject };
