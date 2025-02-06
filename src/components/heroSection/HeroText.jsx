import React from 'react'
import { motion } from 'framer-motion';
import { FadeIn } from '../../framerMotion/Variants'
const HeroText = () => {
  return (
    <div className= '  flex flex-col gap-4 h-full justify-center md:text-left text-center  '>
      <motion.h2 
      variants={FadeIn('down', 0.2) }
      initial = 'hidden'
      whileInView = 'show'
      viewport={{once: false, amount: 0}}

       className= 'lg:text-2xl sm:text-xl uppercase text-cyan '>Front-end Web-Developer</motion.h2>
      <motion.h1 
      variants={FadeIn('right', 0.4) }
      initial = 'hidden'
      whileInView = 'show'
      viewport={{once: false, amount: 0}}
      className='md:text-[2.8rem] lg:text-6xl sm:text-4xl font-bold font-Roboto text-orange '>Shah Aamid</motion.h1>

      <motion.p 
      variants={FadeIn('up', 0.6) }
      initial = 'hidden'
      whileInView = 'show'
      viewport={{once: false, amount: 0}}
      
      className='text-lg mt-4 text-white  '>A Passionate Developer Dedicated to <br /> Building Creative  and Functional 
       Web Solutions for   </motion.p>
    </div>
  )
}

export default HeroText