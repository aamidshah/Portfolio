import React, { useState } from "react";
import useGlobalStateStore from "../../../store/useProjectStore";

const ContributorBadges = () => {
  const { projects } = useGlobalStateStore();
  const [showAll, setShowAll] = useState(false);

  // Count occurrences of each contributor across all projects
  const contributorCounts = projects.reduce((acc, project) => {
    if (!project.contributors || !Array.isArray(project.contributors)) return acc;

    project.contributors.forEach((name) => {
      acc[name] = (acc[name] || 0) + 1; // Each appearance counts as one contribution
    });

    return acc;
  }, {});

  // Sort contributors by total contributions (descending order)
  const sortedContributors = Object.entries(contributorCounts)
    .sort(([, countA], [, countB]) => countB - countA)
    .map(([name, contributions], index) => ({ name, contributions, rank: index + 1 }));

  // Control the number of displayed contributors
  const displayedContributors = showAll ? sortedContributors : sortedContributors.slice(0, 6);

  // Assign badges based on rank
  const getBadge = (rank) => {
    if (rank === 1) return "🏆 Gold Contributor";
    if (rank === 2) return "🥈 Silver Contributor";
    if (rank === 3) return "🥉 Bronze Contributor";
    return "🎖️ Active Contributor";
  };

  return (
    <div className="xl:px-40 pt-20 shadow-md rounded-lg">
      <h2 className="text-xl flex items-center justify-center font-bold mb-4">
        🏅 Top Contributors & Achievements
      </h2>
      <div className="grid md:grid-cols-3 px-4 lg:grid-cols-3 gap-4">
        {displayedContributors.map(({ name, contributions, rank }) => (
          <div
            key={name}
            className="p-4 rounded-lg shadow-md flex flex-col items-center text-center border border-gray-100"
          >
            <span className="text-md">{getBadge(rank)}</span>
            <h3 className="text-gray-500 mt-2">{name}</h3>
            <p className="text-gray-600">Projects Contributed: {contributions}</p>
          </div>
        ))}
      </div>
      {sortedContributors.length > 6 && (
        <div className="flex justify-center mt-6">
          <h3
            onClick={() => setShowAll(!showAll)}
            className="px-4 py-2 mb-6 font-bold text-lg  text-blue-600 hover:underline cursor-pointer transition"
          >
            {showAll ? "Show Less" : "See More..."}
          </h3>
        </div>
      )}
    </div>
  );
};

export default ContributorBadges;
