import { useEffect } from "react";
import useGlobalStateStore from "../../../store/useProjectStore";
import FullProjectInfo from "../../projects/FullProjectInfo";
import ReactStars from "react-rating-stars-component";
import { motion } from "framer-motion";
const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: index * 0.1, // Stagger effect
      ease: "easeOut",
    },
  }),
};
const AllProjects = () => {
  const { projects, fetchProjects, setSelectedProject } = useGlobalStateStore();
  useEffect(() => {
    fetchProjects(); // Ensure fresh data is loaded
  }, []);
  
  
  // Sort projects by rating (highest first)
  const sortedProjects = [...projects].sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    navigate("/fullProjectInfo");
  };

  return (
    <div className="container mx-auto p-6">
      {/* 📝 Added Introductory Paragraph */}
      <h2 className="text-2xl font-bold text-center mb-2">All Projects (Sorted by Rating)</h2>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-6">
        Explore our amazing projects, sorted from **highest-rated to lowest**.  
        Each project reflects innovation, skill, and real-world application.
      </p>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 place-items-center">
        {sortedProjects.map((project, index) => (
          <motion.div
            key={project._id}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{
              scale: 1.08,
              rotateX: 8,
              rotateY: 8,
              boxShadow: "0px 10px 30px rgba(0,0,0,0.15)",
              transition: { duration: 0.3, ease: "easeOut" },
            }}
            className="!bg-[#e9ecf2] shadow-lg rounded-xl overflow-hidden cursor-pointer max-w-[350px] w-full transform perspective-1000"
            onClick={() => handleProjectClick(project)}
          >
            <img src={project.image} alt={project.name} className="w-full h-48 object-cover rounded-t-xl" />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{project.name}</h3>
              <p className="text-gray-600">Status: {project.status}</p>
              <div className="text-black flex items-center">
                {project.averageRating ? (
                  <ReactStars count={5} value={project.averageRating} size={20} edit={false} activeColor="#ffd700" />
                ) : (
                  <p className="text-gray-500">No ratings yet</p>
                )}
              </div>
              <p className="text-gray-700">Complexity: {project.complexity}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AllProjects;
