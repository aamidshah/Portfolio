import { useEffect, useState } from "react";

import { FaTrash } from "react-icons/fa"; // Importing trash icon

import FullProjectInfo from "../../projects/FullProjectInfo";


import ProjectSkelton from "../../projects/ProjectSkelton";

import UpdateButton from "./UpdateButton";

import AddProjectsForm from "./AddProjectForm";
import StarRatings from "react-star-ratings";
import {toast} from "react-toastify";


import AddButton from "./AddProjects";
const BASE_URL = import.meta.env.VITE_API_URL;
import useGlobalStateStore from "../../../store/useProjectStore";
import useAuthStore from "../../../store/authStore";
const ProjectList = () => {
  const {
    setActiveComponent,
    projects,
    fetchProjects,
    selectedProjectId,
    setSelectedProjectId,
    loading,
    setLoading,
    isUpdating,
    setIsUpdating,
    selectedProject,
    setSelectedProject,
    handleDelete,
    handleUpdateSuccess,
    // averageRating,
  } = useGlobalStateStore();
  const isUserAuthenticated = useAuthStore((state) => state.isAuthenticated); // ✅ Correct way to access Zustand state

  
  useEffect(() => {
    fetchProjects();
    console.log("Projects in state:", projects);
  }, [fetchProjects
  ]);




  const handleEnableUpdateMode = () => {
    if (!isUserAuthenticated) {
      toast.error("You need to log in to update a project!");
      setActiveComponent("authScreen");
      return;
    }
    setIsUpdating(true);
    setSelectedProjectId(null);
    setSelectedProject(null);
  };

  const handleProjectClick = (project) => {
    if (isUpdating) {
      setSelectedProjectId(project._id); // Select project for update

      setSelectedProject(null); // Ensure FullProjectInfo does not open
    } else {
      setSelectedProject(project); // Open full project details

      setSelectedProjectId(null); // Ensure update mode is not active
    }
  };

  const handleAddProject = () => {
    if (!isUserAuthenticated) {
      toast.error("You need to log in to add a project!");
      setActiveComponent("authScreen");
      return;
    }
    setActiveComponent("addProjectForm");
    setIsUpdating(false);
  };


  return (
    <div className="bg-[#e9ecf2]rounded-xl shadow-2xl p-4  dark:bg-gray-900 min-h-screen py-2 px-5">
      <div className="flex items-center justify-between  flex-col gap-8 sm:flex-row lg:justify-start mb-5 mt-4">
        <div className="flex items-start  md:justify-start xl:justify-center xl:ml-[157px]">
          {isUserAuthenticated ?(

          
          <div className="flex items-center justify-center  gap-[100px]">
          <UpdateButton HandleClick={handleEnableUpdateMode} />

          <AddButton HandleClick={handleAddProject} />
        </div>
        
         ): <span className=" font-semibold text-center text-red-500 dark:text-white">To Enable Update or Add Mode Mode You Need To Log In!!!</span> }</div>

        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white flex-1">
          My Projects
        </h1>
      </div>




      <div className="grid pt-8 grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {projects.map((project, index) => (
          <div
            key={project._id}
            onClick={() => {
              handleProjectClick(project);

              setLoading(true);

              setSelectedProjectId(project._id);

              setTimeout(() => {
                setLoading(false); // Simulate loading delay (remove if unnecessary)
              }, 1000);
            }}
            className={`relative !bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-105

${isUpdating ? "border-4 border-blue-500" : ""}`} // Highlight selection when in update mode
          >
{project.image.length > 0 ? (
              <img
              src={
                project.image[0]?.includes("drive.google.com/file/d/")
                  ? `https://drive.google.com/uc?id=${
                      project.image[0].split("/d/")[1].split("/")[0]
                    }`
                  : project.image[0]
              }
            
                alt={project.name}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-gray-500">No Image Available</span>
              </div>
            )}

            <div className="p-5">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {project.name}
              </h2>

              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {project.description}
              </p>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              <strong>Technologies:</strong>{" "}
  {project.technologyUsage && Object.keys(project.technologyUsage).length > 0 ? (
    Object.keys(project.technologyUsage).map((techName, index) => (
      <span key={index}>
        {techName}
        {index < Object.keys(project.technologyUsage).length - 1 ? ", " : ""}
      </span>
    ))
  ) : (
    "None"
  )}         </p>
{project.averageRating ? (
  <StarRatings
    rating={project.averageRating} // Get rating specific to project
    starRatedColor="#000000"
    numberOfStars={5}
    starDimension="16px"
    starSpacing="2px"
  />
) : (
  <p>No ratings yet</p>
)}

              <div className="flex md:justify-between justify-evenly xl:justify-evenly lg:flex-row md:gap-3 md:mr-14 flex-row items-center mt-5">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm xl:px-4 xl:py-2 lg:py-[0.2rem] transition-all duration-200"
                >
                  Live Demo
                </a>

                <a
                  href={project.gitLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm lg:px-2 lg:py-[0.2rem] xl:px-4 xl:py-2 transition-all duration-200"
                >
                  GitHub Repo
                </a>
              </div>
            </div>

            {/* Delete Button (Bottom Right Corner) */}

            <button
              className="absolute bottom-6 right-3 bg-red-500 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-transform duration-200 hover:scale-110"
              onClick={(e) => {
                e.stopPropagation();
                  handleDelete(project._id);
              
              }}
              
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>

      {isUpdating && selectedProjectId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <AddProjectsForm
            setSelectedProject={setSelectedProject}
            selectedProject={selectedProject} // Pass the full project details
            projectId={selectedProjectId} // Ensure projectId is correctly passed
            setSelectedProjectId={setSelectedProjectId}
            setIsUpdating={setIsUpdating}
            onUpdateSuccess={handleUpdateSuccess}
          />
        </div>
      )}

      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <ProjectSkelton />
        </div>
      ) : (
        !isUpdating &&
        selectedProject && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <FullProjectInfo
              id={selectedProjectId}
              {...selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          </div>
        )
      )}
    </div>
  );
};

export default ProjectList;
