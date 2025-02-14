import React from "react";
import { FaProjectDiagram, FaChartBar, FaCode, FaUserCog } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import LoginMain from "../login/LoginMain";

const DashboardSidebar = ({ isOpen, setIsOpen }) => {
  return (
    <>
      {/* Sidebar for large screens (always fixed on the left) */}
      <aside className="lg:flex flex-col hidden fixed left-0 top-0 h-screen w-[220px] xl:w-[260px] bg-gray-900 text-white p-6 z-50 shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <ul className="space-y-4">
          <li className="flex items-center gap-2 cursor-pointer hover:text-blue-400">
            <FaProjectDiagram /> Projects
          </li>
          <li className="flex items-center gap-2 cursor-pointer hover:text-blue-400">
            <FaChartBar /> Statistics
          </li>
          <li className="flex items-center gap-2 cursor-pointer hover:text-blue-400">
            <FaCode /> Contributions
          </li>
          <li className="flex items-center gap-2 cursor-pointer hover:text-blue-400">
            <FaUserCog /> Skills
          </li>
        </ul>
        <LoginMain />
      </aside>

      {/* Sidebar for md and below (slide-in effect) */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-gray-900 text-white p-6 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden w-[220px] z-50 shadow-lg`}
      >
        <button className="absolute top-6 right-4 text-3xl" onClick={() => setIsOpen(false)}>
          <IoClose />
        </button>
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <ul className="space-y-4">
          <li className="flex items-center gap-2 cursor-pointer hover:text-blue-400">
            <FaProjectDiagram /> Projects
          </li>
          <li className="flex items-center gap-2 cursor-pointer hover:text-blue-400">
            <FaChartBar /> Statistics
          </li>
          <li className="flex items-center gap-2 cursor-pointer hover:text-blue-400">
            <FaCode /> Contributions
          </li>
          <li className="flex items-center gap-2 cursor-pointer hover:text-blue-400">
            <FaUserCog /> Skills
          </li>

        </ul>
        <LoginMain />

      </aside>
    </>
  );
};

export default DashboardSidebar;



// import React, { useState } from "react";
// import { FaProjectDiagram, FaChartBar, FaCode, FaUserCog, FaBars } from "react-icons/fa";
// import { IoClose } from "react-icons/io5";

// const DashboardSidebar = () => {
//   const [isOpen, setIsOpen] = useState(false); // State for sidebar toggle

//   return (
//     <>
      

//       {/* Sidebar for large screens */}
//       <aside className="lg:flex hidden w-[200px] bg-gray-900 text-white h-screen p-4 fixed">
//         <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
//         <ul className="space-y-4">
//           <li className="flex items-center gap-2 cursor-pointer hover:text-blue-400">
//             <FaProjectDiagram /> Projects
//           </li>
//           <li className="flex items-center gap-2 cursor-pointer hover:text-blue-400">
//             <FaChartBar /> Statistics
//           </li>
//           <li className="flex items-center gap-2 cursor-pointer hover:text-blue-400">
//             <FaCode /> Contributions
//           </li>
//           <li className="flex items-center gap-2 cursor-pointer hover:text-blue-400">
//             <FaUserCog /> Skills
//           </li>
//         </ul>
//       </aside>

//       {/* Sidebar for md and sm screens - Toggle with state */}
//       <aside
//         className={`fixed top-0 left-0 h-screen bg-gray-900 text-white p-4 transition-transform ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         } lg:hidden w-[200px]`}
//       >
//         <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
//         <ul className="space-y-4">
//           <li className="flex items-center gap-2 cursor-pointer hover:text-blue-400">
//             <FaProjectDiagram /> Projects
//           </li>
//           <li className="flex items-center gap-2 cursor-pointer hover:text-blue-400">
//             <FaChartBar /> Statistics
//           </li>
//           <li className="flex items-center gap-2 cursor-pointer hover:text-blue-400">
//             <FaCode /> Contributions
//           </li>
//           <li className="flex items-center gap-2 cursor-pointer hover:text-blue-400">
//             <FaUserCog /> Skills
//           </li>
//         </ul>
//       </aside>
//     </>
//   );
// };

// export default DashboardSidebar;
