import React from 'react'
import ContributorOverview from './ContributorOverview'
import BackButton from '../BackButton'
import ProjectContributors from './ProjectContributors'
import ContributionTrend from './ContributionTrend'
import ContributorBadges from './Badges'

const ContributionMain = () => {
  return (
    <div className='' >
        <div className='md:block block mb-5 mt-4 ml-2 lg:hidden'>

<BackButton />
</div>
<div className= '!bg-white pt-8 '> 
  
      {/* <h1 className='text-white text-2xl'>contributors</h1> */}
      <ContributorOverview />
      <ProjectContributors />
      <ContributionTrend />
      <ContributorBadges />
      </div>
    </div>
  )
}

export default ContributionMain