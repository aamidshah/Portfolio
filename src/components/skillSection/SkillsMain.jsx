import React from 'react'
import SkillsText from './SkillsText'
import AllSkiills from './AllSkiills'
import AllSkillsSm from './AllSkillsSm'
import SubSkills from './SubSkills'
import { motion } from 'framer-motion';
import { FadeIn } from '../../framerMotion/Variants'

const SkillsMain = () => {
  return (
<div id='skills' className="  scrollbar-hide scrollbar-hidden overflow-hidden">
<div className='max-w-[1040px] mx-auto px-4 min-h-[350px] relative  overflow-hidden scrollbar-hide scrollbar-hidden' >

        <motion.div 
         variants={FadeIn('down', 0.2) }
                     initial = 'hidden'
                     whileInView = 'show'
                     viewport={{once: false, amount: 0.7}}
        >

     <SkillsText />
        </motion.div>
      </div>
      <div className='buttons-[50px] absolute left-[50%]  -translate-x-[50%] lg:block hidden ml-[120px] scrollbar-hide scrollbar-hidden'>
      <AllSkiills />
      </div>
      <div className=' block lg:hidden '>
        <AllSkillsSm />
      </div>
     
    </div>
  )
}

export default SkillsMain


