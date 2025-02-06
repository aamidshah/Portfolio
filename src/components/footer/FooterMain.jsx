import React from 'react'
import { Link } from 'react-scroll'
const links= [
 
  {
    link: 'About Me',
    section: 'about'
  },
  {
    link: 'Skills',
    section: 'skills'
  },
  {
    link: 'Experience',
    section: 'experience'
  },
  {
    link: 'Projects',
    section: 'projects'
  },
  {
    link: 'Contact',
    section: 'contact'
  }
 
]

const FooterMain = () => {
  return (
    <div className='px-4 '>
      <div className
      ='h-[2px] w-full bg-lightGrey mt-18'></div>
      <div className='md:flex hidden justify-between mt-6 max-w-[1220px mx-auto'>
      <p className=' text-3xl text-lightGrey '>Shah Aamid</p>
      <ul className=' flex gap-4 text-lightGrey text-xl '>
        {
          links.map((item, index)=>{
            return <li key={index}>
              <Link to={item.section} 
               smooth={true}
               spy={true}
               duration={500}
               offset={-130}
              className='hover:text-white transition-all duration-300 cursor-pointer'>{item.link}</Link>
            </li>

          })
        }
      </ul>

        </div>
      <p className='text-lightBrown max-w-[1900px] text-center md:text-right mt-2 mb-12 text-sm '>2025 Shah Aamid | All Rights Reserved</p>
    </div>
  )
}

export default FooterMain