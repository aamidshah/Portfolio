


import React, { useState } from "react";
import { useGlobalState } from "../../context/GlobalStateContext"; 
import NavBarLogo from "./NavBarLogo";
import NavBarLinks from "./NavBarLinks";
import NavBarBtn from "./NavBarBtn";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import useGlobalStateStore from "../../store/useProjectStore";
const NavBarMain = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { activeComponent } = useGlobalStateStore(); // Get active state

  // If any sidebar link is active, hide navbar
  if (activeComponent) return null;

  return (
    <nav className="fixed flex flex-row top-4 left-0 lg:left-[220px] xl:left-[260px] w-full lg:w-[calc(100%-220px)] xl:w-[calc(100%-260px)] z-30 px-4">
      <div className="flex justify-between w-full max-w-[1280px] mx-auto bg-black items-center p-[1.1rem] rounded-r-full rounded-l-full border-[0.5px] border-orange">
        <NavBarLogo />
        <div className={`lg:flex ${showMenu ? "block" : "hidden"} lg:items-center absolute lg:static top-full left-0 w-full bg-black lg:w-auto lg:bg-transparent z-40 mt-6 lg:mt-0`}>
          <NavBarLinks />
        </div>
        <NavBarBtn />
      </div>
      <div className="flex lg:hidden sm:block p-4 bg-black items-center justify-center rounded-full border-[0.5px] border-orange">
        <button className="text-2xl p-3 border-orange border rounded-full text-white" onClick={() => setShowMenu(!showMenu)}>
          {showMenu ? <IoClose /> : <RxHamburgerMenu />}
        </button>
      </div>
    </nav>
  );
};

export default NavBarMain;
