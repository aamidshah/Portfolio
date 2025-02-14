


import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from '../../framerMotion/Variants'

//   const [success, setSuccess] = useState('');
//   const [successVisible, setSuccessVisible] = useState(false);
//   const [reviews, setReviews] = useState([]);
//   const [name, setName] = useState('');

//   // Load reviews from local storage on mount
//   useEffect(() => {
//     const storedReviews = JSON.parse(localStorage.getItem('projectReviews')) || [];
//     setReviews(storedReviews);
//   }, []);

//   const handleMessageChange = (e) => {
//     setMessage(e.target.value);
//   };

//   const handleNameChange = (e) => {
//     setName(e.target.value);
//   };

//   const sendReview = (e) => {
//     e.preventDefault();

//     if (!message.trim() || !name.trim()) return;

//     const newReview = {
//       id: Date.now(),
//       text: message,
//       name,
//     };

//     // Update state and local storage
//     const updatedReviews = [newReview, ...reviews]; // Newest reviews appear first
//     setReviews(updatedReviews);
//     localStorage.setItem('projectReviews', JSON.stringify(updatedReviews));

//     // Clear input & show success message
//     setMessage('');
//     setName('');
//     setSuccess('Review submitted successfully!');
//     setSuccessVisible(true);

//     // Hide success message after 3 seconds
//     setTimeout(() => setSuccessVisible(false), 3000);
//   };

//   const deleteReview = (id) => {
//     const updatedReviews = reviews.filter((review) => review.id !== id);
//     setReviews(updatedReviews);
//     localStorage.setItem('projectReviews', JSON.stringify(updatedReviews));
//   };

//   return (
// <div className="relative flex flex-col md:flex-row items-start justify-between md:gap-38 px-4 max-w-7xl mx-auto">
      
//       {/* Left Side - Reviews Display */}
//       <div className="w-full md:w-1/2 lg:w-1/2 mt-8">
//         <div className="bg-dark p-6 rounded-lg shadow-lg w-full">
//           <h3 className="text-xl font-bold text-white mb-4">User Reviews:</h3>
//           {reviews.length > 0 ? (
//             <motion.ul
//              variants={FadeIn('down', 0.2) }
//                   initial = 'hidden'
//                   whileInView = 'show'
//                   viewport={{once: false, amount: 0.7}}
//             className="space-y-3 overflow-y-auto custom-scrollbar">
//               {reviews.map((review) => (
//                 <li key={review.id} className="border-b border-gray-500 pb-2">
//                   <div className="flex justify-between items-center">
//                     {/* Review Text + Delete Button */}
//                     <div className="flex items-center gap-2">
//                       <h1 className=" text-white">{review.text}</h1>
//                       <button
//                         onClick={() => deleteReview(review.id)}
//                         className="text-red-500 hover:text-red-700 text-xl ml-4"
//                         title="Delete Review"
//                       >
//                         🗑️
//                       </button>
//                     </div>
//                   </div>
//                   {/* Name Below Review */}
//                   {review.name && <p className="text-sm text-gray-400 mt-1">By {review.name}</p>}
//                 </li>
//               ))}
//             </motion.ul>
//           ) : (
//             <p className="text-gray-400">No reviews yet. Be the first to leave one!</p>
//           )}
//         </div>
//       </div>

//       {/* Right Side - Review Form */}
//       <div className="w-full md:w-1/2 lg:w-1/2">
//         <div className="bg-dark p-6 rounded-lg shadow-lg w-full">
//           {/* Success Message */}
//           {success && (
//             <p className={`text-cyan text-lg font-bold transition-opacity duration-1000 ${successVisible ? 'opacity-100' : 'opacity-0'}`}>
//               {success}
//             </p>
//           )}

//           {/* Review Form */}
//           <form onSubmit={sendReview} className="flex text-white flex-col gap-4">
//             <input
//               type="text"
//               name="name"
//               placeholder="Enter name"
//               required
//               value={name}
//               className="w-full rounded-lg bg-lightBrown p-3"
//               onChange={handleNameChange}
//             />

//             <textarea
//               name="message"
//               placeholder="Write your review..."
//               value={message}
//               onChange={handleMessageChange}
//               rows="5"
//               required
//               className="rounded-lg bg-lightBrown p-3 resize-none"
//             ></textarea>

//             <button
//               type="submit"
//               className="w-full rounded-lg border border-cyan text-black h-12 font-bold text-xl bg-orange hover:bg-darkCyan transition-all duration-500"
//             >
//               Submit Review
//             </button>
//           </form>
//         </div>
//       </div>

//     </div>
//   );
// };

const ReviewForm = ({ projectId }) => {
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');
  const [successVisible, setSuccessVisible] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState('');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const storedReviews = JSON.parse(localStorage.getItem(`reviews-${projectId}`)) || [];
    setReviews(storedReviews);
  }, [projectId]);

  const sendReview = (e) => {
    e.preventDefault();
    if (!message.trim() || !name.trim()) return;

    const newReview = { id: Date.now(), text: message, name,    date: new Date().toLocaleDateString(), // Adding formatted date
    };
    const updatedReviews = [newReview, ...reviews];

    setReviews(updatedReviews);
    localStorage.setItem(`reviews-${projectId}`, JSON.stringify(updatedReviews));

    setMessage('');
    setName('');
    setSuccess('Review submitted successfully!');
    setSuccessVisible(true);

    setTimeout(() => setSuccessVisible(false), 3000);
  };

  const deleteReview = (id) => {
    const updatedReviews = reviews.filter((review) => review.id !== id);
    setReviews(updatedReviews);
    localStorage.setItem(`reviews-${projectId}`, JSON.stringify(updatedReviews));
  };

  return (
    <div className="relative flex flex-col md:flex-row  items-center md:gap-38  max-w-7xl mx-auto">
      {/* Reviews Display */}
      <div className="w-full md:w-1/2 lg:w-1/2 mt-8">
        <div className="bg-dark p-6 rounded-lg shadow-lg w-full">
          <h3 className="text-xl font-bold text-white mb-4">User Reviews:</h3>
          {reviews.length > 0 ? (
            <>
            <motion.ul 
              variants={FadeIn('right', 0.2) }
              initial = 'hidden'
              whileInView = 'show'
              viewport={{once: false, amount: 0.7}}
            className="space-y-3 overflow-y-auto custom-scrollbar">
              {(showAll? reviews: reviews.slice(0, 3)).map((review) => (
                <li key={review.id} className="border-b border-gray-500 pb-2">
                  <div
                
                  className="flex justify-between items-center">
                    <div className="flex items-center gap-30">
                      <h1 className="text-white">{review.text}</h1>
                     
                    </div>
                    <button
                        onClick={() => deleteReview(review.id)}
                        className="text-red-500  hover:!text-[var(--darkCyan)] text-xl mb-[-40px] "
                        title="Delete Review"
                      >
                        🗑️
                      </button>
                  </div>
                  <div className='flex justify-between i'> 
                  {review.name && <p className="text-sm text-gray-400 gap-23 flex flex-row ">By {review.name} <p>{review.date}</p></p>}
                  </div>
                </li>
              ))}
            </motion.ul>
             {/* Show "See More" button if there are more than 3 reviews */}
             {reviews.length > 3 && (
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="mt-4 w-full text-cyan font-bold hover:underline"
                >
                  {showAll ? 'See Less' : 'See More'}
                </button>
              )}
            </>
          ) : (
            <p className="text-gray-400">No reviews yet. Be the first to leave one!</p>
          )}
        </div>
      </div>

      {/* Review Form */}
      <div className="w-full md:w-1/2 lg:w-1/2">
        <div className="bg-dark p-6 rounded-lg  shadow-lg w-full">
          {success && (
            <p className={`text-cyan text-lg font-bold transition-opacity duration-1000 ${successVisible ? 'opacity-100' : 'opacity-0'}`}>
              {success}
            </p>
          )}

          <form onSubmit={sendReview} className="flex text-white flex-col position-bottom  mt-12 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              required
              value={name}
              className="w-full rounded-lg bg-lightBrown p-3"
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              name="message"
              placeholder="Write your review..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="5"
              required
              className="rounded-lg bg-lightBrown p-3 resize-none"
            ></textarea>
            <button
              type="submit"
              className="w-full rounded-lg border border-cyan text-black h-12 font-bold text-xl bg-orange  hover:!bg-[var(--darkOrange)] transition-all duration-500"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};


export default ReviewForm;
