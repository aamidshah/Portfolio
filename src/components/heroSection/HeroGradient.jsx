import React from 'react'

const HeroGradient = () => {
  return (
    <div>
    <div className="absolute top-0 right-[400px] -z-10 animate-pulse shadow-[10px_10px_200px_150px_rgba(94,206,220,0.5)]"></div>
    <div className="absolute top-0 right-0 -z-10 animate-pulse shadow-[10px_10px_200px_150px_rgba(240,169,79,0.5)]"></div>

    <div className="absolute top-[300px] left-0 -z-10 opacity-50 animate-pulse shadow-[10px_10px_200px_150px_rgba(94,206,220,0.5)]"></div>
    <div className="absolute top-[500px] left-0 -z-10 opacity-50 shadow-[10px_10px_200px_150px_rgba(240,169,79,0.5)]"></div>
      </div>
  )
}

export default HeroGradient