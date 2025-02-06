import React from 'react'
import ExperienceSingle from './ExperienceSingle'
import { FaArrowRight } from "react-icons/fa";
import { motion } from 'framer-motion';
import { FadeIn } from '../../framerMotion/Variants'



const experiences =[
  {
    job: 'Front End Developer',
    company: 'Tech Solutions',
    date: '2020 - Present',
    responsibilities: [
      'Worked on various web applications using React, JavaScript, and CSS.',
      'Designed and implemented new features for existing applications.',
      'Participated in code reviews and bug fixes.',
    ]
  },

  {
    
    job: 'Software Engineer',
    company: 'Tech Solutions',
    date: '2018 - 2020',
    responsibilities: [
      'Built and maintained a suite of software applications for a multinational company.',
      'Worked on various projects, including data analysis, user interface design, and back-end development.',
    ]
  },
  {
    job: 'Web Developer',
    company: 'Tech Solutions',
    date: '2017 - 2018',
    responsibilities: [
      'Worked on various web applications using PHP, JavaScript, and CSS.',
      'Designed and implemented new features for existing applications.',
      'Collaborated with other developers to ensure '  ]
  },
  {
    job: 'Intern',
    company: 'Tech Solutions',
    date: '2016 - 2017',
    responsibilities: [
      'Assisted in the development of software applications.',  
      'Worked on various projects, including data analysis, user interface design, and back-end development.',
      'Participated in code reviews and bug fixes.',
    ]
  }
]

const AllExperience = () => {
  return (
    // <div className='flex md:flex-row flex-col items-center justify-between lg:justify-center  lg:gap-14 '>
    <div className='flex flex-wrap items-center justify-center gap-8 mt-8 '>
  

      {
        experiences.map((experience, index) =>{
          const isLastInRow = (index + 1) % 4 === 0;
          return(          <>
            <ExperienceSingle key={index} experience={experience} className='mb-8' />
            {
              !isLastInRow ? 
              <motion.div
              variants={FadeIn('right', 0.2) }
                                 initial = 'hidden'
                                 whileInView = 'show'
                                 viewport={{once: false, amount: 0.7}}
              
              >
              <FaArrowRight className=' text-5xl text-orange lg:block hidden ' /> </motion.div> : ""
              
            }

           </>)
        })
      }
    </div>
  )
}

export default AllExperience