import React, {useEffect,useState} from "react";
import ProjectsText from "./ProjectsText";
import SingleProject from "./SingleProject";
import { motion } from "framer-motion";
import { FadeIn } from "../../framerMotion/Variants";
import FullProjectInfo from "./FullProjectInfo";
import axios from "axios"; // Import axios for API calls

import ProjectSkelton from "./ProjectSkelton"; //
import ReviewForm from './ReviewForm';
// import projectsData from "/public/projectsData.json"; // ✅ Importing JSON data

const ProjectMain = () => {
  const [projects, setProjects] = useState([]); // ✅ State to store JSON data

  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {

    const fetchProjects = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/projects`);
        console.log("Fetched projects:", response); // Debugging line

        
        setProjects(response.data); // Set projects from database
      } catch (error) {
        console.error("Error fetching projects:", error);
      }finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
  
    fetchProjects();
  }, []);
  
  const handleSelectProject = (project) => {
    setLoading(true);
    setSelectedProject(project);

    setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulated loading delay (adjust as needed)
  };

  return (
    <div id="projects" className="max-w-[1200px] mx-auto px-4">
      <motion.div
        variants={FadeIn("up", 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.7 }}
      >
        <ProjectsText />
      </motion.div>

      <div className="flex flex-col gap-20 max-w-[900px] mx-auto mt-12 lg:items-center">
        {projects.map((item, index) => (
          <SingleProject
            key={item._id}
            index={index}
      // align={index % 2 === 0 ? "self-start" : "self-end"} // Pass the class here


            onSelect={() => handleSelectProject(item)}
            {...item}
            image={item.image[0]}
          />
        ))}
      </div>

      {/* Show Skeleton Loader while loading */}
      {selectedProject &&(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        {loading ? (
          <ProjectSkelton />
        ) : (
          <FullProjectInfo 
            key={selectedProject._id}
            id={selectedProject._id}
            {...selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
      )}
    </div>
  )
}
export default ProjectMain;
