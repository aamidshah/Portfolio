import React from 'react'
import { motion } from 'framer-motion';
import { FadeIn } from '../../framerMotion/Variants'

const ExperienceSingle = ({experience}) => {
  return (
    <motion.div 
     variants={FadeIn('right', 0.2) }
                       initial = 'hidden'
                       whileInView = 'show'
                       viewport={{once: false, amount: 0.7}}
          
    
    className='md:h-[330px]  md:w-[240px] h-auto w-full border border-orange border-dashed rounded-2xl p-4 mt-8 overflow-hidden  '>
      <p className='font-bold text-cyan'>{experience.job}</p>
      <p className=' text-orange'>{experience.company}</p>
      <p className='text-lightGrey'>{experience.date}</p>
      <ul className='list-disc mt-4 pl-4 text-white font-semibold  pb-4  '>
        {
          experience.responsibilities.map((responsibility, index) =>{
            return <li key={index} >{responsibility}</li>
          })
        }
        
      </ul>
    </motion.div>
  )
}

export default ExperienceSingle