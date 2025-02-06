import React from 'react'
import NavBarMain from './components/navbar/NavBarMain'
import HeroMain from './components/heroSection/HeroMain'
import SubHeroSection from './components/SubHeroSection'
import AboutMeMain from './components/aboutMe/AboutMeMain'
import HelperSection from './components/HelperSection'
import SkillsMain from './components/skillSection/SkillsMain'
import SubSkills from './components/skillSection/SubSkills'
import ExperienceMain from './components/experienceSection/ExperienceMain'
import ProjectMain from './components/projects/ProjectMain'
import ContactMain from './components/contactsSection/ContactMain'
import FooterMain from './components/footer/FooterMain'

const hello  = () => {
  return (
    <main className='font-sans'>
      <NavBarMain />
      <HeroMain />  
      <SubHeroSection />
      <AboutMeMain />
      <SkillsMain />
      <SubSkills/>
      <ExperienceMain />
      <ProjectMain />
      <ContactMain />
      <FooterMain />
      {/* <HelperSection /> */}
    </main>
  )
}

export default hello 