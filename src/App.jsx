


import React from "react";
import { useGlobalState } from "./context/GlobalStateContext";
import NavBarMain from "./components/navbar/NavBarMain";
import HeroMain from "./components/heroSection/HeroMain";
import AboutMeMain from "./components/aboutMe/AboutMeMain";
import SkillsMain from "./components/skillSection/SkillsMain";
import ProjectMain from "./components/projects/ProjectMain";
import ContactMain from "./components/contactsSection/ContactMain";
import FooterMain from "./components/footer/FooterMain";
import DashboardSidebar from "./components/dashboard/SideBarMain";
import DashboardProjects from "./components/dashboard/projectsDash/DashboardProjectsMain";
import Contribution from "./components/dashboard/contribution/Contribution";
import ProjectInsights from "./components/dashboard/projectsDash/ProjectInsights";
import SubSkills from './components/skillSection/SubSkills'
import Statistics from './components/dashboard/statisticts/Statisticts'
import AddProjectsForm from "./components/dashboard/projectsDash/AddProjectForm";

// import projects from "./projects.json";







const DashboardContent = () => {
  const { activeComponent } = useGlobalState();
  
  return (
    <div className="lg:ml-[220px] xl:ml-[220px] p-4 lg:p-8">
      {activeComponent === "projects" && <DashboardProjects />}
      {activeComponent === "statistics" && <Statistics />}
      {activeComponent === "contribution" && <Contribution />}
      {activeComponent === "skills" && <SkillsMain />}
      {activeComponent === "insights" && <ProjectInsights />}
      {activeComponent === "addProjectForm" && <AddProjectsForm />}
    </div>
  );
};

const App = () => {
  const { activeComponent } = useGlobalState();

  return (
    <main className="font-sans overflow-hidden">
      <DashboardSidebar />
      <NavBarMain />

      {activeComponent && activeComponent !== "home" ? (
        <DashboardContent />
      ) : (
        <div className="flex-1 lg:ml-[220px] xl:ml-[260px] md:ml-0 min-h-screen">
          <HeroMain />
          <AboutMeMain />
          <SkillsMain />
            <SubSkills/>
          <ProjectMain />
          <ContactMain />
          <FooterMain />
        </div>
      )}
    </main>
  );
};

export default App;

