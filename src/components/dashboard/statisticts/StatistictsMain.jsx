import React from 'react'
import ProjectProgressChart from './ProjectStats'
import BackButton from '../BackButton'
import ProjectComplexityChart from './ProjectComplexity'
import FeaturedProjects from './FeaturedProjects'
import AllProjects from './AllProjects'
import RecentProjects from './RecentProjects'
const StatistictsMain = () => {
  return (
    <div className=' h-full  w-full'> 
      <div className='md:block block mb-5 mt-4 ml-2 lg:hidden'>

      <BackButton />
      </div>
      <div className='!bg-white flex flex-col gap-18  '>
      <ProjectProgressChart />
      <div className='p-0 lg:px-30'>
      <RecentProjects />
      </div>
        
      <ProjectComplexityChart />
      <FeaturedProjects />
      <AllProjects />
      </div>
     
    </div>
  )
}

export default StatistictsMain