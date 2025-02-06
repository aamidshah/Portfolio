import React from 'react'
import ProjectsText from './ProjectsText'
import SingleProject from './SingleProject'
import { motion } from 'framer-motion';
import { FadeIn } from '../../framerMotion/Variants'


const projects = [
  {
    name:"Advance Filtering",
    year:2024,
    align:'right',
    image:'/images/website-img-1.jpg',
    link:"https://github.com/aamidshah/Advance-Filtering"

  },

  {
    name:"NetFlix-Clone",
    year:'october-2024',
    align:'left',
    image:'/images/website-img-1.jpg',
    link:"https://mern-netflix-clone-lp9d.onrender.com/"

  },

  {
    name:"Event-Handler",
    year:"june-2023",
    align:'right',
    image:'/images/website-img-3.jpg',
    link:"https://github.com/aamidshah/MERN_STACK_EVENT_HANDLER"

  },
  
  {
    name:" Studdy-Buddy Web-App ",
    year:'september-2024',
    align:'left',
    image:'/images/website-img-4.jpg',
    link:"http://localhost:5173/"
  }
  

]
const ProjectMain = () => {
  return ( 
    <div id='projects' className='max-w[1200px] mx-auto px-4 '>
     <motion.div
       variants={FadeIn('up', 0.2) }
                        initial = 'hidden'
                        whileInView = 'show'
                        viewport={{once: false, amount: 0.7}}
     >

      <ProjectsText />
     </motion.div>

      <div className='flex flex-col gap-20  m-w-[900px] mx-auto mt-12 lg:items-center '>
      {
        projects.map((item,index)=>{
          return <SingleProject key={index} name={item.name} year={item.year} align={item.align} image={item.image} link={item.link} />
        })
      }

      </div>
    </div>
  )
}

export default ProjectMain