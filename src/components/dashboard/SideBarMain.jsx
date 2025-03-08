


import React, { useEffect, useState } from "react";
import { FaProjectDiagram, FaChartBar, FaCode, FaUserCog } from "react-icons/fa";
import { IoClose,IoArrowBack } from "react-icons/io5";
import LoginMain from "../login/LoginMain";
import ProjectInsights from "./projectsDash/ProjectInsights";
import DashboardProjectsMain from "./projectsDash/DashboardProjectsMain";
import StatistictsMain from "./statisticts/StatistictsMain";
import SkillsMain from "./skills/SkillsMainDash";
import ContributionMain from "./contribution/ContributionMain";
import { useGlobalState } from "../../context/GlobalStateContext";
import useGlobalStateStore from "../../store/useProjectStore";
const DashboardSidebar = () => {
 

const { setActiveComponent, activeComponent, showSidebar,setShowSidebar } = useGlobalStateStore();

  const handleBackToHome = () => {
    setActiveComponent(null); // Set home as active
    setShowSidebar(false);
    
  };


  return (
    <>
      {/* Sidebar for large screens */}
      <aside className="lg:flex flex-col hidden fixed left-0 top-0 h-screen w-[220px] xl:w-[240px] bg-[var(--darkGrey)] text-white p-6 z-50 shadow-lg">
    

      
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <ul className="space-y-4">
          <li onClick={() =>{setShowSidebar(false); setActiveComponent("projects")}}  className={`flex items-center gap-2 cursor-pointer hover:text-[var(--orange)] ${
      activeComponent === "projects" ? "text-[var(--orange)]" : ""
    }`}>
            <FaProjectDiagram /> Projects
          </li>
          <li onClick={() => {setShowSidebar(false); setActiveComponent("statistics")}} 
    className={`flex items-center gap-2 cursor-pointer hover:text-[var(--orange)] ${
      activeComponent === "statistics" ? "text-[var(--orange)]" : ""
    }`}>
            <FaChartBar /> Statistics
          </li>



          <li onClick={() => {setShowSidebar(false); setActiveComponent("contributions")
              // console.log("Contributions Clicked! Active Component:", activeComponent);

          }}  className={`flex items-center gap-2 cursor-pointer hover:text-[var(--orange)] ${
      activeComponent === "contributions" ? "text-[var(--orange)]" : ""
    }`}>
            <FaCode /> Contributions
          </li>


          <li onClick={() => {setShowSidebar(false); setActiveComponent("Skills")}} className={`flex items-center gap-2 cursor-pointer hover:text-[var(--orange)] ${
      activeComponent === "Skills" ? "text-[var(--orange)]" : ""
    }`}>
            <FaUserCog /> Skills
          </li>

          <button 
          onClick={handleBackToHome} 
          className=" flex items-center gap-1 text-white hover:!text-[var(--orange)] cursor-pointer"
        >
          <IoArrowBack /> Back to Home
        </button>
         
        </ul>
        
        <LoginMain />
      </aside>



      {/* Sidebar for smaller screens */}
      <aside className={`fixed top-0 left-0 h-screen bg-[var(--darkGrey)] text-white p-6 transition-transform duration-300 ease-in-out ${showSidebar ? "translate-x-0" : "-translate-x-full"} lg:hidden w-[220px] z-50 shadow-lg`}>
       
        <button className="absolute top-6 right-4 text-3xl" onClick={() => {setShowSidebar(false)}}>
          <IoClose />
        </button>
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <ul className="space-y-4">
          <li onClick={() =>{
{            setShowSidebar(false);
            setActiveComponent("projects")}}}
            className={`flex items-center  gap-2 cursor-pointer hover:text-[var(--orange)] ${
              activeComponent === "projects" ? "text-[var(--orange)]" : ""
            }`}>
            <FaProjectDiagram /> Projects
          </li>


          <li onClick={() => { 
            setShowSidebar(false);
            setActiveComponent("statistics")}} className={`flex items-center gap-2 cursor-pointer hover:text-[var(--orange)] ${
      activeComponent === "statistics" ? "text-[var(--orange)]" : ""
    }`}>
            <FaChartBar /> Statistics
          </li>


          <li onClick={() => {
            setShowSidebar(false);
            setActiveComponent("contributions")}} className={`flex items-center gap-2 cursor-pointer hover:text-[var(--orange)] ${
      activeComponent === "contributions" ? "text-[var(--orange)]" : ""
    }`}>
            <FaCode /> Contributions
          </li>


          <li onClick={() => {
            setShowSidebar(false);
            setActiveComponent("Skills")}} className={`flex items-center gap-2 cursor-pointer hover:text-[var(--orange)] ${
      activeComponent === "Skills" ? "text-[var(--orange)]" : ""
    }`}>
            <FaUserCog /> Skills
          </li>
          <button 
          onClick={handleBackToHome} 
          className=" flex items-center gap-1 text-white hover:!text-[var(--orange)] cursor-pointer"
        >
          <IoArrowBack /> Back to Home
        </button>
         
        </ul>
        
        <LoginMain />
      </aside>

    
    </>
  );
};

export default DashboardSidebar;

