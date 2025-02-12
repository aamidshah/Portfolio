import React from "react";
import ProjectsText from "./ProjectsText";
import SingleProject from "./SingleProject";
import { motion } from "framer-motion";
import { FadeIn } from "../../framerMotion/Variants";
import FullProjectInfo from "./FullProjectInfo";
import { useState } from "react";
import ProjectSkelton from "./ProjectSkelton"; //
import { projects } from "./ProjectData";

const ProjectMain = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(false);

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
            key={index}
            onSelect={() => handleSelectProject(item)}
            {...item}
            image={item.image[0]}
          />
        ))}
      </div>

      {/* Show Skeleton Loader while loading */}
      {selectedProject &&
        (loading ? (
          <ProjectSkelton />
        ) : (
          <FullProjectInfo
            {...selectedProject}

            onClose={() => {
              console.log(selectedProject);
              setSelectedProject(null)}}
          />
        ))}
    </div>
  );
};

export default ProjectMain;
