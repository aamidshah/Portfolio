import React from 'react'
import ExperienceInfo from './ExperienceInfo'

const ExperienceTopLeft = () => {
  return (
    <div className=' flex flex-col gap-6 w-[300px] '>
      <p className='text-orange font-bold uppercase text-3xl font-special text-center'>since 2022</p>
      <div className=' justify-center  flex  items-center gap-4 '>
        <ExperienceInfo number='2' text='years' />
        <p className='font-bold text-6xl text-lightBrown'>-</p>
        <ExperienceInfo number='5' text='Websites' />
      </div>
      <p className='text-center text-white '>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero molestiae recusandae dolorem.</p>
      <ExperienceInfo number='500k' text='Budget' />

    </div>

  )
}

export default ExperienceTopLeft