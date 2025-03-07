import useGlobalStateStore from "../../../store/useProjectStore";
import useAuthStore from "../../../store/authStore"; // Import auth store

const ProjectContributors = () => {
  const { projects } = useGlobalStateStore();
  const { isAuthenticated } = useAuthStore(); // Check if user is logged in
  const roles = ["Developer", "Designer", "Project Manager", "Tester", "QA Engineer"];

  // Calculate total number of contributors across all projects
  const totalContributors = new Set(
    projects.flatMap(project =>
      project.contributors.map(contributor => (typeof contributor === "string" ? contributor : contributor.name))
    )
  ).size;

  // Calculate total projects
  const totalProjects = projects.length;

  return (
    <div className="p-6 lg:pt-18 xl:px-40">
      <h2 className="text-xl flex items-center justify-center font-bold mb-4">📌 Project Contributors</h2>
      <p className="text-center text-sm text-gray-600 mb-4">
        A total of <span className="font-semibold text-blue-600">{totalContributors}</span> contributors have worked 
        on <span className="font-semibold text-blue-600">{totalProjects}</span> projects, taking on various roles to 
        bring ideas to life.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="text-gray-700 text-sm">
              <th className="p-3">Project</th>
              <th className="p-3">Total Contributors</th>
              <th className="p-3">Contributors</th>
              <th className="p-3">Roles</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => {
              // Hide contributor names if user is not logged in
              const contributorNames = isAuthenticated ? (
                project.contributors.map(contributor => (typeof contributor === "string" ? contributor : contributor.name)).join(", ")
              ) : (
                <span className="relative group cursor-pointer text-red-500">
                  Hidden
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-gray-500 text-white text-xs rounded-md px-5 py-0 shadow-lg">
                    You must log in to see contributors
                  </span>
                </span>
              );

              const assignedRoles = project.contributors
                .map((_, i) => roles[i % roles.length])
                .join(", ");

              return (
                <tr key={index} className="text-sm">
                  <td className="p-3 text-gray-800">{project.name}</td>
                  <td className="p-3 text-blue-600 font-medium">{project.contributors.length}</td>
                  <td className="p-3 text-gray-700">{contributorNames}</td>
                  <td className="p-3 text-gray-500">{assignedRoles}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectContributors;

