import React from 'react'
import { FaHtml5, FaReact } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import { SiTypescript } from "react-icons/si";
import { SiRedux } from "react-icons/si";
import { RiTailwindCssFill } from "react-icons/ri";
import { IoLogoReact } from "react-icons/io5";
import SingleSkill from './SingleSkill';
import { FaPython } from "react-icons/fa";
import { motion } from 'framer-motion';
import { FadeIn } from '../../framerMotion/Variants'
import { FaNodeJs } from "react-icons/fa";






const skills =[
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
  // {
  //   skill: 'typescript',
  //   icon: SiTypescript

  // },
  
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

  },
  {
    skill: 'Node.js',
    icon: FaNodeJs
  },
  {
    skill: 'Express.js',
    icon: FaNodeJs
  }
]

const AllSkiills = () => {
  return (
    <div>
      <div className='flex items-center justify-center relative gap-2 max-w-[1002px] mx-auto '>

        {skills.map((item,index)=>{
          return (
            <motion.div 
            variants={FadeIn('up', `0.${index}`) }
                         initial = 'hidden'
                         whileInView = 'show'
                         viewport={{once: false, amount: 0}}
                  
            >
          <SingleSkill key={index} text={item.skill} imgSvg={<item.icon />} />
          </motion.div>
        )})}
      </div>
     
    </div>
  )
}

export default AllSkiills