import React from 'react';

const ProjectInsights = () => {
  const insights = [
    { title: "Total Projects", value: 12 },
    { title: "Completed Projects", value: 8 },
    { title: "Ongoing Projects", value: 3 },
    { title: "Pending Reviews", value: 1 },
    { title: "Average Completion Time", value: "2.5 months" },
    { title: "Most Used Tech", value: "React & Tailwind" },
  ];

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Project Insights</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {insights.map((insight, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold">{insight.title}</h3>
            <p className="text-xl font-bold text-blue-600">{insight.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectInsights;
