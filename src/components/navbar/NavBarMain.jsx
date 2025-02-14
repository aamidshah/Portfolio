import React from 'react'
import NavBarLogo from './NavBarLogo'
import NavBarLinks from './NavBarLinks'
import NavBarBtn from './NavBarBtn'
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from 'react';
// import { useTheme } from '../ThemeProvider';
import { FaMoon, FaSun } from 'react-icons/fa';

const NavBarMain = () => {
  // console.log(useTheme()); // Check if it returns an object

  const [showMenu, setShowMenu] = useState(false);
//   const { theme, toggleTheme } = useTheme();

const toogleMenu = ()=>{
  setShowMenu(!showMenu);

}

  return (
    <nav className='mx-w-[1380px] mx-auto px-4 w-full fixed left-[50%] -translate-x-[50%] z-20 flex gap-4 mt-6  '>

      <div className=' flex justify-between w-full max-w-[1280px] mx-auto bg-black items-center p-[1.1rem] rounded-r-full rounded-l-full border-[0.5px] border-orange '>
     
      <NavBarLogo />
     
      <div className={`lg:flex ${showMenu ? 'block ' : 'hidden'} lg:items-center absolute lg:static top-full left-0 w-full bg-black lg:w-auto lg:bg-transparent z-40  mt-6 lg:mt-0`}>




      <NavBarLinks />
      </div>
      <NavBarBtn />
      </div>
      <div className='flex lg:hidden sm:block p-4 bg-black items-center justify-center rounded-full border-[0.5px] border-orange'>
        <button  className='text-2xl p-3 border-orange border rounded-full text-white' 
        onClick={toogleMenu}>
          <RxHamburgerMenu />
        </button>

      </div>
    </nav>
  )
}

// const NavBarMain = () => {
//   const [showMenu, setShowMenu] = useState(false);

//   const toggleMenu = () => {
//     setShowMenu(!showMenu);
//   };

//   return (
//     <nav className="w-full fixed top-0 left-0 ml-64 z-50 flex gap-4 mt-6 px-4">
//       <div className="flex justify-between w-full max-w-[1280px] mx-auto bg-black items-center p-[1.1rem] rounded-r-full rounded-l-full border-[0.5px] border-orange">
//         <NavBarLogo />
//         <div className={`lg:flex ${showMenu ? 'block' : 'hidden'} lg:items-center absolute lg:static top-full left-0 w-full bg-black lg:w-auto lg:bg-transparent z-40 mt-6 lg:mt-0`}>
//           <NavBarLinks />
//         </div>
//         <NavBarBtn />
//       </div>
//       <div className="flex lg:hidden sm:block p-4 bg-black items-center justify-center rounded-full border-[0.5px] border-orange">
//         <button className="text-2xl p-3 border-orange border rounded-full text-white" onClick={toggleMenu}>
//           <RxHamburgerMenu />
//         </button>
//       </div>
//     </nav>
//   );
// };

export default NavBarMain;

// export default NavBarMain