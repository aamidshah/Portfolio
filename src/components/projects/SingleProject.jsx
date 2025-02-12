import React from 'react'
import { BiSolidRightTopArrowCircle } from "react-icons/bi";
import { motion } from 'framer-motion';
import { FadeIn } from '../../framerMotion/Variants'
import { Link } from 'react-scroll';


const SingleProject = ({name,year,align,image,tech,link,onSelect}) => {
  return (
    <motion.div
    variants={FadeIn('up', 0.2) }
    initial = 'hidden'
    whileInView = 'show'
    viewport={{once: false, amount: 0.7}}

    
    className={`flex w-full sm:flex-col-reverse items-center gap-8 ${align === 'left' ? 'md:flex-row': ' md:flex-row-reverse'} justify-end lg:justify-evenly`} onClick={()=>{ 
      onSelect() }}>
      <div>
        <h2 className='md:text-3xl text-2xl text-orange '>{name}</h2>
        <h2 className= {`text-xl  text-white font-semibold font-special sm:text-center ${ align === 'left' ? 'md:text-left' : 'md:text-left'}  `}>{year}</h2>
        
          <a href={link} target="_blank" rel="noopener noreferrer"
          className="text-lg flex gap-2 items-center text-cyan hover:!text-white transition-all duration-500 justify-center cursor-pointer"
          onClick={(e) => e.stopPropagation()} // Prevents triggering onSelect when clicking the link
        >          View <BiSolidRightTopArrowCircle />
</a>

      </div>

      <div className='max-h-[220px] max-w-[400px] rounded-xl overflow-hidden hover:scale-110 transform transition-all duration-500 relative border border-white '>
        <div className='w-full h-full bg-cyan opacity-[50%] absolute top-0 left-0 hover:opacity-0 transition-all duration-500 md:block hidden  '></div>
        <img src={image} alt="project-Image" className='w-full h-full  ' />
      </div>
    </motion.div>
  )
}

export default SingleProject