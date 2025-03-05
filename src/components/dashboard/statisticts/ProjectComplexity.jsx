


import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const COLORS = {
  Easy: "#2ecc71", // Green
  Medium: "#f1c40f", // Yellow
  Hard: "#e74c3c", // Red
};

const ProjectComplexityChart = () => {
  const [data, setData] = useState([]);
  const [projectsByComplexity, setProjectsByComplexity] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/stats/projects`);
        const projects = response.data.flatMap((entry) => entry.details); // Extract all projects

        // Count complexities
        const complexityCounts = {};
        const groupedProjects = {};

        projects.forEach((project) => {
          const complexity = project.complexity || "Unknown";
          complexityCounts[complexity] = (complexityCounts[complexity] || 0) + 1;
          
          if (!groupedProjects[complexity]) {
            groupedProjects[complexity] = [];
          }
          groupedProjects[complexity].push(project.name);
        });

        // Convert to array format for Recharts
        const chartData = Object.keys(complexityCounts).map((key) => ({
          name: key,
          value: complexityCounts[key],
        }));

        setData(chartData);
        setProjectsByComplexity(groupedProjects);
      } catch (error) {
        console.error("Error fetching project complexity data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full h-auto p-6 text-black">
      {/* Title */}
      <h2 className="text-2xl font-semibold tracking-wide text-center text-black">
        ⚡ Project Complexity Overview
      </h2>

      {/* Chart Container */}
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={COLORS[entry.name] || "#8884d8"} />
            ))}
          </Pie>

          {/* Custom Tooltip Styling */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              borderRadius: "8px",
              color: "black",
            }}
            itemStyle={{ color: "black" }}
          />

          {/* Legend Styling */}
          <Legend  wrapperStyle={{ color: "black",  }} />
        </PieChart>
      </ResponsiveContainer>

      {/* Project Names List */}
 {/* Project Names List */}
{/* Project Names List */}
<div className="mt-6 flex flex-col sm:flex-col md:flex-row md:flex-wrap gap-6 md:justify-center w-full items-center text-center">
  {Object.entries(projectsByComplexity).map(([complexity, projectNames]) => (
    <div key={complexity} className="mb-4 md:flex-1">
      <h3 className="text-lg font-semibold" style={{ color: COLORS[complexity] || "black" }}>
        {complexity} Complexity
      </h3>
      {/* Centering the List */}
      <div className="flex justify-center">
        <ul className="list-disc list-inside text-gray-700">
          {projectNames.map((name, index) => (
            <li key={index} className="text-black">{name}</li>
          ))}
        </ul>
      </div>
    </div>
  ))}
</div>





    </div>
  );
};

export default ProjectComplexityChart;
