import React from 'react';
import { LuArrowDownRight } from "react-icons/lu";

const NavBarBtn = () => {
  return (
    <button className='px-4 py-2 rounded-full text-xl font-bold text-white border-cyan border flex items-center gap-1 bg-gradient-custom  hover:border-orange hover:scale-110 transition-all duration-300 hover:shadow-[0px_0px_20px_0px_rgba(94,206,220,0.5)]'>
      Hire Me
      <div className='hidden md:block '>
      <LuArrowDownRight />


      </div>
    </button>
  )
}

export default NavBarBtn