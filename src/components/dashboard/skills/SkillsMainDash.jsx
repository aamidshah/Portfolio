import React from 'react'
import ProjectSkillUsageGraph from './SkillUsage'
import SkillsDashboard from "./SkillDashboard"
import BackButton from '../BackButton'
import AddSkill from './AddSkill'
import useAuthStore from '../../..//store/authStore'

const SkillsMain = () => {
  const {isAuthenticated} = useAuthStore()
  return (
    <>
       <div className='md:block block mb-5 mt-4 ml-2 lg:hidden'>

<BackButton />
</div>
    
    <div className=' !bg-white items-center justify-center'>
  
      <SkillsDashboard />
      
      <ProjectSkillUsageGraph />
    </div>
    </>
  )
}

export default SkillsMain