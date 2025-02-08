import React from 'react'
import { BiSolidRightTopArrowCircle } from "react-icons/bi";
import { motion } from 'framer-motion';
import { FadeIn } from '../../framerMotion/Variants'
import { Link } from 'react-scroll';


const SingleProject = ({name,year,align,image,tech,link}) => {
  return (
    <motion.div
    variants={FadeIn('up', 0.2) }
    initial = 'hidden'
    whileInView = 'show'
    viewport={{once: false, amount: 0.7}}

    
    className={`flex w-full sm:flex-col-reverse items-center gap-8 ${align === 'left' ? 'md:flex-row': ' md:flex-row-reverse'} justify-end lg:justify-evenly`}>
      <div>
        <h2 className='md:text-3xl text-2xl text-orange '>{name}</h2>
        <h2 className= {`text-xl  text-white font-semibold font-special sm:text-center ${ align === 'left' ? 'md:text-left' : 'md:text-left'}  `}>{year}</h2>
        <h2 className= {`text-[16px] font-thin text-white font-special sm:text-center ${ align === 'left' ? 'md:text-left' : 'md:text-left'}  `}>{tech}</h2>


        <a href={link} className={`text-lg flex gap-2 items-center text-cyan hover:!text-[var(--white)] transition-all duration-500  cursor-pointer sm:justify-self-center ${align === 'left' ? 'md:justify-self-start' : 'md:justify-self-start'} `}>view <BiSolidRightTopArrowCircle />
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