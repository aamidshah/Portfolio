import React from 'react'
import AddProjects from './AddProjects'
import ProjectInsights from './ProjectInsights'
import ProjectList from './ProjectList'
import { IoArrowBack } from "react-icons/io5";
import { useGlobalState } from '../../../context/GlobalStateContext';
import BackButton from '../BackButton';
const DashboardProjects = () => {
  const {setShowSidebar,showSidebar} = useGlobalState()

  
  return (
<div className={`w-full lg:m-6 md:m-4 transition-all duration-300  `}>
{/* Back Arrow */}
<div className='md:block lg:hidden'>
    <div
      onClick={() =>{  setShowSidebar(true)}}
      className="flex items-center gap-1 text-white cursor-pointer hover:!text-[var(--orange)] mt-4"
    >
<BackButton />    </div>
    </div>
    <h2 className="text-2xl text-white font-bold mt-8">Projects Overview</h2>
    <div className='flex flex-col gap-12'>
    <ProjectInsights />
    <ProjectList />
    <AddProjects />
    </div>
  </div>
  )
}

export default DashboardProjects