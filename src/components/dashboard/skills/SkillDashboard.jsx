import React, { useState } from "react";
import { motion } from "framer-motion";
import useSkillStore from "../../../store/useSkillStore";
import SkillForm from "./SkillForm";
import { Pencil, Trash } from "lucide-react";
import useAuthStore from "../../../store/authStore"; // Import authentication state
import useGlobalStateStore from "../../../store/useProjectStore";
import AddSkill from "./AddSkill";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import {Tooltip}  from "react-tooltip";


const SkillRow = ({ skill,allSkills }) => {
  const { setActiveComponent, activeComponent } = useGlobalStateStore();
  const { setSelectedSkill } = useSkillStore();
  const { deleteSkill } = useSkillStore();
  const { isAuthenticated } = useAuthStore();
  const token = localStorage.getItem("token");

  const relatedSkills = allSkills
  .filter((s) => s.category === skill.category && s._id !== skill._id)
  .map((s) => s.name);


  const handleEdit = () => {
    setSelectedSkill(skill); // Set selected skill for editing
    setActiveComponent("skillForm");
    console.log("🔄 Switching to SkillForm", activeComponent);
  };

  const handleDelete = async () => {
    toast.warn(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to delete <strong>{skill.name}</strong>?</p>
          <div className="flex justify-center gap-3 mt-2">
            <button
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={async () => {
                try {
                  await deleteSkill(skill._id, token);
                  toast.success(`${skill.name} deleted successfully! ✅`);
                } catch (error) {
                  toast.error(`Error deleting ${skill.name}: ${error.message}`);
                }
                closeToast();
              }}
            >
              Confirm
            </button>
            <button
              className="bg-gray-500 text-white px-3 py-1 rounded"
              onClick={closeToast}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { autoClose: false, closeOnClick: false }
    );
  };

  return (
    <div className="flex items-center justify-between bg-gray-100 rounded-2xl px-4 mb-2 relative" data-tip>
      <div className="w-1/3 text-lg cursor-pointer font-semibold" data-tooltip-id={`tooltip-${skill._id}`}>{skill.name}</div>  
        <div className="w-1/3 text-gray-600">{skill.category}</div>
      <div className="w-1/4"><CircularProgress proficiency={skill.proficiency} /></div>
      {isAuthenticated && (
        <div className="w-1/6 flex justify-center gap-4">
          <button className="text-blue-500 cursor-pointer hover:text-blue-700" onClick={handleEdit}>
            <Pencil size={20} />
          </button>
          <button className="text-red-500 cursor-pointer hover:text-red-700" onClick={handleDelete}>
            <Trash size={20} />
          </button>
        </div>
      )}
      {/* Tooltip for related skills */}
      {relatedSkills.length > 0 && (
        <Tooltip id={`tooltip-${skill._id}`} effect="solid" >
          <span className="text-sm font-semibold">Related: {relatedSkills.join(", ")}</span>
        </Tooltip>
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
      >
        {proficiency}%
      </text>
    </svg>
  );
};
// const SkillsDashboard = () => {
//   const { skills, loading, error } = useSkillStore();
//   const { activeComponent } = useGlobalStateStore();
//   const { isAuthenticated } = useAuthStore();

//   return (
//     <div className="p-6 pt-12">
//       <h2 className="text-2xl justify-center items-center flex font-bold mb-4">Skills Overview</h2>
//       {loading && <p>Loading skills...</p>}
//       {error && <p>Error loading skills: {error}</p>}
//       <p className="text-gray-600 mb-6">
//         Here is a breakdown of your skills, categorized by proficiency level. 
//         Use this dashboard to track and manage your technical expertise.
//       </p>
//       {isAuthenticated && (
//           <div className="flex flex-col md:flex-row  items-center justify-center md:items-start md:justify-start ">
//             <p className="text-gray-700 text-md ">
//                To add a new skill? Click here 👉
//             </p>
//             <AddSkill />
//           </div>
//         )}
//       <div className="pt-12">
//       {skills.length > 0 ? skills.map((skill) => <SkillRow key={skill._id} skill={skill} allSkills={skills} />) : <p>No skills added yet.</p>}

//       </div>
//     </div>
//   );
// };


const SkillsDashboard = () => {
  const { skills, loading, error } = useSkillStore();
  const { isAuthenticated } = useAuthStore();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Get unique categories for the dropdown
  const categories = ["All", ...new Set(skills.map((skill) => skill.category))];

  // Filtered skills based on search and category
  const filteredSkills = skills.filter(
    (skill) =>
      (selectedCategory === "All" || skill.category === selectedCategory) &&
      skill.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 pt-12">
      <h2 className="text-2xl flex justify-center items-center font-bold mb-4">Skills Overview</h2>
      {loading && <p>Loading skills...</p>}
      {error && <p className="text-red-500">Error loading skills: {error}</p>}

      <p className="text-gray-600 mb-6">
        Here is a breakdown of my skills, categorized by proficiency level. 
      </p>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
        {/* Search Box */}
        <input
          type="text"
          placeholder="Search skills..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full md:w-1/9"
        />

        {/* Category Filter Dropdown */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full md:w-1/13"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {isAuthenticated && (
        <div className="flex flex-col md:flex-row items-center justify-center md:items-start md:justify-start">
          <p className="text-gray-700 text-md">To add a new skill? Click here 👉</p>
          <AddSkill />
        </div>
      )}

      <div className="pt-6">
        {filteredSkills.length > 0 ? (
          filteredSkills.map((skill) => <SkillRow key={skill._id} skill={skill} allSkills={skills} />)
        ) : (
          <p className="text-gray-500">No matching skills found.</p>
        )}
      </div>
    </div>
  );
};

export default SkillsDashboard;
