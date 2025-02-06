import React from 'react'
import SkillsText from './SkillsText'
import AllSkiills from './AllSkiills'
import AllSkillsSm from './AllSkillsSm'
import SubSkills from './SubSkills'
import { motion } from 'framer-motion';
import { FadeIn } from '../../framerMotion/Variants'

const SkillsMain = () => {
  return (
    <div id='skills'>
      <div className='max-w-[1240px] mx-auto px-4 min-h-[350px] relative overflow-hidden ' >

        <motion.div 
         variants={FadeIn('down', 0.2) }
                     initial = 'hidden'
                     whileInView = 'show'
                     viewport={{once: false, amount: 0.7}}
        >

     <SkillsText />
        </motion.div>
      </div>
      <div className='buttons-[50px] absolute left-[50%] -translate-x-[50%] lg:block hidden  '>
      <AllSkiills />
      </div>
      <div className=' block lg:hidden '>
        <AllSkillsSm />
      </div>
      {/* <div className="relative mt-12 lg:mt-[250px] hidden lg:block ">
        <SubSkills />
      </div> */}
    </div>
  )
}

export default SkillsMain
