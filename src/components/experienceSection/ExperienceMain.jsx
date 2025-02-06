import React from 'react'
import ExperienceText from './ExperienceText'
import ExperienceTop from './ExperienceTop'
import AllExperience from './AllExperience'
// import SingleExperience from './SingleExperience'
import { motion } from 'framer-motion';
import { FadeIn } from '../../framerMotion/Variants'


const ExperienceMain = () => {
  return (
    <div id='experience' className='max-w[1100px] mx-auto px-4  '>

      <div 
          variants={FadeIn('down', 0.2) }
                   initial = 'hidden'
                   whileInView = 'show'
                   viewport={{once: false, amount: 0.7}}
      >

      <ExperienceText />
      </div>
      <motion.div
      variants={FadeIn('down', 0.2) }
      initial = 'hidden'
      whileInView = 'show'
      viewport={{once: false, amount: 0.7}}
>
      

      <ExperienceTop/>
      </motion.div>
      <div className='w-full mt-4 h-1 bg-lightBrown lg:block hidden '>

      </div>
      <AllExperience />
      {/* <SingleExperience /> */}

    </div>
  )
}

export default ExperienceMain