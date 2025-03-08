import useGlobalStateStore from '../../../store/useProjectStore'
import React from 'react'

const AddSkill = () => {
  const{activeComponent,setActiveComponent} = useGlobalStateStore()
  const handleAddSkill = () => {
    setActiveComponent("skillForm")
    console.log("clicked")
  }
  return (
    <div>
      <button className='pl-8 text-blue-600 font-semibold cursor-pointer text-lg underline hover:text-blue-400 ' onClick={handleAddSkill}>Add New Skill</button>
    </div>
  )
}

export default AddSkill