import React from 'react'
import { motion } from 'framer-motion';
import { FadeIn } from '../../framerMotion/Variants'
import { Link } from 'react-scroll';

const AboutMeText = ({}) => {
  return (
    <div className=' flex flex-col md:items-start items-center md:text-left text-center'>
      <h2
      

      className=' text-4xl text-cyan mb-10 '>About Me</h2>
      <p 
      

      className=' text-white max-w-[1200px]'>The sun dipped below the horizon, casting a warm glow over the quiet town. Birds chirped in the distance as the evening breeze rustled the leaves of nearby trees. People slowly returned to their homes, the streets becoming less crowded with each passing moment. The sky transitioned from shades of pink and orange to deep blues and purples, creating a breathtaking display of nature’s beauty. In the calm of the night, the world seemed to pause, allowing for reflection and tranquility. It was one of those rare moments where everything felt perfectly aligned, as if time itself had slowed down.</p>
   
   <div className='flex flex-row gap-4'>
   <Link to='projects'
    
    smooth={true} 
    duration={800} 
    offset={-80} // Adjust if needed to prevent cutting off
  > 
  
  
   <button 
    className='border border-orange rounded-full py-2 px-4 text-lg flex items-center mt-10 hover:bg-[var(--orange)] transition-all duration-500 cursor-pointer md:self-start self-center text-white hover:text-[var(--cyan)] '>My Projects</button>
    </Link>

    <a href="https://drive.google.com/uc?export=download&id=1qAjEsR8P55yfMb9A-635DiYUSwTph1Ng" 
download="Shah_Aamid_Resume.pdf"  
    smooth={true} 
    duration={800} 
    offset={-80} // Adjust if needed to prevent cutting off
  > 
  
  
   <button 
    className='border border-orange rounded-full py-2 px-4 text-lg flex items-center mt-10 hover:bg-[var(--orange)] transition-all duration-500 cursor-pointer md:self-start self-center text-white hover:text-[var(--cyan)] '>Download CV</button>
    </a>

   </div>
  
    </div>
  )
}

export default AboutMeText