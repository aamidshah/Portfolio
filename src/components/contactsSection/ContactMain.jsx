import React from 'react'
import ContactMeLeft from './ContactMeLeft'
import ContactMeRight from './ContactMeRight'

const ContactMain = () => {
  return (
    <div id='contact' className='max-w-[1220px] mx-auto justify-center mt-[100px] px-4 '>
<h2 className='text-6xl text-cyan  font-bold text-center mb-10'>Contact Me</h2>
    
    <div className='flex justify-between  md:gap-16 gap-12 lg:gap-0 bg-brown p-8 rounded-xl md:flex-row flex-col '>
      <ContactMeLeft />
      <ContactMeRight />
    </div>
    </div>
  )
}

export default ContactMain