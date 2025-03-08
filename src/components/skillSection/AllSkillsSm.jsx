import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from '../../framerMotion/Variants';
import useSkillStore from '../../store/useSkillStore';

// Importing icons
import { FaHtml5, FaCss3Alt, FaReact, FaPython } from "react-icons/fa";
import { IoLogoJavascript, IoLogoReact } from "react-icons/io5";
import { SiTypescript, SiRedux, SiTailwindcss } from "react-icons/si";

const iconMapping = {
  HTML: FaHtml5,
  CSS: FaCss3Alt,
  JavaScript: IoLogoJavascript,
  TypeScript: SiTypescript,
  React: IoLogoReact,
  Redux: SiRedux,
  Tailwind: SiTailwindcss,
  Python: FaPython
};

// Function to get the corresponding icon component
const getSkillIcon = (skillName) => {
  return iconMapping[skillName] || FaReact; // Default to React icon if not found
};

const AllSkillsSm = () => {
  const { skills } = useSkillStore(); // Fetch skills from Zustand store

  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-12 my-12 justify-center'>
      {skills.length > 0 ? (
        skills.map((item, index) => {
          const IconComponent = getSkillIcon(item.name); // Get the corresponding icon
          return (
            <motion.div  
              key={item._id}
              variants={FadeIn('up', 0.2)}
              initial='hidden'
              whileInView='show'
              viewport={{ once: false, amount: 0.7 }}
              className='flex flex-col items-center'
            >
              <IconComponent className='text-7xl text-orange' />
              <p className='text-center text-white mt-4'>{item.name}</p>
            </motion.div>
          );
        })
      ) : (
        <p className="text-center text-white col-span-2 md:col-span-4">
          No skills available.
        </p>
      )}
    </div>
  );
};

export default AllSkillsSm;
