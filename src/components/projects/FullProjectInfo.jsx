
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import ReviewForm from "./ReviewForm";
import { FadeIn } from '../../framerMotion/Variants';

const FullProjectInfo = ({ id, name, description,year, image,features, technologyUsage, link, gitLink, onClose }) => {
  console.log("Received project ID:", id);

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const technologyUsageKeys = technologyUsage ? Object.keys(technologyUsage) : [];
  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    const imageHeight = 500;
    const newIndex = Math.round(scrollTop / imageHeight);
    setSelectedIndex(newIndex);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-80 backdrop-blur-md z-50">
      <div className="bg-gray-900 text-white w-full h-full max-w-6xl rounded-lg shadow-lg overflow-hidden relative flex flex-col max-h-screen">
        <div className="overflow-y-auto flex-1 p-8 custom-scrollbar">
          <button
            className="absolute top-4 right-4 text-gray-200 hover:text-white text-2xl"
            onClick={onClose}
          >
            ✖
          </button>
          <motion.h1
            variants={FadeIn("down", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.7 }}
            className="text-4xl font-bold text-orange-400 text-center md:mb-6"
          >
            {name}
          </motion.h1>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-16">
            <div className="flex-1 p-4">
              <motion.p
                variants={FadeIn("right", 0.2)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.7 }}
                className="text-md text-gray-400 md:mt-8"
              >
                {description}
              </motion.p>
              

              <motion.ul
                variants={FadeIn("right", 0.2)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.7 }}
                className="mt-12"
              >
  {Array.isArray(features) && features.length > 0 ? (
                 features.map((feature, index) => (
                  <li key={index} className="text-lg text-gray-300 flex items-center">
                    <FaCheckCircle className="text-green-500 mr-2" /> {feature}
                  </li>)
                  )
                )

                 :(<li>No features available</li>)}


              </motion.ul>
              {/* <motion.div
                variants={FadeIn("right", 0.2)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.7 }}
                className="flex flex-col gap-2 mt-6"
              >
                <p className="text-lg text-gray-300">
                  <strong>Year:</strong> {year}
                </p>

                <p className="text-lg text-gray-300">
                <strong>Technologies:</strong>{" "} </p>
               <ul>
                {Object.keys(technologyUsage).length > 0 ? (
  Object.keys(technologyUsage).map((techName, index) => (
     <li key={index}>
      {techName}
      {index < Object.keys(technologyUsage).length - 1 ? ", " : ""}
    </li>
  ))
) : (
  "None"
)}            </ul>
              </motion.div> */}

<motion.div
  variants={FadeIn("right", 0.2)}
  initial="hidden"
  whileInView="show"
  viewport={{ once: false, amount: 0.7 }}
  className="flex flex-col gap-2 mt-6"
>
  <p className="text-lg text-gray-300">
    <strong>Year:</strong> {year}
  </p>

  <p className="text-lg text-gray-300">
    <strong>Technologies:</strong>
  </p>

  <ul className="space-y-2">
{technologyUsageKeys.length > 0 ? (
      Object.entries(technologyUsage).map(([techName, usage], index) => {
        // Determine color based on usage percentage
        let barColor =
          usage > 75 ? "bg-yellow-400" :
          usage > 50 ? "bg-blue-500" :
          usage > 20 ? "bg-green-500" :
          "bg-red-500"; // Less than 20%

        return (
          <li key={index} className="flex flex-col">
            {/* Tech Name with Percentage */}
            <span className="text-gray-300">
              {techName} ({usage}%)
            </span>

            {/* Progress Bar */}
            <div className="w-full h-3 bg-gray-700 rounded-lg overflow-hidden">
              <div
                className={`h-full rounded-lg transition-all duration-300 ${barColor}`}
                style={{ width: `${usage}%` }}
              ></div>
            </div>
          </li>
        );
      })
    ) : (
      <li className="text-gray-400">None</li>
    )}
  </ul>
</motion.div>

            </div>


            <div className="flex-1 max-h-[400px] max-w-[400px] border border-grey-600 rounded-2xl overflow-hidden relative">
              <div className="h-[500px] overflow-y-auto custom-scrollbar snap-y snap-mandatory md:block hidden" onScroll={handleScroll}>
                {image?.length > 0 ? (
                  image?.map((img, index) => (
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
              <div className="flex overflow-x-auto md:hidden max-h-[300px] w-[350px] custom-scrollbar space-x-4 justify-center">
                {image?.length > 0 ? (
                  image?.map((img, index) => (
                    <motion.img
                      key={index}
                      src={img}
                      alt={`Project Image ${index + 1}`}
                      className="h-[300px] max-h-[500px] w-[400px] object-cover rounded-xl shadow-md transition-opacity duration-300"
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
            </div>
          </div>
          <ReviewForm projectId={id} />
        </div>
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
