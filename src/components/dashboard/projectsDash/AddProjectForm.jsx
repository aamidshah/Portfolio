import React, { useEffect,useRef, useState } from "react";

import { useGlobalState } from "../../../context/GlobalStateContext";

import { motion } from "framer-motion";

import AddFeatures from "./AddFeatures";

import useProjectForm from "./UseProjectForm";

import AddProjects from "./AddProjects";
import useGlobalStateStore from "../../../store/useProjectStore";

const AddProjectsForm = ({
  projectId,
  setIsUpdating,
  // selectedProject,
  onUpdateSuccess,
  // setSelectedProject,
  setSelectedProjectId,
 
}) => {
  const { setActiveComponent,  selectedProject,setSelectedProject } = useGlobalStateStore();
  const [imagePreview, setImagePreview] = useState(null); // For preview

  const {
    handleChange,
    handleTechnologyUsageRemove,
    handleImageChange,

    handleFeatureAdd,
project,setProject,
    handleFeatureRemove,

    handleSubmit,
    technologyUsage,
    handleUsageChange,
    handleTechnologyAdd,

    handleCancel,

  } = useProjectForm(
    setActiveComponent,
    setIsUpdating,
    setSelectedProjectId,
    selectedProject,
    onUpdateSuccess,
    setSelectedProject,
    projectId
  );


  useEffect(() => {
    if (projectId) {
      // Populate form fields with selected project values when editing
  
      setProject({
        ...projectId,
        featureInput: "",
        technology:"",
        usage:"" ,
        image: projectId.image, // Add image preview here

      });
    }
    // console.log("Technology Usage State:", technologyUsage);

  }, [projectId, setProject]);

  const handleImagePreview = (e) => {
    let url = e.target.value.trim();
    
    if (url.includes("drive.google.com")) {
      const match = url.match(/[-\w]{25,}/);
      if (match) {
        url = `https://drive.google.com/thumbnail?id=${match[0]}&sz=w1000`;
      }
    }
  
    setImagePreview(url);
    setProject((prev) => ({ ...prev, image: url }));
  };
  

  const categories = [
    "Web Development",
    "Mobile App",
    "Machine Learning",
    "Game Development",
    "Other",
  ];

  const complexities = ["Easy", "Medium", "Hard"];

  const estimatedTimeOptions = ["1 Week", "2 Weeks", "3 Weeks", "Custom"];
const status = ["In Progress","Completed","Pending"]
  

  return (
    <motion.div
      className="p-8 lg:p-12 max-w-4xl mx-auto bg-white/30 backdrop-blur-lg shadow-lg rounded-2xl border border-white/20"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        {projectId ? "📝 Edit Project" : "🚀 Add New Project"}{" "}
      </h2>

      <form
        onSubmit={(e) => handleSubmit(e, onUpdateSuccess)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[80vh] overflow-y-auto scrollbar-hide scrollbar-hidden "
      >
        <div className="space-y-6">
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={project.title}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />

          <textarea
            name="description"
            placeholder="Project Description"
            value={project.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />

          

          {/* Category Dropdown */}

          <select
            name="category"
            value={project.category}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          >
            <option value="">Select Category</option>

            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Complexity Dropdown */}

          <select
            name="complexity"
            value={project.complexity}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            
          >
            <option value="">Select Complexity</option>

            {complexities.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>

{/* status */}
<select
            name="status"
            value={project.status}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          >
            <option value="">Project Status</option>

            {status.map((sta) => (
              <option key={sta} value={sta}>
                {sta}
              </option>
            ))}
          </select>


{/* contributors */}
          <input
            type="text"
            name="contributors"
            placeholder="Contributors"
            value={project.contributors}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <input
            type="date"
            name="startDate"
            placeholder="Start Date"
            value={project.startDate}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />

          <input
            type="date"
            name="endDate"
            placeholder="End Date"
            value={project.endDate}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>
<div className="space-y-4">
        <select
            name="technology"
            value={project.technology}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            
          >
            <option value="">Select Technology</option>
            {["React", "Node.js", "JavaScript", "Python", "Java"].map((tech) => (
              <option key={tech} value={tech}>
                {tech}
              </option>
            ))}
          </select>

          {/* Proficiency Input */}
          <input
            type="number"
            name="usage"
            placeholder="usage (0-100)"
            value={project.usage}
            onChange={handleUsageChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            
          />

          {/* Add Technology Usage */}
          <button
            type="button"
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition transform duration-300"
            onClick={handleTechnologyAdd}
          >
            ➕ Add Technology Usage
          </button>

          <div className="mt-4">
            <h3 className="font-semibold text-gray-800">Technologies Used:</h3>
            <ul>
  {Object.entries(project.technologyUsage || {}).map(([tech, usage], index) => (
    <li key={index} className="flex justify-between">
      <span>{tech}</span>  {/* ✅ Displays Technology Name */}
      <span>{usage}%</span>  {/* ✅ Displays Usage */}
      <button className="text-red-500 hover:text-red-700">❌</button>
    </li>
  ))}
</ul>


            
          </div>
            {/* </div> */}
          {/* Estimated Time Dropdown with Custom Input */}

          <select
            name="estimatedTime"
            value={project.estimatedTime}
            onChange={(e) => {
              const value = e.target.value;

              if (value === "Custom") {
                setProject({ ...project, estimatedTime: "" }); // Clear input if Custom is selected
              } else {
                handleChange(e);
              }
            }}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="">Select Estimated Time</option>

            {estimatedTimeOptions.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>

          {project.estimatedTime === "" && (
            <input
              type="text"
              name="estimatedTime"
              placeholder="Enter Estimated Time"
              value={project.estimatedTime}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
          )}

          <input
            type="text"
            name="liveDemo"
            placeholder="Live Demo URL"
            value={project.liveDemo}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <input
            type="text"
            name="githubLink"
            placeholder="GitHub Repository URL"
            value={project.githubLink}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />

          {/* <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          /> */}
 <div className="space-y-6">
 <input
  type="text"
  name="image"
  placeholder="Image URL"
  value={project.image}
  onChange={handleImagePreview}
  className="w-full p-3 border border-gray-300 rounded-lg"
/>
          {imagePreview && (
            <div className="flex justify-center mt-3">
              <img
                src={imagePreview}
                alt="Project Preview"
                className="w-32 h-32 object-cover rounded-lg shadow-lg"
              />
            </div>
          )}
        </div>

          <input
            type="text"
            name="featureInput"
            placeholder="Add Feature (e.g. Authentication, Dark Mode)"
            value={project.featureInput}
            onChange={(e) =>
              setProject({ ...project, featureInput: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <button
            type="button"
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition transform duration-300"
            onClick={handleFeatureAdd}
          >
            ➕ Add Feature
          </button>

          <AddFeatures
            features={project.features}
            removeFeature={handleFeatureRemove}
          />
        </div>

        <div className="col-span-1 md:col-span-2 flex gap-4 justify-center ">
          <motion.button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-5 py-2.5 rounded-lg shadow-md hover:scale-105 transition transform duration-300"
            whileHover={{ scale: 1.05 }}
            onSubmit={() => {
              handleSubmit();
            }}
          >
            {projectId ? "✅ Update Project" : "✅ Add Project"}
          </motion.button>

          <motion.button
            type="button"
            className="bg-gray-500 text-white px-5 py-2.5 rounded-lg shadow-md hover:scale-105 transition transform duration-300"
            whileHover={{ scale: 1.05 }}
            onClick={() => {
              // console.log(activeComponent)

              handleCancel();
            }}
          >
            ❌ Cancel
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddProjectsForm;
