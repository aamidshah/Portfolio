import React from 'react'
import { motion } from 'framer-motion';
import { FadeIn } from '../../framerMotion/Variants'

const AboutMeImage = () => {
  return (
    <div 
    
    
    className='h-[450px] w-[280px] relative'>
      <div className='h-[450px] w-[280px] rounded-[100px] absolute overflow-hidden '>
        <img src="../../public/images/about-me.jpg" alt="about me" className='h-full w-auto object-cover ' />
      </div>
      <div className='h-[450px] w-[200px] bg-orange absolute bottom-[-30px] left-[-20px] rounded-bl-[120px]  rounded-tr-[150px] rounded-br-[20px] rounded-tl-[20px] -z-10 '>

      </div>
    </div>
  )
}

export default AboutMeImage