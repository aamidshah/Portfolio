import React, {useEffect,useState} from "react";
import ProjectsText from "./ProjectsText";
import SingleProject from "./SingleProject";
import { motion } from "framer-motion";
import { FadeIn } from "../../framerMotion/Variants";
import FullProjectInfo from "./FullProjectInfo";
import axios from "axios"; // Import axios for API calls
import useGlobalStateStore from "../../store/useProjectStore";
import ProjectSkelton from "./ProjectSkelton"; //
import ReviewForm from './ReviewForm';
// import projectsData from "/public/projectsData.json"; // ✅ Importing JSON data
const BASE_URL = import.meta.env.VITE_API_URL;

const ProjectMain = () => {

  const {selectedProject, setSelectedProject, loading, setLoading,fetchProjects, projects, setProjects} = useGlobalStateStore();
  const [showAllProjects, setShowAllProjects] = useState(false);


  useEffect(() => {
  
    fetchProjects();
    // console.log("Projects in state:");
  }, [fetchProjects]);
  
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
        {(showAllProjects ? projects : projects.slice(0, 3)).map((item, index) => (
          <SingleProject
            key={item._id}
            index={index}
            onSelect={() => handleSelectProject(item)}
            {...item}
            image={item.image?.length > 0 ? item.image[0] : null}
          />
        ))}
      </div>

      {/* See More / See Less Button */}
      {projects.length > 3 && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setShowAllProjects(!showAllProjects)}
            className="px-4 py-2 bg-gradient-custom3 !text-black font-semibold rounded-md  transition"
          >
            {showAllProjects ? "See Less" : "See More"}
          </button>
        </div>
      )}
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
