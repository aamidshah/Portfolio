import React from 'react'
import { PiHexagonThin } from "react-icons/pi";
import { motion } from 'framer-motion';
import { FadeIn } from '../../framerMotion/Variants'



const HeroPic = () => {
  return (
    <motion.div
    variants={FadeIn('left', 0.4) }
          initial = 'hidden'
          whileInView = 'show'
          viewport={{once: false, amount: 0}}
    
    className='h-full flex justify-center items-center mt-16  md:ml-auto md:mr-16'>
      <img src="../../public/images/MyHexaPic.png" alt="Shah Aamid" className='md:max-h-[450px] max-h-[300px] w-auto '  />
      <div className='absolute -z-10 flex justify-center items-center animate-pulse  '>
      <PiHexagonThin className='md:h-[80%] sm:h-[90%] md:min-h-[530px] min-h-[430px] w-auto text-cyan blur-md animate-[spin_20s_linear_infinite]' />

      </div>
    </motion.div>
  )
}

export default HeroPic