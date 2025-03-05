import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const ProjectProgressChart = () => {
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState({ totalProjects: 0, latestProject: "N/A", timeRange: "N/A" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/stats/projects`);
        console.log("Project Progress Data:", response.data);
        setData(response.data);

        if (response.data.length > 0) {
          const totalProjects = response.data.reduce((acc, item) => acc + item.projects, 0);
          
          // Extract latest project details (last month entry)
          const latestProjects = response.data[response.data.length - 1]?.details || [];
          const latestProject = latestProjects.length > 0 ? latestProjects[latestProjects.length - 1].name : "N/A";

          const timeRange = `${response.data[0].time} - ${response.data[response.data.length - 1].time}`;

          setSummary({ totalProjects, latestProject, timeRange });
        }
      } catch (error) {
        console.error("Error fetching project progress data:", error);
      }
    };
    fetchData();
  }, []);

  // Custom Tooltip to display project names
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const projectDetails = data.find((entry) => entry.time === label)?.details || [];
      return (
        <div className="bg-white p-3 border border-gray-300 shadow-lg rounded-md">
          <p className="text-gray-800 font-semibold">{label}</p>
          <p className="text-blue-600">📌 Projects: {payload[0].value}</p>
          <ul className="mt-2 text-sm text-gray-700">
            {projectDetails.map((project, index) => (
              <li key={index}>🔹 {project.name} ({project.status})</li>
            ))}
          </ul>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full xl:px-[100px] h-auto mt-18 p-6">
      {/* 📢 Summary Section */}
      <div className="text-center mb-6">
  {/* Introductory Paragraph */}
  <h2 className="text-2xl mb-4 font-semibold text-gray-800 tracking-wide">
    📊 Project Progress Overview
  </h2>
  <p className="text-md text-gray-700  mb-4">
  🚀 Here's an overview of my project journey, showcasing the total projects I've worked on, the latest addition, and the overall progress over time.
  </p>


  <div className="flex flex-col md:flex-row gap-6 xl:gap-28 items-center justify-center mt-4">
    <p className="text-md text-gray-600 mt-2">
      🚀 Total Projects: <span className="font-bold text-blue-600">{summary.totalProjects}</span>
    </p>
    <p className="text-md text-gray-600">
      🏆 Latest Project: <span className="font-bold text-green-600">{summary.latestProject}</span>
    </p>
    <p className="text-md text-gray-600">
      📅 Time Range: <span className="font-bold">{summary.timeRange}</span>
    </p>
</div>

      </div>

      {/* 📈 Chart Section */}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 40, right: 60, left: 30, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 0, 0, 0.1)" />
          <XAxis dataKey="time" stroke="gray" />
          <YAxis stroke="gray" />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ color: "#555" }} />
          <Line
            type="monotone"
            dataKey="projects"
            stroke="#3498db"
            strokeWidth={2}
            dot={{ fill: "#3498db", strokeWidth: 1, r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProjectProgressChart;
