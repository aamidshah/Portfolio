import React, { useState } from "react";
import { motion } from "framer-motion";
import useSkillStore from "../../../store/useSkillStore";
import SkillForm from "./SkillForm";
import { Pencil, Trash } from "lucide-react";
import useAuthStore from "../../../store/authStore"; // Import authentication state
import useGlobalStateStore from "../../../store/useProjectStore";
import AddSkill from "./AddSkill";

const SkillRow = ({ skill }) => {
  const { setActiveComponent ,activeComponent} = useGlobalStateStore();
  const {setSelectedSkill} = useSkillStore()
  const { deleteSkill } = useSkillStore();
  const { isAuthenticated } = useAuthStore();
  const token = localStorage.getItem("token");

  const handleEdit = () => {
    setSelectedSkill(skill); // Set selected skill for editing
    setActiveComponent("skillForm");
    console.log("🔄 Switching to SkillForm", activeComponent);

  };

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete ${skill.name}?`)) {
      await deleteSkill(skill._id, token);
    }
  };

  return (
    <div className="flex items-center justify-between bg-gray-100 rounded-2xl px-4  mb-2">
      <div className="w-1/3 text-lg font-semibold">{skill.name}</div>
      <div className="w-1/3 text-gray-600">{skill.category}</div>
      <div className="w-1/4"><CircularProgress proficiency={skill.proficiency} /></div>
      {isAuthenticated && (
        <div className="w-1/6 flex justify-center gap-4">
          <button className="text-blue-500 cursor-pointer hover:text-blue-700" onClick={handleEdit}>
            <Pencil size={20} />
          </button>
          <button className="text-red-500  cursor-pointer hover:text-red-700" onClick={handleDelete}>
            <Trash size={20} />
          </button>
        </div>
      )}
    </div>
  );
};
const CircularProgress = ({ proficiency }) => {
  const radius = 40;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (proficiency / 100) * circumference;

  // Gradient Colors
  const getGradientId = `grad-${proficiency}`; // Unique gradient ID per component
  const getGradient = (proficiency) => {
    if (proficiency <= 33) return ["#ef4444", "#f87171"]; // Red shades
    if (proficiency <= 66) return ["#facc15", "#fde047"]; // Yellow shades
    return ["#22c55e", "#4ade80"]; // Green shades
  };

  const [startColor, endColor] = getGradient(proficiency);

  return (
    <svg height={radius * 2} width={radius * 2}>
      {/* Gradient Definition */}
      <defs>
        <linearGradient id={getGradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={startColor} />
          <stop offset="100%" stopColor={endColor} />
        </linearGradient>
      </defs>

      {/* Background Circle */}
      <circle
        stroke="#e5e7eb"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      
      {/* Animated Progress Circle with Gradient & Glow Effect */}
      <motion.circle
        stroke={`url(#${getGradientId})`}
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
        // style={{ filter: "drop-shadow(0px 0px 6px rgba(0,0,0,0.2))" }} // Subtle glow
      />

      {/* Percentage Text */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        fontSize="14"
        fontWeight="bold"
        fill="#374151"
        // style={{ filter: "drop-shadow(1px 1px 4px rgba(0,0,0,0.3))" }}
      >
        {proficiency}%
      </text>
    </svg>
  );
};

const SkillsDashboard = () => {
  const { skills, loading, error } = useSkillStore();
  const { activeComponent } = useGlobalStateStore();
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="p-6 pt-12">
      <h2 className="text-2xl justify-center items-center flex font-bold mb-4">Skills Overview</h2>
      {loading && <p>Loading skills...</p>}
      {error && <p>Error loading skills: {error}</p>}
      <p className="text-gray-600 mb-6">
        Here is a breakdown of your skills, categorized by proficiency level. 
        Use this dashboard to track and manage your technical expertise.
      </p>
      {isAuthenticated && (
          <div className="flex flex-col md:flex-row  items-center justify-center md:items-start md:justify-start ">
            <p className="text-gray-700 text-md ">
               To add a new skill? Click here 👉
            </p>
            <AddSkill />
          </div>
        )}
      <div className="pt-12">
      {skills.length > 0 ? skills.map((skill) => <SkillRow key={skill._id} skill={skill} />) : <p>No skills added yet.</p>}

      </div>
    </div>
  );
};


export default SkillsDashboard;

