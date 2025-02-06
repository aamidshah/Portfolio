import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';


const ContactForm = () => {
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [message, setMessage] = useState('');
const [success, setSuccess] = useState(false);
const [successVisible, setSuccessVisible] = useState(false); // Controls fade-out animation

const HAndleName =(e)=>{
setName(e.target.value)
}
const HAndleEmail =(e)=>{
  setEmail(e.target.value)
}
const HandleMessage =(e)=>{
  setMessage(e.target.value)
}

const form = useRef();
const sendEmail = (e) => {
  e.preventDefault();

  emailjs
    .sendForm('service_9dfkikh', 'template_vh54s5z', form.current, {
      publicKey: '7e8PCVdrSTX9eFEoA',
    })
    .then(
      () => {
setName('');
setEmail('');
setMessage('');
setSuccess("Message sent successfully!!!");
setSuccessVisible(true); // Show message

        setTimeout(() => {
          setSuccessVisible(false);
        },3000)
      },
      (error) => {
        console.log('FAILED...', error.text);
      },
    );
};



  return (
    <div className=" flex flex-col gap-4 pt-6">
    <p className={`text-cyan text-lg font-bold transition-opacity duration-1000 ${successVisible ? 'opacity-100' : 'opacity-0'}`}>
      {success}
    </p>

      {/* <p className='text-cyan'>{success}</p> */}
      <form ref={form}  onSubmit={sendEmail} className=" flex text-white flex-col gap-4">
        <input
        name='from_name'
          type="text"
          value={name}
          onChange={HAndleName}
          required={true}
          placeholder="Your Name"
          className="h-12 rounded-lg bg-lightBrown px-2"
        />
        <input
        name='from_email'
        value={email}
        onChange={HAndleEmail}
          type="email"
          placeholder="Your Email"
          required={true}
          className="h-12 rounded-lg bg-lightBrown  px-2"
        />
        <textarea
        name='message'
          type="text"
          placeholder="Your Message"
          value={message}
          onChange={HandleMessage}
          rows="9"
          cols="50"
          required={true}
          className=" rounded-lg bg-lightBrown p-2"
        ></textarea>

        <button
          type="submit"
          className="w-full rounded-lg border border-cyan  text-black h-12 font-bold  text-xl bg-orange mt-4 hover:!bg-[var(--darkCyan)]
 
  transition-all duration-500 "
        >
          Send
        </button>
      </form>{" "}
    </div>
  );
};

export default ContactForm;
