import React, { useState } from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import useGlobalStateStore from "../../../store/useProjectStore";
import { motion } from "framer-motion";

const COLORS = ["#ef4444", "#0fbb00", "#22c55e", "#3b82f6", "#a855f7"];

const CircularProgress = ({ proficiency }) => {
  const radius = 50;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (proficiency / 100) * circumference;

  const getColor = (proficiency) => {
    if (proficiency <= 33) return "#ef4444"; // Red for Beginner
    if (proficiency <= 66) return "#facc15"; // Yellow for Intermediate
    if (proficiency <= 90) return "#3b82f6"; // Green for Advanced
    return "#22c55e"; // Green for Advanced
  };

  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle stroke="#e5e7eb" fill="transparent" strokeWidth={stroke} r={normalizedRadius} cx={radius} cy={radius} />
      <motion.circle
        stroke={getColor(proficiency)}
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="14" fontWeight="bold" fill="#374151">
        {proficiency}%
      </text>
    </svg>
  );
};

const ProjectSkillUsageGraph = () => {
  const { projects } = useGlobalStateStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!projects.length) return <p>No project data available.</p>;

  const currentProject = projects[currentIndex];
  const skillData = Object.entries(currentProject.technologyUsage).map(([name, proficiency], index) => ({
    name,
    proficiency,
    color: COLORS[index % COLORS.length], // Assigning colors dynamically
  }));

  const nextProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };

  return (
    <div className="p-6  pt-18 shadow-md rounded-lg">
      <h2 className="text-xl font-bold text-center mb-4">{currentProject.name} - Skill Usage</h2>
      <p className="flex items-center justify-center mb-6">"Visualizing Skill Usage Across Projects – Interactive Pie Chart & Progress Indicators" 🚀







</p>
      
      {/* Pie Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={skillData}
            dataKey="proficiency"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {skillData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      {/* Circular Progress Indicators */}
      <div className="flex flex-wrap justify-center gap-6 mt-6">
        {skillData.map((skill) => (
          <div key={skill.name} className="flex flex-col items-center">
            <CircularProgress proficiency={skill.proficiency} />
            <span className="mt-2 text-sm font-medium">{skill.name}</span>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button className="px-4 py-2 font-bold text-blue-700 hover:underline" onClick={prevProject}>
          Previous
        </button>
        <button className="px-4 py-2 font-bold text-blue-700 hover:underline" onClick={nextProject}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ProjectSkillUsageGraph;
