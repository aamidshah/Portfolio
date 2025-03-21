import React from 'react'
import HeroText from './HeroText'
import HeroPic from './HeroPic'
import HeroGradient from './HeroGradient'

const HeroMain = () => {
  return (
    <div id='home' className='pt-40 pb-16 md:pr-12 scrollbar-hide scrollbar-hidden'>

      
      <div className="flex md:flex-row flex-col mx-auto justify-between items-center relative px-4 max-w-7xl ">

      <HeroText />
      <HeroPic />
      <HeroGradient />
      </div>
     
    </div>
  )
}

export default HeroMain