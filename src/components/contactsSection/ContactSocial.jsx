import React from 'react'
import SingleContactSocial from './SingleContactSocial'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";

const socialLinks= [
  {
    id: 1,
    link: "https://github.com/aamidshah",
    Icon: FaGithub,
  },
  {
    id: 2,
    link: "https://linkedin.com/in/aamid-shah-a456b6270",
    Icon: FaLinkedin,
  },
  {
    id: 3,
    link: "https://instagram.com",
    Icon: IoLogoInstagram,
  }
]

const ContactSocial = () => {
  return (
    <div className='text-3xl  gap-4 flex  '>
{
  socialLinks.map((socialLink,index)=>{
    return <SingleContactSocial key={index} link={socialLink.link} id={socialLink.id} Icon={socialLink.Icon} />
  })
}

    </div>
  )
}

export default ContactSocial