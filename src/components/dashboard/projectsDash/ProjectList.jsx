import { useEffect, useState } from "react";

import { FaTrash } from "react-icons/fa"; // Importing trash icon

import FullProjectInfo from "../../projects/FullProjectInfo";

import axios from "axios";

import ProjectSkelton from "../../projects/ProjectSkelton";

import UpdateButton from "./UpdateButton";

import AddProjectsForm from "./AddProjectForm";

import AddProjects from "./AddProjects";

import { useGlobalState } from "../../../context/GlobalStateContext";

import AddButton from "./AddProjects";
const BASE_URL = import.meta.env.VITE_API_URL;

const ProjectList = () => {
  const { setActiveComponent } = useGlobalState(); // Assuming you're using global state to manage navigation

  const [projects, setProjects] = useState([]);

  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const [loading, setLoading] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false); // Track if in update mode

  const [selectedProject, setSelectedProject] = useState(null); // Track selected project

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true); // Set loading to true while fetching

      try {
        const response = await axios.get(`${BASE_URL}/projects`); // Fetch from backend

        setProjects(response.data); // Set projects from database
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchProjects();
  }, []);

  const handleUpdateSuccess = async () => {
    // New function to refetch and update

    setLoading(true);

    try {
      const response = await axios.get(`http://localhost:5000/api/projects`);

      setProjects(response.data); // Update the projects state with fresh data

      setIsUpdating(false);

      setSelectedProjectId(null);

      setSelectedProject(null);

      setActiveComponent("projects");
    } catch (error) {
      console.error("Error refetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnableUpdateMode = () => {
    setIsUpdating(true);

    setSelectedProjectId(null); // Reset any previous selection

    setSelectedProject(null); // Reset any previously selected project
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
    setActiveComponent("addProjectForm");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/projects/${id}`); // Delete from backend

      setProjects((prevProjects) =>
        prevProjects.filter((project) => project._id !== id)
      );

      // If the selected project is deleted, close FullProjectInfo

      if (selectedProjectId === id) {
        setSelectedProjectId(null);
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="bg-gray-100 rounded-xl dark:bg-gray-900 min-h-screen py-2 px-5">
      <div className="flex items-center justify-between  flex-col gap-8 sm:flex-row lg:justify-start mb-5 mt-4">
        <div className="flex items-start  md:justify-start xl:justify-center xl:ml-[157px]">
          <div className="flex items-center justify-center  gap-[100px]">
          <UpdateButton HandleClick={handleEnableUpdateMode} />

          <AddButton HandleClick={handleAddProject} />
        </div></div>

        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white flex-1">
          My Projects
        </h1>
      </div>




      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
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
            className={`relative bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-105

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

              <div className="flex md:justify-between justify-evenly xl:justify-evenly lg:flex-row md:gap-3 md:flex-col flex-row items-center mt-5">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-all duration-200"
                >
                  Live Demo
                </a>

                <a
                  href={project.gitLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm transition-all duration-200"
                >
                  GitHub Repo
                </a>
              </div>
            </div>

            {/* Delete Button (Bottom Right Corner) */}

            <button
              className="absolute bottom-3 right-3 bg-red-500 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-transform duration-200 hover:scale-110"
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
