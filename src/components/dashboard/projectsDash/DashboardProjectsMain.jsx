import React from 'react'
import ProjectInsights from './ProjectInsights'
import ProjectList from './ProjectList'
import { useGlobalState } from '../../../context/GlobalStateContext';
import BackButton from '../BackButton';
import useGlobalStateStore from '../../../store/useProjectStore';

const DashboardProjects = () => {
  // const {setShowSidebar,showSidebar} = useGlobalState()
  const { setShowSidebar,showSidebar } = useGlobalStateStore();

  
  return (
<div className={`w-full   transition-all duration-300  `}>
{/* Back Arrow */}
<div className='md:block lg:hidden'>
    <div
      onClick={() =>{  setShowSidebar(true)}}
      className="flex items-center gap-1 text-white cursor-pointer hover:!text-[var(--orange)] ml-2 mt-2 mb-4"
    >
<BackButton />    </div>
    </div>
    
    <div className='flex !bg-[#e9ecf2] flex-col  gap-4'>
    {/* <h2 className="text-2xl text-black font-bold mt-4 lg:mt-10   ml-4">Projects Overview</h2> */}
    <ProjectInsights />
    <ProjectList />
    </div>
  </div>
  )
}

export default DashboardProjects