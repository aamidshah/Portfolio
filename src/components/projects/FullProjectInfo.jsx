

import React, { useEffect ,useState} from 'react';
import { FaExternalLinkAlt, FaGithub ,FaCheckCircle} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { FadeIn } from '../../framerMotion/Variants'
import ReactPlayer from 'react-player';  // Import ReactPlayer
import ReviewForm from '../projects/ReviewForm';

const FullProjectInfo = ({ name, year, image, link, gitLink,features, technologies,video, description, onClose }) => {

  const [selectedIndex, setSelectedIndex] = useState(0);
  const generateProjectSlug = (name) => name.toLowerCase().replace(/\s+/g, '-');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);


  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    const imageHeight = 500; // Fixed height of each image
    const newIndex = Math.round(scrollTop / imageHeight);
    setSelectedIndex(newIndex);
  };
  

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-80 backdrop-blur-md z-50">
      {/* Modal Content */}
      <div
 
  className="bg-gray-900 text-white w-full h-full max-w-6xl rounded-lg shadow-lg overflow-hidden relative flex flex-col max-h-screen"
>
  {/* Scrollable Content */}
  <div className="overflow-y-auto flex-1 p-8 custom-scrollbar">
  {/* Close Button */}
    <button
      className="absolute top- right-4 !text-gray-200 hover:!text-white text-2xl"
      onClick={onClose}
    >
      ✖
    </button>

    {/* Project Name */}
    <motion.h1 
      variants={FadeIn('down', 0.2) }
      initial = 'hidden'
      whileInView = 'show'
      viewport={{once: false, amount: 0.7}}
    className="text-4xl font-bold text-orange-400 text-center md:mb-6">{name}</motion.h1>

    {/* Main Content */}
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-16">
      {/* Left Section: Project Details */}
      <div 
     
      className="flex-1 p-4">
        <motion.p 
         variants={FadeIn('right', 0.2) }
         initial = 'hidden'
         whileInView = 'show'
         viewport={{once: false, amount: 0.7}}
        className="text-md text-gray-400 md:mt-8">{description}</motion.p>
        <motion.ul 
         variants={FadeIn('right', 0.2) }
         initial = 'hidden'
         whileInView = 'show'
         viewport={{once: false, amount: 0.7}}
        className="mt-12">
          {features.map((feature, index) => (
            <li  key={index} className="text-lg text-gray-300 flex items-center">
              <FaCheckCircle className="text-green-500 mr-2 " /> {feature}
            </li>
          ))} 
        </motion.ul>
        <motion.div
         variants={FadeIn('right', 0.2) }
         initial = 'hidden'
         whileInView = 'show'
         viewport={{once: false, amount: 0.7}}
        className="flex flex-col gap-2 mt-6">
          <p className="text-lg text-gray-300"><strong>Year:</strong> {year}</p>
          <p className="text-lg text-gray-300"><strong>Tech:</strong> {technologies}</p>
        </motion.div>
      </div>

      {/* Right Section: Image Gallery */}
    {/* <div className='mt-8'> */}
         <div className=" flex-1  max-h-[400px] max-w-[400px]  border border-grey-600  rounded-2xl overflow-hidden relative " >
      {/* Images */}
      {/* <div className='md:block  overflow-y-auto custom-scrollbar h-[500px]   hidden' onScroll={handleScroll}>
    */}
     <div className="h-[500px] overflow-y-auto custom-scrollbar snap-y snap-mandatory md:block hidden"
     onScroll={handleScroll}>
       {image.length > 0 ? (
    image.map((img, index) => (
      <motion.img
        key={index}
        src={img}
        alt={`Project Image ${index + 1}`}
        className="w-full h-[500px] object-cover snap-center md:h-full rounded-xl shadow-md transition-opacity duration-300"
        variants={FadeIn("left", 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.7 }}
      />
    ))
  ) : (
    <div className="flex items-center justify-center h-[500px] text-gray-500 text-lg font-semibold">
      Oops!! No images available 😢
    </div>
  )}
</div>
<div className="flex overflow-x-auto md:hidden  max-h-[300px] w-[350px] custom-scrollbar  space-x-4 justify-center">
      {image.length > 0 ? (
        image.map((img, index) => (
          <motion.img
            key={index}
            src={img}
            alt={`Project Image ${index + 1}`}
                      className="h-[300px] max-h-[500px] w-[400px]   object-cover rounded-xl shadow-md transition-opacity duration-300"

            variants={FadeIn("left", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.7 }}
          />
        ))
      ) : (
        <div className="flex items-center justify-center h-64 text-gray-500 text-lg font-semibold">
          Oops!! No images available 😢
        </div>
      )}
    </div>
      {/* Dots Indicator */}
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
        {image.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              selectedIndex === index ? "bg-white" : "bg-gray-500 opacity-50"
            }`}
          ></div>
        ))}

        
      </div>
    </div>
    {/* </div> */}
    </div>
    <ReviewForm projectId={generateProjectSlug(name)} />
    </div> 
 
  

  {/* Bottom Section: Links (Sticky at the bottom) */}
  <div className="bg-gray-900 py-4 px-6 flex justify-center gap-6 sticky bottom-0 border-t border-gray-700">
    {link && (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-lg font-semibold text-blue-400 hover:text-blue-300 transition duration-200"
      >
        <FaExternalLinkAlt className="text-orange-400" /> Live Demo
      </a>
    )}
    {gitLink && (
      <a
        href={gitLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-lg font-semibold text-green-400 hover:text-green-300 transition duration-200"
      >
        <FaGithub className="text-orange-400" /> GitHub Repository
      </a>
    )}
  </div>
</div>

    </div>
  );
};

export default FullProjectInfo;




