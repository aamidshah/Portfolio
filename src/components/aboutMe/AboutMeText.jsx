import React from 'react'
import { motion } from 'framer-motion';
import { FadeIn } from '../../framerMotion/Variants'
import { Link } from 'react-scroll';

const AboutMeText = ({}) => {
  return (
    <div className=' flex flex-col md:items-start items-center md:text-left text-center'>
      <h2
      

      className=' text-4xl text-cyan mb-10 '>About Me</h2>
      <p 
      

      className=' text-white max-w-[1200px]'>I am a passionate and motivated MCA student currently exploring the exciting world of software development. As a fresher, I am continuously learning and improving my skills in web development, problem-solving, and creating software solutions that make an impact.

      With a strong foundation in React, JavaScript, and Tailwind CSS, I love building intuitive and user-friendly web applications. I am always eager to explore new technologies and enhance my expertise in full-stack development.</p>
   
   <div className='flex flex-row gap-4'>
   <Link to='projects'
    
    smooth={true} 
    duration={800} 
    offset={-80} // Adjust if needed to prevent cutting off
  > 
  
  
   <button 
    className='border border-orange rounded-full py-2 px-4 text-lg flex items-center mt-10 hover:bg-[var(--orange)] transition-all duration-500 cursor-pointer md:self-start self-center text-white hover:text-[var(--cyan)] '>My Projects</button>
    </Link>

    <a href="resume.pdf" 
download="Shah_Aamid_Resume.pdf"  
    smooth={true} 
    duration={800} 
    offset={-80} // Adjust if needed to prevent cutting off
  > 
  
  
   <button 
    className='border border-orange rounded-full py-2 px-4 text-lg flex items-center mt-10 hover:bg-[var(--orange)] transition-all duration-500 cursor-pointer md:self-start self-center text-white hover:text-[var(--cyan)] '>Download CV</button>
    </a>

   </div>
  
    </div>
  )
}

export default AboutMeText