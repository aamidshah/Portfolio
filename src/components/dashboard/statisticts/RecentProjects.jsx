import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import useGlobalStateStore from "../../../store/useProjectStore";

const RecentProjects = () => {
  // const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
const {projects} = useGlobalStateStore()
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" }); 
};
  // Show only the first 3 projects unless "See More" is clicked
  const displayedProjects = showAll ? projects : projects.slice(0, 3);
console.log(projects)
  return (
    <div className="container mx-auto p-6 !bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
      <div className="space-y-3">
        {displayedProjects.map((project) => (
          <div key={project._id} className="flex justify-between items-center pb-2">
            <span className="font-sm text-gray-600">{project.name}</span>
            <span className="text-sm text-gray-600">{formatDate(project.startDate)} - {formatDate(project.endDate)}</span>
            <span className={`px-2 py-1 text-xs font-semibold rounded-md ${project.status === "Completed" ? "bg-green-200 text-green-700" : "bg-yellow-200 text-yellow-700"}`}>
              {project.status}
            </span>
          </div>
        ))}
      </div>

      {/* See More Button */}
      {projects.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-4 text-blue-600 font-medium hover:underline"
        >
          {showAll ? "See Less" : "See More"}
        </button>
      )}
    </div>
  );
};

export default RecentProjects;
