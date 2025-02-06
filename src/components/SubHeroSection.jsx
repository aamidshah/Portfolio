import React from 'react'
import { motion } from 'framer-motion';
import { FadeIn } from '../framerMotion/Variants'; 

const SubHeroSection = () => {
  return (
    <motion.div
     variants={FadeIn('up', 0.2) }
                            initial = 'hidden'
                            whileInView = 'show'
                            viewport={{once: false, amount: 0.7}}
         
    
    className='w-full border-y border-lightGrey mt-6 text-lightGrey flex justify-around uppercase xl:text-4xl md:text-2xl sm:text-4xl py-8 items-center gap-4 bg-brown '>
        <motion.p 
          variants={FadeIn('right', 0.2) }
          initial = 'hidden'
          whileInView = 'show'
          viewport={{once: false, amount: 0.7}}
        className='md:block hidden'>Fast Learner</motion.p>
      <motion.p
        variants={FadeIn('up', 0.2) }
        initial = 'hidden'
        whileInView = 'show'
        viewport={{once: false, amount: 0.7}}
      className='md:block hidden'>Team Player</motion.p>
      <motion.p
        variants={FadeIn('left', 0.2) }
        initial = 'hidden'
        whileInView = 'show'
        viewport={{once: false, amount: 0}}
      className='block'>Problem Solver</motion.p>
    </motion.div>
  )
}

export default SubHeroSection