
import React from "react";
import { Link } from "react-scroll";
import { motion } from 'framer-motion';
import { FadeIn } from '../../framerMotion/Variants';
import { links } from '../linksData'
import { useGlobalState } from "../../context/GlobalStateContext";

const NavBarLinks = () => {
  const { setShowSidebar } = useGlobalState();

  return (
    <ul className="flex flex-col lg:flex-row gap-6 lg:text-md sm:text-xl text-white font-bold text-center py-4 w-full bg-[var(--cyan)]/30 lg:bg-transparent backdrop-blur-lg sm:w-full rounded">
      {/* Dashboard link (only visible on md and below) */}
      <motion.div
        variants={FadeIn('down', 0.1, 0)}
        initial="hidden"
        viewport={{ once: false, amount: 0.7 }}
        whileInView="show"
        className="group block lg:hidden"
      >
        <li className="group">
          <button
            onClick={() => setShowSidebar(true)}
            className="cursor-pointer hover:text-[var(--cyan)] transition-all duration-500"
          >
            Dashboard
          </button>
          <div className="mx-auto bg-cyan w-0 group-hover:w-full h-[1px] transition-all duration-500"></div>
        </li>
      </motion.div>

      {/* Other navigation links */}
      {links.map((link, index) => (
        <motion.div
          key={index}
          variants={FadeIn('down', 0.1, index + 1)}
          initial="hidden"
          viewport={{ once: false, amount: 0.7 }}
          whileInView="show"
          className="group"
        >
          <li className="group">
            <Link
              to={link.section}
              smooth={true}
              spy={true}
              duration={500}
              offset={-130}
              className="cursor-pointer hover:text-[var(--cyan)] transition-all duration-500"
            >
              {link.link}
            </Link>
            <div className="mx-auto bg-cyan w-0 group-hover:w-full h-[1px] transition-all duration-500"></div>
          </li>
        </motion.div>
      ))}
    </ul>
  );
};

// export default NavBarLinks;

export default NavBarLinks;
