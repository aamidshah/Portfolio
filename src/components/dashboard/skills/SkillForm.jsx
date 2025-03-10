
import React, { useState, useEffect } from "react";
import useSkillStore from "../../../store/useSkillStore";
import useAuthStore from "../../../store/authStore";
import useGlobalStateStore from "../../../store/useProjectStore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
const categoryColors = {
  Frontend: "bg-blue-500",
  Backend: "bg-green-500",
  "Full Stack": "bg-purple-500",
  Database: "bg-yellow-500",
  DevOps: "bg-orange-500",
  "Mobile Development": "bg-teal-500",
  Other: "bg-gray-500",
};

const predefinedSkills = ["React", "Node.js", "MongoDB", "Express", "Vue.js", "Django", "Flutter"];

const SkillForm = ({ skill = null }) => {
const { selectedSkill, setSelectedSkill, addSkill,fetchSkills, updateSkill } = useSkillStore();
const { setActiveComponent } = useGlobalStateStore();
const { token } = useAuthStore(); // ✅ Get token from auth store
const [customCategory, setCustomCategory] = useState(""); // New state for user input


const [formData, setFormData] = useState({
  name: "",
  category: "",
  proficiency: 50,
});

useEffect(() => {
  if (selectedSkill) {
    setFormData({
      name: selectedSkill.name || "",
      category: selectedSkill.category || "",
      proficiency: selectedSkill.proficiency || 50,
    });
  } else {
    setFormData({
      name: "",
      category: "",
      proficiency: 50,
    });
  }
}, [selectedSkill]);

const handleCategoryChange = (e) => {
  const value = e.target.value;
  if (value === "other") {
    setFormData((prev) => ({ ...prev, category: "other" })); // ✅ Keep "other" selected
  } else {
    setFormData((prev) => ({ ...prev, category: value }));
    setCustomCategory(""); // Reset input when switching back to predefined categories
  }
};

const handleCustomCategoryChange = (e) => {
  setCustomCategory(e.target.value);
  setFormData((prev) => ({
    ...prev,
    category: "other", // ✅ Keep "other" selected while typing
  }));
};

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

const handleSliderChange = (e) => {
  setFormData((prevData) => ({
    ...prevData,
    proficiency: Number(e.target.value),
  }));
};

const onClose = () => {
  setFormData({
    name: "",
    category: "",
    proficiency: 50,
  });
  setSelectedSkill(null); // Clear selected skill
  setActiveComponent("Skills");
};

const handleSubmit = async (e) => {
  e.preventDefault();
  
  const finalFormData = {
    ...formData,
    category: formData.category === "other" ? customCategory : formData.category, // ✅ Use custom category if 'other'
  };

  try {
    const existingSkills = await fetchSkills(token); 

    console.log("Fetched skills:", existingSkills);

    if (!existingSkills || !Array.isArray(existingSkills)) {
      console.error("Error fetching skills: Data is not an array", existingSkills);
      toast.error("Failed to check for duplicate skills.");
      return;
    }

    const isDuplicate = existingSkills.some(
      (skill) => skill.name.toLowerCase() === finalFormData.name.toLowerCase()
    );

    if (isDuplicate && (!selectedSkill || selectedSkill.name.toLowerCase() !== finalFormData.name.toLowerCase())) {
      toast.error("A skill with this name already exists! ❌");
      return;
    }

    if (selectedSkill && selectedSkill._id) {
      await updateSkill(selectedSkill._id, finalFormData, token);
      toast.success("Skill updated successfully! ✅");
    } else {
      await addSkill(finalFormData, token);
      toast.success("Skill added successfully! 🎉");
    }

    await fetchSkills(); 
    onClose();
  } catch (error) {
    toast.error("Something went wrong! ❌");
    console.error("Error updating skill:", error);
  }
};

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/login.jpg')" }}
    >
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50"></div>
      <div className="relative p-6 rounded-2xl shadow-xl w-80 bg-transparent backdrop-blur-md border border-gray-300 dark:border-gray-600">
        <h2 className="text-xl text-white font-bold mb-4">{selectedSkill ? "Update Skill" : "Add Skill"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-white">
          <div>
            <label htmlFor="name" className="block font-medium">Skill Name</label>
            <input
              id="name"
              name="name"
              list="skills"
              value={formData.name}
              placeholder="Select a skill"
              onChange={handleChange}
              required
              className="w-full mt-3 p-3 border rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <datalist id="skills">
              {predefinedSkills.map((skill, index) => (
                <option key={index} value={skill} />
              ))}
            </datalist>
          </div>
          <div>
<label htmlFor="category" className="block font-medium text-white">Category</label>

{/* Dropdown for predefined categories */}
<select
  id="category"
  name="category"
  value={formData.category} // Ensures the selected value is controlled
  onChange={handleCategoryChange}
  className="w-full mt-3 p-3 border rounded-lg bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
>
  <option value="" className="bg-white text-black">Select a category</option>
  <option value="Frontend" className="bg-white text-black">Frontend</option>
  <option value="Backend" className="bg-white text-black">Backend</option>
  <option value="Full Stack" className="bg-white text-black">Full Stack</option>
  <option value="Database" className="bg-white text-black">Database</option>
  <option value="DevOps" className="bg-white text-black">DevOps</option>
  <option value="Mobile Development" className="bg-white text-black">Mobile Development</option>
  <option value="other" className="bg-white text-black">Other</option> {/* User-defined option */}
</select>


{/* Show input box if 'Other' is selected */}
{formData.category === "other" && (
  <input
    id="customCategory"
    name="customCategory"
    placeholder="Enter custom category"
    value={customCategory}
    onChange={handleCustomCategoryChange}
    required
    className="w-full mt-3 p-3 border rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
)}
</div>
          <div>
            <label className="block font-medium">Proficiency</label>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={formData.proficiency}
              onChange={handleSliderChange}
              className={`w-full ${categoryColors[formData.category] || "bg-white"}`}
            />
            <p className="text-center mt-2">{formData.proficiency}%</p>
          </div>
          <div className="flex justify-center gap-4">
            <button type="button" className="px-4 text-black py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
              {selectedSkill ? "Update" : "Add"} Skill
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SkillForm;



