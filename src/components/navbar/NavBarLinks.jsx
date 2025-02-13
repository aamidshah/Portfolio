import React from "react";
import{Link} from "react-scroll"
import { motion } from 'framer-motion';
import { FadeIn } from '../../framerMotion/Variants'

const links = [
  {
    link: "About Me",
    section: "about",
  },
  {
    link: "Skills",
    section: "skills",
  },
  // {
  //   link: "Experience",
  //   section: "experience",
  // },
  {
    link: "Projects",
    section: "projects",
  },
  {
    link: "Contact",
    section: "contact",
  },
];
const NavBarLinks = () => {
  return (
 
<ul className="flex flex-col lg:flex-row gap-6 lg:text-md sm:text-xl text-white font-bold text-center py-4 w-full bg-[var(--cyan)]/30 lg:bg-transparent backdrop-blur-lg sm:w-full rounded ">

    {
      links.map((link,index)=>{
        return(
        <motion.div key={index}
        variants={FadeIn('down',0.1,index)}
        initial="hidden"
        viewport={{ once: false, amount: 0.7}}
        whileInView="show"
        className="group"

        >
        <li key={index} className="group">
          <Link to={link.section} 
           smooth={true}
           spy={true}
           duration={500}
           offset={-130}
           className="cursor-pointer hover:text-[var(--cyan)] transition-all duration-500">{link.link}</Link>
          <div className="mx-auto bg-cyan w-0 group-hover:w-full h-[1px] transition-all duration-500 "></div>
        </li>
        </motion.div>)
      })
    }
  </ul>
  )
};

export default NavBarLinks;
