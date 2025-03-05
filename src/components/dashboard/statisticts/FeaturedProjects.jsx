import { useMemo, useState } from "react";
import useGlobalStateStore from "../../../store/useProjectStore";
import FullProjectInfo from "../../projects/FullProjectInfo";
import ReactStars from "react-rating-stars-component";
const FeaturedProjects = () => {
  const { projects,setActiveComponent,setSelectedProject, selectedProject } = useGlobalStateStore();

  const featuredProjects = useMemo(() => {
    return [...projects]
      .sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0))
      .slice(0, 3);
  }, [projects]);

  const handleCLick = () => {
setSelectedProject(null)  }
  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Featured Projects</h2>

      {selectedProject ? (
        <FullProjectInfo onClose={handleCLick} />
      ) : (
        featuredProjects.length > 0 ? (
          <ul className="flex flex-col md:flex-row flex-wrap mt-12 justify-center gap-6">
            {featuredProjects.map((project) => (
              <li
                key={project._id}
                className="bg-[#e9ecf2] shadow-lg rounded-2xl p-6 border border-gray-200 transform transition duration-300 hover:scale-105 hover:shadow-xl w-full md:w-1/3 lg:w-1/4 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <img
                  src={project.image || "/default-project.jpg"}
                  alt={project.name}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <h3 className="text-xl font-semibold">{project.name}</h3>
                <h2>{project.status}</h2>
                  <div className="text-black flex items-center mt-0">
                                {project.averageRating ? (
                                  <ReactStars count={5} value={project.averageRating} size={20} edit={false} activeColor="#ffd700" />
                                ) : (
                                  <p className="text-gray-500">No ratings yet</p>
                                )}
                              </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No featured projects available.</p>
        )
      )}
    </div>
  );
};

export default FeaturedProjects;
