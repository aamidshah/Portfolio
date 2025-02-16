// import { useEffect, useState } from "react";
// import projectsData from "/public/projectsData.json";
// import { Link } from "react-scroll";
// import FullProjectInfo from "../../projects/FullProjectInfo";
// const ProjectList = () => {
//   const [projects, setProjects] = useState([]);
//   const [selectedProjectId, setSelectedProjectId] = useState(null);

//   useEffect(() => {
//     const fetchProjects = () => {
//       const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
      
//       // Merge localStorage projects with default projects, avoiding duplicates
//       const mergedProjects = [...projectsData, ...storedProjects];
  
//       setProjects(mergedProjects);
//     };
  
//     fetchProjects();
  
//     window.addEventListener("storage", fetchProjects);
  
//     return () => {
//       window.removeEventListener("storage", fetchProjects);
//     };
//   }, []);
  
//   console.log("Selected Project:", projects);

//   console.log("Selected Project:", selectedProjectId);

  
//   return (
//     <div className="bg-gray-100 rounded-xl dark:bg-gray-900 min-h-screen py-10 px-5">
//       <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-10">
//         My Projects
//       </h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
//         {projects.map((project, index) => (
//           <div 
//             key={index}
//             onClick={() => setSelectedProjectId(project.id)} // Only passing the ID

//             className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-105"
//           >
//             {project.image.length > 0 ? (
//               <img
//                 src={project.image[0]}
//                 alt={project.name}
//                 className="w-full h-48 object-cover"
//               />
//             ) : (
//               <div className="w-full h-48 bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
//                 <span className="text-gray-500">No Image Available</span>
//               </div>
//             )}

//             <div className="p-5">
//               <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
//                 {project.name}
//               </h2>
//               <p className="text-gray-600 dark:text-gray-300 mt-2">
//                 {project.description}
//               </p>
//               <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
//                 <strong>Technologies:</strong> {project.technologies}
//               </p>

//               <div className="flex justify-between lg:flex-row flex-col md:gap-3 items-center mt-5">
//                 <a
//                   href={project.link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-all duration-200"
//                 >
//                   Live Demo
//                 </a>
//                 <a
//                   href={project.gitLink}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm transition-all duration-200"
//                 >
//                   GitHub Repo
//                 </a>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       {selectedProjectId && (
        
//             // {/* {console.log("Passing to FullProjectInfo:", selectedProject)} */}

//             <FullProjectInfo id={selectedProjectId} onClose={() => setSelectedProjectId(null)} />
//           )}
//     </div>
//   );
// };

// export default ProjectList;

import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa"; // Importing trash icon
import projectsData from "/public/projectsData.json";
import FullProjectInfo from "../../projects/FullProjectInfo";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  useEffect(() => {
    const fetchProjects = () => {
      const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
      const mergedProjects = [...projectsData, ...storedProjects];
      setProjects(mergedProjects);
    };

    fetchProjects();
    window.addEventListener("storage", fetchProjects);
    return () => window.removeEventListener("storage", fetchProjects);
  }, []);

  const handleDelete = (id) => {
    // Remove from localStorage
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    const updatedStoredProjects = storedProjects.filter((project) => project.id !== id);
    localStorage.setItem("projects", JSON.stringify(updatedStoredProjects));
  
    // Remove from state without affecting default projects
    setProjects((prevProjects) => prevProjects.filter((project) => project.id !== id));
  
    // If the selected project is deleted, close FullProjectInfo
    if (selectedProjectId === id) {
      setSelectedProjectId(null);
    }
  };
  

  return (
    <div className="bg-gray-100 rounded-xl dark:bg-gray-900 min-h-screen py-10 px-5">
      <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-10">
        My Projects
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {projects.map((project, index) => (
          <div
            key={index}
            onClick={() => setSelectedProjectId(project.id)}
            className="relative bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-105"
          >
            {project.image.length > 0 ? (
              <img
                src={project.image[0]}
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
                <strong>Technologies:</strong> {project.technologies}
              </p>

              <div className="flex md:justify-between justify-evenly xl:justify-evenly lg:flex-row  md:gap-3 md:flex-col  flex-row items-center mt-5">
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
                handleDelete(project.id);
              }}
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>

      {selectedProjectId && (
        <FullProjectInfo id={selectedProjectId} onClose={() => setSelectedProjectId(null)} />
      )}
    </div>
  );
};

export default ProjectList;
