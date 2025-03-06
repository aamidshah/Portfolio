import useGlobalStateStore from "../../../store/useProjectStore";

const ProjectContributors = () => {
  const { projects } = useGlobalStateStore();
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
        A total of <span className=" font-semibold text-blue-600">{totalContributors}</span> contributors have worked 
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
              // Extract names and assign roles cyclically
              const contributorNames = project.contributors
                .map(contributor => (typeof contributor === "string" ? contributor : contributor.name))
                .join(", ");

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
