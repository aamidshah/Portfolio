import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "../../framerMotion/Variants";
import SingleSkill from "./SingleSkill";

// Import icons
import { FaHtml5, FaCss3Alt, FaPython, FaNodeJs, FaReact } from "react-icons/fa";
import { IoLogoJavascript, IoLogoReact } from "react-icons/io5";
import { SiRedux, SiTypescript } from "react-icons/si";
import { SiTailwindcss } from "react-icons/si";
import useSkillStore from "../../store/useSkillStore";

// Skill icons mapping
const skillIcons = {
  HTML: FaHtml5,
  CSS: FaCss3Alt,
  JavaScript: IoLogoJavascript,
  TypeScript: SiTypescript,
  React: IoLogoReact,
  Redux: SiRedux,
  Tailwind: SiTailwindcss,
  Python: FaPython,
  "Node.js": FaNodeJs,
  "Express.js": FaNodeJs, // Using Node.js icon for Express.js
};

const AllSkills = () => {
  const { skills, fetchSkills, loading, error } = useSkillStore();

  useEffect(() => {
    fetchSkills();
  }, []);

  if (loading) return <p>Loading skills...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex items-center justify-center relative gap-2 max-w-[1002px] mx-auto">
      {skills.map((skill, index) => {
        const IconComponent = skillIcons[skill.name] || FaReact; // Default icon if not found

        return (
          <motion.div
            key={skill._id}
            variants={FadeIn("up", `0.${index}`)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0 }}
          >
            <SingleSkill text={skill.name} imgSvg={<IconComponent />} />
          </motion.div>
        );
      })}
    </div>
  );
};

export default AllSkills;
