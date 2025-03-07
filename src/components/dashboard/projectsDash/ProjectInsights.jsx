


import React from "react";
 import useGlobalStateStore from "../../../store/useProjectStore";
 import CountUp from "react-countup";
 const ProjectInsights = () => {
  const projects = useGlobalStateStore((state) => state.projects) || []; // Ensure projects is always an array

  if (!projects.length) {
    return <p className="text-center text-gray-500">Loading project insights...</p>; // Optional: Show loading message
  }

  // Compute insights dynamically
  const totalProjects = projects.length;
  const completedProjects = projects.filter((p) => p.status === "Completed").length;
  const ongoingProjects = projects.filter((p) => p.status === "In Progress").length;
  const pending = projects.filter((p) => p.status === "Pending").length;

  // Average completion time calculation
  const completedWithTime = projects.filter((p) => p.status === "Completed" && p.startDate && p.endDate);

  const avgCompletionTime =
    completedWithTime.reduce((sum, p) => {
      const start = new Date(p.startDate);
      const end = new Date(p.endDate);
      const monthsTaken = (end - start) / (1000 * 60 * 60 * 24 * 30); // Convert milliseconds to months
      return sum + monthsTaken;
    }, 0) / (completedWithTime.length || 1);
  

  // Determine most used tech
  const techUsage = {};

  // Iterate through all projects
  projects.forEach((p) => {
    // Ensure technologyUsage is an object before processing
    if (p.technologyUsage && typeof p.technologyUsage === "object") {
      Object.entries(p.technologyUsage).forEach(([tech, usage]) => {
        techUsage[tech] = (techUsage[tech] || 0) + usage; // Sum usage values
      });
    }
  });
  const totalTechUsage = Object.values(techUsage).reduce((sum, usage) => sum + usage, 0);

  
  // Find the most used technology
  const mostUsedTech = Object.entries(techUsage).reduce(
    (max, [tech, usage]) => (usage > max.usage ? { name: tech, usage } : max),
    { name: "", usage: 0 }
  );
  
  // Ensure mostUsedTech is formatted correctly before rendering
  const mostUsedTechPercentage = totalTechUsage
  ? ((mostUsedTech.usage / totalTechUsage) * 100).toFixed(1) // Round to 1 decimal place
  : 0;

// Format display text
const mostUsedTechText = mostUsedTech.name
  ? `${mostUsedTech.name} - ${mostUsedTechPercentage}%`
  : "N/A";

  const insights = [
    { title: "Total Projects", value: totalProjects },
    { title: "Completed Projects", value: completedProjects },
    { title: "Ongoing Projects", value: ongoingProjects },
    { title: "Pending projects", value: pending },
    { title: "Average Completion Time", value: avgCompletionTime ? `${avgCompletionTime.toFixed(1)} months` : "N/A" },
    { title: "Most Used Tech", value: mostUsedTechText },
  ];

  return (
    <div className="p-12 xl:mx-12 shadow-xl rounded-2xl   !bg-[#e9ecf2]  ">
      <h2 className="text-2xl flex items-center justify-center  font-bold mb-4">Project Insights</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {insights.map((insight, index) => (
          <div key={index} className="!bg-white p-4 rounded-xl shadow-xl text-center">
            <h3 className="text-lg font-semibold">{insight.title}</h3>
              <p className="text-xl font-bold text-blue-600">
              {insight.isNumeric ? (
                <CountUp start={0} end={parseFloat(insight.value)} duration={2.5} separator="," suffix={insight.suffix || ""} />
              ) : (
                insight.value // Directly display text (e.g., most used tech)
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectInsights;
