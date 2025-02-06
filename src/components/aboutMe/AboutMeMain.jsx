import React from 'react'
import AboutMeImage from './AboutMeImage'
import AboutMeText from './AboutMeText'
import { motion } from 'framer-motion';
import { FadeIn } from '../../framerMotion/Variants'



const AboutMeMain = () => {
  return (
    <div  id='about' className='flex md:flex-row flex-col gap-12 px-4 max-w[1200px] mx-auto mt-[100px] justify-between items-center '>
      <motion.div
      
       variants={FadeIn('right', 0.2) }
             initial = 'hidden'
             whileInView = 'show'
             viewport={{once: false, amount: 0.7}}
      
      >

      <AboutMeText />
      </motion.div>
<motion.div 
   variants={FadeIn('left', 0.2) }
   initial = 'hidden'
   whileInView = 'show'
   viewport={{once: false, amount: 0.7}}
>
      <AboutMeImage />

</motion.div>
    </div>
  )
}

export default AboutMeMain