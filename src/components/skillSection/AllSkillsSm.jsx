
import React from 'react'
import { FaHtml5, FaReact } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import { SiTypescript } from "react-icons/si";
import { SiRedux } from "react-icons/si";
import { RiTailwindCssFill } from "react-icons/ri";
import { IoLogoReact } from "react-icons/io5";
import { FaPython } from "react-icons/fa";
import { motion } from 'framer-motion';
import { FadeIn } from '../../framerMotion/Variants'




const skills = [
  {
    skill: 'HTML',
    icon: FaHtml5
  },
  {
    skill: 'CSS',
    icon: FaCss3Alt
  },
  {
    skill: 'JavaScript',
    icon: IoLogoJavascript
  },
  {
    skill: 'TypeScript',
    icon: SiTypescript
  },
  {
    skill: 'React',
    icon: IoLogoReact
  },
  {
    skill: 'Redux',
    icon: SiRedux
  },
  {
    skill: 'Tailwind',
    icon: RiTailwindCssFill
  },
   {
      skill: 'python',
      icon: FaPython
  
    }
];

const AllSkillsSm = () => {
  return (
    <div className='grid md:grid-cols-4 grid-cols-2 gap-12 my-12'>
      {
        skills.map((item, index) => (
          <motion.div  
            variants={FadeIn('up', 0.2) }
                       initial = 'hidden'
                       whileInView = 'show'
                       viewport={{once: false, amount: 0.7}}
          key={index} className='flex flex-col items-center'>
            <item.icon className='text-7xl text-orange' />
            <p className='text-center text-white mt-4'>{item.skill}</p>
          </motion.div>
        ))
      }
    </div>
  );
}

export default AllSkillsSm;
