import React from 'react'
import ContactForm from './ContactForm'

const ContactMeLeft = () => {
  return (
    <div>
      <div className=' flex flex-col gap-2 w-full '>
        <h2 className='text-orange text-3xl '>Get In Touch</h2>
        <p className='text-white'>Feel free to reach out if you have any questions <br />
        or just want to say hi!</p>
      </div>
      <ContactForm />
    </div>
  )
}

export default ContactMeLeft