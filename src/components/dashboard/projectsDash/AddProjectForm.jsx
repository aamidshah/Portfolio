

import React from "react";
import { useGlobalState } from "../../../context/GlobalStateContext";
import { motion } from "framer-motion";
import AddFeatures from "./AddFeatures";
import useProjectForm from "./UseProjectForm";
const AddProjectsForm = () => {
  const { setActiveComponent } = useGlobalState();
  const {
    project,
    handleChange,
    handleImageChange,
    handleFeatureAdd,
    handleFeatureRemove,
    handleSubmit,
    setProject,
  } = useProjectForm(setActiveComponent);

  // return (
  //   <motion.div
  //   className="p-8 lg:p-12 max-w-4xl mx-auto bg-white/50 backdrop-blur-md shadow-lg rounded-2xl border border-white/30"

  //     initial={{ opacity: 0, y: -20 }}
  //     animate={{ opacity: 1, y: 0 }}
  //     transition={{ duration: 0.5 }}
  //   >
  //     <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">🚀 Add New Project</h2>
  //     <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //       <div className="space-y-5">
  //         <input type="text" name="title" placeholder="Project Title" value={project.title} onChange={handleChange} required />
  //         <textarea name="description" placeholder="Project Description" value={project.description} onChange={handleChange} required />
  //         <input type="text" name="techStack" placeholder="Tech Stack (e.g. React, Node.js)" value={project.techStack} onChange={handleChange} required />
  //         <input type="text" name="category" placeholder="Project Category" value={project.category} onChange={handleChange} required />
  //         <input type="text" name="difficulty" placeholder="Difficulty Level" value={project.difficulty} onChange={handleChange} />
  //         <input type="text" name="contributors" placeholder="Contributors (comma-separated)" value={project.contributors} onChange={handleChange} />
  //         <input type="date" name="startDate" value={project.startDate} onChange={handleChange} required />
  //         <input type="date" name="endDate" value={project.endDate} onChange={handleChange} />
  //       </div>
  //       <div className="space-y-5">
  //         <input type="text" name="estimatedTime" placeholder="Estimated Time" value={project.estimatedTime} onChange={handleChange} required />
  //         <input type="text" name="liveDemo" placeholder="Live Demo URL" value={project.liveDemo} onChange={handleChange} />
  //         <input type="text" name="githubLink" placeholder="GitHub Repository URL" value={project.githubLink} onChange={handleChange} />
  //         <input type="file" accept="image/*" onChange={handleImageChange} />
  //         {project.image && <img src={project.image} alt="Project Preview" className="w-32 h-32 object-cover rounded-lg shadow-lg mt-3" />}
  //         <input type="text" name="featureInput" placeholder="Add Feature" value={project.featureInput} onChange={handleChange} />
  //         <button type="button" onClick={handleFeatureAdd}>➕ Add Feature</button>
  //         <AddFeatures features={project.features} removeFeature={handleFeatureRemove} />
  //       </div>
  //       <div className="col-span-2 flex gap-4 justify-center mt-4">
  //         <motion.button type="submit">✅ Add Project</motion.button>
  //         <motion.button type="button" onClick={() => setActiveComponent("projects")}>❌ Cancel</motion.button>
  //       </div>
  //     </form>
  //   </motion.div>
  // );
  return (
    <motion.div
      className="p-8 lg:p-12 max-w-4xl mx-auto bg-white/30 backdrop-blur-lg shadow-lg rounded-2xl border border-white/20"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">🚀 Add New Project</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-5">
          <input type="text" name="title" placeholder="Project Title" value={project.title} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" required />
          <textarea name="description" placeholder="Project Description" value={project.description} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" required />
          <input type="text" name="techStack" placeholder="Tech Stack (e.g. React, Node.js)" value={project.techStack} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" required />
          <input type="text" name="category" placeholder="Project Category" value={project.category} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" required />
          <input type="text" name="difficulty" placeholder="Difficulty Level" value={project.difficulty} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" />
          <input type="text" name="contributors" placeholder="Contributors" value={project.contributors} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" />
          <input type="date" name="startDate" placeholder="Start Date" value={project.startDate} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" required />
          <input type="date" name="endDate" placeholder="End Date" value={project.endDate} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" />
        </div>
        <div className="space-y-5">
          <input type="text" name="technologyUsed" placeholder="Technology Used" value={project.technologyUsed} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" required />
          <input type="text" name="estimatedTime" placeholder="Estimated Time to Complete" value={project.estimatedTime} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" required />
          <input type="text" name="liveDemo" placeholder="Live Demo URL" value={project.liveDemo} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" />
          <input type="text" name="githubLink" placeholder="GitHub Repository URL" value={project.githubLink} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" />
          <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-3 border border-gray-300 rounded-lg" />
          {project.image && (
            <div className="flex justify-center">
              <img src={project.image} alt="Project Preview" className="w-32 h-32 object-cover rounded-lg shadow-lg mt-3" />
            </div>
          )}
          <input type="text" name="featureInput" placeholder="Add Feature (e.g. Authentication, Dark Mode)" value={project.featureInput} onChange={(e) => setProject({ ...project, featureInput: e.target.value })} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" />
          <button type="button" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition transform duration-300" onClick={handleFeatureAdd}>➕ Add Feature</button>
          <AddFeatures features={project.features} removeFeature={handleFeatureRemove} />
        </div>
        <div className="col-span-1 md:col-span-2 flex gap-4 justify-center mt-4">
          <motion.button type="submit" className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-5 py-2.5 rounded-lg shadow-md hover:scale-105 transition transform duration-300" whileHover={{ scale: 1.05 }}>✅ Add Project</motion.button>
          <motion.button type="button" className="bg-gray-500 text-white px-5 py-2.5 rounded-lg shadow-md hover:scale-105 transition transform duration-300" whileHover={{ scale: 1.05 }} onClick={() => setActiveComponent("projects")}>❌ Cancel</motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddProjectsForm;
