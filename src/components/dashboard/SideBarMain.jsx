import React from "react";
import { FaProjectDiagram, FaChartBar, FaCode, FaUserCog } from "react-icons/fa";

const DashboardSidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5 fixed left-0 top-0">
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
    </div>
  );
};

export default DashboardSidebar;
