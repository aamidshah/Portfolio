import React from 'react'
import { HiOutlineMail } from "react-icons/hi";
import { FiPhone } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import SingleInfo from './SingleInfo';

const Info =[
  {
    text: "shahaamid@gmail.com",
    Image: HiOutlineMail
  },
  {
    text: "+916005234689",
    Image: FiPhone
  },
  {
    text: "Jammu&Kashmir, India",
    Image: IoLocationOutline
  }]

const ContactInfo = () => {
  return (

    <div className='flex flex-col gap-4 text-white'>
      {Info.map((Info, index) => (
        <SingleInfo key={index} text={Info.text} Image={Info.Image}/>
      ))}
    </div>
  )
}

export default ContactInfo