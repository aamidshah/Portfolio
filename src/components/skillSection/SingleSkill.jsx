const SingleSkill = ({imgSvg,text}) => {
  return (
    <div className='hover:-translate-y-10 transition-all duration-500  '>
      <div className='flex flex-col items-center gap-2 relative h-auto '>
        
        <div className='bg-white text-cyan h-[100px]  xl:h-[100px] xl:w-[100px] w-[90px] rounded-full items-center justify-center flex hover:text-[var(--darkGrey)] hover:scale-105 transform transition-all duration-500 text-6xl  border-4 border-orange '>{imgSvg}</div>

          <p className='text-white font-bold'>{text}</p>
        
      </div>
      <div className='w-[90px] xl:w-[100px] h-[200px] bg-orange  absolute top-[50px] -z-10 '>
        
      </div>
    </div>
  )
}

export default SingleSkill  
