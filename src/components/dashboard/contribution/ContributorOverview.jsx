import useGlobalStateStore from "../../../store/useProjectStore";
import useAuthStore from "../../../store/authStore";

const ContributorOverview = () => {
  const { projects } = useGlobalStateStore();
  const { isAuthenticated } = useAuthStore();

  const contributorsData = {};

  projects.forEach((project) => {
    project.contributors.forEach((contributor) => {
      const name = typeof contributor === "string" ? contributor : contributor.name;
      const date = contributor.date || "N/A";
      const projectName = project.name || "Unknown Project";

      if (!contributorsData[name]) {
        contributorsData[name] = { count: 0, lastContribution: "N/A", projects: new Set() };
      }
      contributorsData[name].count += 1;
      contributorsData[name].projects.add(projectName);

      if (date !== "N/A" && (!contributorsData[name].lastContribution || new Date(date) > new Date(contributorsData[name].lastContribution))) {
        contributorsData[name].lastContribution = date;
      }
    });
  });

  const sortedContributors = Object.entries(contributorsData)
    .map(([name, data]) => ({
      name: isAuthenticated ? name : "Hidden",
      ...data,
      projects: [...data.projects],
    }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className="p-6 !bg-white xl:px-30">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center justify-center gap-2">
        👥 Contributor Overview
      </h2>
      <p className="text-gray-500 text-[0.9rem]">
        The Contributor Overview highlights the most active members in our projects, ranking them based on their total contributions.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full rounded-lg shadow-sm">
          <thead>
            <tr className="text-gray-700 text-sm border-b">
              <th className="p-3 text-left">Rank</th>
              <th className="p-3 text-left">Contributor</th>
              <th className="p-3 text-left">Total Contributions</th>
              <th className="p-3 hidden md:block text-left">Last Contribution</th>
              <th className="p-3 text-left">Projects</th>
            </tr>
          </thead>
          <tbody>
            {sortedContributors.map(({ name, count, lastContribution, projects }, index) => (
              <tr key={index} className="group text-sm border border-gray-400 hover:bg-gray-50 transition">
                <td className="p-3 font-semibold text-gray-700">#{index + 1}</td>
                <td className="p-3 text-blue-600 relative">
                  {isAuthenticated ? (
                    name
                  ) : (
                    <span className="relative group cursor-pointer text-red-500">
                      Hidden
                      <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 hidden group-hover:block bg-gray-600 text-white text-xs rounded-md px-3 py-2 shadow-lg">
                        You must log in to see contributors
                      </span>
                    </span>
                  )}
                </td>
                <td className="p-3 text-gray-500">{count}</td>
                <td className="p-3 hidden md:block text-gray-500">{lastContribution}</td>
                <td className="p-3 text-gray-600">{projects.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default ContributorOverview;

