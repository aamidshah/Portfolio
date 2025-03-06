



import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

import useGlobalStateStore from "./store/useProjectStore";
import NavBarMain from "./components/navbar/NavBarMain";
import HeroMain from "./components/heroSection/HeroMain";
import AboutMeMain from "./components/aboutMe/AboutMeMain";
import SkillsMain from "./components/skillSection/SkillsMain";
import ProjectMain from "./components/projects/ProjectMain";
import ContactMain from "./components/contactsSection/ContactMain";
import FooterMain from "./components/footer/FooterMain";
import DashboardSidebar from "./components/dashboard/SideBarMain";
import DashboardProjects from "./components/dashboard/projectsDash/DashboardProjectsMain";
import ContributionMain from "./components/dashboard/contribution/ContributionMain";
import ProjectInsights from "./components/dashboard/projectsDash/ProjectInsights";
import SubSkills from "./components/skillSection/SubSkills";
import StatistictsMain from "./components/dashboard/statisticts/StatistictsMain";
import AddProjectsForm from "./components/dashboard/projectsDash/AddProjectForm";
import AuthForm from "./components/login/AuthForm";
import FullProjectInfo from "./components/projects/FullProjectInfo";
const DashboardContent = () => {
  const { activeComponent } = useGlobalStateStore(); // Using Zustand store

  return (
    <div className="lg:ml-[220px] xl:ml-[240px]  ">
    {/* // <div className="lg:ml-[230px] xl:ml-[10px] w-full min-h-screen flex flex-col"> */}

      {activeComponent === "projects" && <DashboardProjects />}
      {activeComponent === "statistics" && <StatistictsMain />}
      {activeComponent === "fullInfo" && <FullProjectInfo />}

      {activeComponent === "contributions" && <ContributionMain />}
      {activeComponent === "skills" && <SkillsMain />}
      {activeComponent === "insights" && <ProjectInsights />}
      {activeComponent === "addProjectForm" && <AddProjectsForm />}
      {activeComponent === "authScreen" && <AuthForm />}
    </div>
  );
};

const App = () => {
  const { activeComponent } = useGlobalStateStore(); // Use Zustand store

  return (
<main className="font-sans overflow-x-hidden w-full h-screen flex flex-col">
<ToastContainer autoClose={3000} />
      <DashboardSidebar />
      <NavBarMain />

      {activeComponent && activeComponent !== "home" ? (
        <DashboardContent />
      ) : (
        <div className="flex-1 lg:ml-[220px] xl:ml-[260px] md:ml-0 min-h-screen scrollbar-hide scrollbar-hidden">
          <HeroMain />
          <AboutMeMain />
          <SkillsMain />
          <SubSkills />
          <ProjectMain />
          <ContactMain />
          <FooterMain />
        </div>
      )}
    </main>
  );
};

export default App;
