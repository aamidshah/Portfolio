
// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { FadeIn } from '../../framerMotion/Variants'
// import StarRatings from "react-star-ratings";
// import useGlobalStateStore from '../../store/useProjectStore';

// const BASE_URL = import.meta.env.VITE_API_URL;

// const ReviewForm = ({ projectId }) => {
//   const [message, setMessage] = useState('');
//   const [success, setSuccess] = useState('');
//   const [successVisible, setSuccessVisible] = useState(false);
//   const [name, setName] = useState('');
//   const [showAll, setShowAll] = useState(false);
//   const [rating, setRating] = useState(0);
  

//   const {reviews,setReviews,averageRating,setAverageRating, selectedProject, setSelectedProject} = useGlobalStateStore();
// // console.log( 'project id", projectId);
//   const fetchReviews = async () => {
//     if (!projectId) {
//       console.warn('projectId is undefined, skipping fetch.');
//       return;
//     }
//     try {
//       const response = await fetch(`${BASE_URL}/reviews/${projectId}`);
//       if (!response.ok) throw new Error('Failed to fetch reviews');

//       const data = await response.json();
//       console.log('Fetched data:', data);

//       if (!data || !Array.isArray(data.reviews)) {
//         console.error("❌ Invalid API response: 'reviews' is missing or not an array.", data);
//         setReviews([]); // Set empty array to avoid undefined error
//       } else {
//         setReviews(data.reviews);
//       console.log("reviews", data.reviews)
//       }
//       if (data.averageRating !== null && data.averageRating !== undefined) {
//       setAverageRating(projectId, data.averageRating);
//     } else {
//       console.warn("Received null averageRating, keeping previous value");
//     }
//     } catch (error) {
//       console.error('Error fetching reviews:', error);
//     }
//   };
 
// const handleReviewChange = async () => {
//   console.log("🔄 Fetching latest reviews...");
//   await fetchReviews();
// };
  
//   useEffect(() => {
//     if (!projectId) return;
//     setReviews([]);
//     fetchReviews();
//   }, [projectId]);

//   const sendReview = async (e) => {
//     e.preventDefault();
//     if (!name.trim() || !message.trim() || rating === 0) return;

//     const newReview = {
//       reviewer: name,
//       rating,
//       comment: message,
//     };

//     const isDuplicate = reviews.some(
//       (review) => review.reviewer.toLowerCase() === name.trim().toLowerCase()
//     );
//     if (isDuplicate) {
//       setSuccess('You have already submitted a review!');
//       setSuccessVisible(true);
//       setTimeout(() => setSuccessVisible(false), 3000);
//       return;
//     }
//     try {
//       const response = await fetch(`${BASE_URL}/reviews/${projectId}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newReview),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to submit review');
//       }
//       const updatedData = await response.json();
//       console.log("✅ Updated data after adding review:", updatedData);


//       setReviews(Array.isArray(updatedData.reviews) ? updatedData.reviews : reviews);

//       // ✅ Ensure the rating is a number
//       if (typeof updatedData.averageRating === "number") {
//         useGlobalStateStore.getState().setAverageRating(projectId, updatedData.averageRating);
//       } else {
//         console.warn("⚠️ Received null averageRating, keeping previous value.");
//       }

//       await handleReviewChange();

//       fetchReviews();

//       setMessage('');
//       setName('');
//       setRating(0);
//       setSuccess('Review submitted successfully!');
//       setSuccessVisible(true);

//       setTimeout(() => setSuccessVisible(false), 3000);
//     } catch (error) {
//       console.error('Error submitting review:', error);
//     }
//   };



//   // Delete a review from the database
//  const deleteReview = async (reviewId) => {
//     try {
//       const response = await fetch(`${BASE_URL}/reviews/${projectId}/${reviewId}`, {
//         method: 'DELETE',
//       });

//       if (!response.ok) throw new Error('Failed to delete review');
//       // fetchReviews();
//       const updatedData = await response.json();
//       console.log("✅ Updated data after delete:", updatedData);

//       setReviews(Array.isArray(updatedData.reviews) ? updatedData.reviews : reviews); 

//       // ✅ Ensure rating updates correctly
//       if (typeof updatedData.averageRating === "number") {
//         useGlobalStateStore.getState().setAverageRating(projectId, updatedData.averageRating);
//       } else {
//         console.warn("⚠️ Received null averageRating, keeping previous value.");
//       }
//     } catch (error) {
//       console.error('Error deleting review:', error);
//     }
//     await handleReviewChange();

//   };
//   return (
//     <div className="relative flex flex-col md:flex-row  items-center md:gap-38  max-w-7xl mx-auto">
//       {/* Reviews Display */}
//       <div className="w-full md:w-1/2 lg:w-1/2 mt-8">
//         <div className="bg-dark p-6 rounded-lg shadow-lg w-full">
//           <h3 className="text-xl font-semibold text-white mb-4">User Reviews and Ratings:
          

//           </h3>
//           {reviews.length > 0 ? (
//             <>
//             <motion.ul 
//               variants={FadeIn('right', 0.2) }
//               initial = 'hidden'
//               whileInView = 'show'
//               viewport={{once: false, amount: 0.7}}
//             className="space-y-3 overflow-y-auto custom-scrollbar">
//               {(showAll? reviews: reviews.slice(0, 3)).map((review) => (
                

//                 <li key={review._id} className="border-b border-gray-500 pb-2">
//                   <div
                
//                   className="flex justify-between items-center">
//                     <div className="flex items-center gap-30">
//                       <h1 className="text-white">{review.comment}</h1>
                     
//                     </div>
//                     <button
//                         onClick={() => {
//                           console.log("Rendering review:", review._id); // Debugging

//                           deleteReview(review._id)}}
//                           className="cursor-pointer bg-transparent text-red-500 hover:text-[var(--darkCyan)] text-xl md:mb-0 mb-[-100px]"

//                       >
//                         🗑️
//                       </button>
//                   </div>
//                   <div className="flex flex-col md:flex-row md:justify-between">
//   <StarRatings
//     rating={review.rating}
//     starRatedColor="#ffd700"
//     numberOfStars={5}
//     starDimension="15px"
//     starSpacing="2px"
//   />

//   {review.reviewer && (
//     <p className="text-sm text-gray-400 flex flex-col md:flex-row md:items-center gap-2">
//       By {review.reviewer}
//       <span>{new Date(review.date).toLocaleDateString()}</span>
//     </p>
//   )}
// </div>
//                 </li>
//               ))}
//             </motion.ul>
//              {/* Show "See More" button if there are more than 3 reviews */}
//              {reviews.length > 3 && (
//                 <button
//                   onClick={() => setShowAll(!showAll)}
//                   className="mt-4 w-full text-cyan font-bold hover:underline"
//                 >
//                   {showAll ? 'See Less' : 'See More'}
//                 </button>
//               )}
//             </>
//           ) : (
//             <p className="text-gray-400">No reviews yet. Be the first to leave one!</p>
//           )}
//         </div>
//       </div>

//       {/* Review Form */}
//       <div className="w-full md:w-1/2 lg:w-1/2">
//         <div className="bg-dark p-6 rounded-lg  shadow-lg w-full">
//           {success && (
//             <p className={`text-cyan text-lg font-bold transition-opacity duration-1000 ${successVisible ? 'opacity-100' : 'opacity-0'}`}>
//               {success}
//             </p>
//           )}

//           <form onSubmit={sendReview} className="flex text-white flex-col position-bottom  mt-12 gap-4">

//             <input
//               type="text"
//               name="name"
//               placeholder="Enter name"
//               required
//               value={name}
//               className="w-full rounded-lg bg-lightBrown p-3"
//               onChange={(e) => setName(e.target.value)}
//             />
//       <div className="flex flex-row xsm:flex-col items-center md:gap-0 md:flex-col lg:flex-row  lg:gap-18 justify-between mt-2">
//               <span className="text-md mt-1 font-semibold">Rate this Project:</span>
//               <StarRatings
//                 rating={rating}
//                 starRatedColor="#ffd700"
//                 numberOfStars={5}
//                 starDimension="20px"
//                 starSpacing="3px"
//                 changeRating={setRating}
//               />
//             </div>
//             <textarea
//               name="message"
//               placeholder="Write your review..."
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               rows="5"
//               required
//               className="rounded-lg bg-lightBrown p-3 resize-none"
//             ></textarea>
//             <button
//               type="submit"
//               className="w-full rounded-lg border border-cyan text-black h-12 font-bold text-xl bg-orange  hover:!bg-[var(--darkOrange)] transition-all duration-500"
//             >
//               Submit Review
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };


// export default ReviewForm;


import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "../../framerMotion/Variants";
import StarRatings from "react-star-ratings";
import useGlobalStateStore from "../../store/useProjectStore";

const BASE_URL = import.meta.env.VITE_API_URL;

const ReviewForm = ({ projectId }) => {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [successVisible, setSuccessVisible] = useState(false);
  const [name, setName] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [rating, setRating] = useState(0);

  const { reviews, setReviews, setAverageRating } = useGlobalStateStore();

  // ✅ Fetch Reviews from Backend
  //   const fetchReviews = async () => {
  //     if (!projectId) return;
  
  //     try {
  //         // ✅ Fetch reviews first
  //         const reviewsResponse = await fetch(`${BASE_URL}/reviews/${projectId}`);
  //         if (!reviewsResponse.ok) throw new Error("Failed to fetch reviews");
  
  //         const reviewsData = await reviewsResponse.json();
  //         console.log("✅ Fetched reviews:", reviewsData);
  
  //         if (!Array.isArray(reviewsData)) {
  //             console.error("❌ Invalid API response: 'reviews' missing or invalid.", reviewsData);
  //             setReviews([]);
  //         } else {
  //             setReviews(reviewsData);
  //         }
  
  //         // ✅ Fetch project details separately to get averageRating
  //         const projectResponse = await fetch(`${BASE_URL}/projects/${projectId}`);
  //         if (!projectResponse.ok) throw new Error("Failed to fetch project details");
  
  //         const projectData = await projectResponse.json();
  //         console.log("✅ Fetched project data:", projectData);
  
  //         if (typeof projectData.averageRating === "number") {
  //             setAverageRating(projectId, projectData.averageRating);
  //         } else {
  //             console.warn("⚠️ Received null averageRating, keeping previous value.");
  //         }
  
  //     } catch (error) {
  //         console.error("❌ Error fetching data:", error);
  //         setReviews([]);
  //     }
  // };
  
  const fetchReviews = async () => {
    if (!projectId) return;
  
    try {
      const response = await fetch(`${BASE_URL}/projects/${projectId}`);
      if (!response.ok) throw new Error("Failed to fetch project details");
  
      const projectData = await response.json();
      console.log("✅ Fetched project data:", projectData);
  
      // ✅ Ensure 'reviews' is an array before updating state
      if (Array.isArray(projectData.reviews)) {
        setReviews(projectData.reviews);
      } else {
        console.warn("⚠️ Invalid reviews format, setting empty array.");
        setReviews([]);
      }
  
      // ✅ Ensure 'averageRating' is valid before setting it
      if (typeof projectData.averageRating === "number") {
        setAverageRating(projectId, projectData.averageRating);
      } else {
        console.warn("⚠️ Received null averageRating, keeping previous value.");
      }
    } catch (error) {
      console.error("❌ Error fetching reviews:", error);
      setReviews([]); // Prevents UI errors
    }
  };
  


  useEffect(() => {
    if (projectId) {
      fetchReviews();
    }
  }, [projectId]);

  // ✅ Submit a Review
  const sendReview = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || rating === 0) return;


  try {
    // ✅ Fetch existing reviews first
    const reviewResponse = await fetch(`${BASE_URL}/reviews/${projectId}`);
    if (!reviewResponse.ok) throw new Error("Failed to fetch existing reviews");

    const reviewData = await reviewResponse.json();
    console.log("✅ Existing Reviews:", reviewData);

    // ✅ Check if the user has already reviewed
    const isDuplicate = reviewData.reviews.some(
      (review) => review.reviewer.toLowerCase() === name.trim().toLowerCase()
    );

    if (isDuplicate) {
      setSuccess("You have already submitted a review!");
      setSuccessVisible(true);
      setTimeout(() => setSuccessVisible(false), 3000);
      return;
    }

    const newReview = { reviewer: name, rating, comment: message };

    
      const response = await fetch(`${BASE_URL}/reviews/${projectId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit review");
      }

      await fetchReviews(); // ✅ Ensure fresh data

      setMessage("");
      setName("");
      setRating(0);
      setSuccess("Review submitted successfully!");
      setSuccessVisible(true);

      setTimeout(() => setSuccessVisible(false), 3000);
    } catch (error) {
      console.error("❌ Error submitting review:", error);
    }
  };
 

  const deleteReview = async (reviewId) => {
    try {
        const response = await fetch(`${BASE_URL}/reviews/${projectId}/${reviewId}`, {
            method: "DELETE",
        });

        if (!response.ok) throw new Error("Failed to delete review");

        console.log("✅ Review deleted successfully");
        
        // ✅ Fetch the latest reviews and updated average rating after deletion
        await fetchReviews();
    } catch (error) {
        console.error("❌ Error deleting review:", error);
    }
};


//   try {
//       const response = await fetch(`${BASE_URL}/reviews/${projectId}/${reviewId}`, {
//           method: "DELETE",
//       });

//       if (!response.ok) throw new Error("Failed to delete review");

//       const updatedReviews = await response.json();
//       console.log("✅ Updated reviews after delete:", updatedReviews);

//       // ✅ Update reviews state
//       if (Array.isArray(updatedReviews.reviews)) {
//           setReviews(updatedReviews.reviews);
//       } else {
//           console.warn("⚠️ Invalid reviews data, setting empty array.");
//           setReviews([]);
//       }

//       // ✅ Fetch updated averageRating separately from `projects/{projectId}`
//       const projectResponse = await fetch(`${BASE_URL}/projects/${projectId}`);
//       if (!projectResponse.ok) throw new Error("Failed to fetch updated project data");

//       const projectData = await projectResponse.json();
//       console.log("✅ Fetched updated project data:", projectData);

//       // ✅ Update `averageRating` in Zustand state
//       if (typeof projectData.averageRating === "number") {
//           setAverageRating(projectId, projectData.averageRating);
//       } else {
//           console.warn("⚠️ Received null averageRating, keeping previous value.");
//       }

//   } catch (error) {
//       console.error("❌ Error deleting review:", error);
//   }
// };

  return (
    <div className="relative flex flex-col md:flex-row items-center md:gap-38 max-w-7xl mx-auto">
      {/* Reviews Display */}
      <div className="w-full md:w-1/2 lg:w-1/2 mt-8">
        <div className="bg-dark p-6 rounded-lg shadow-lg w-full">
          <h3 className="text-xl font-semibold text-white mb-4">User Reviews and Ratings:</h3>
          {reviews.length > 0 ? (
            <>
              <motion.ul
                variants={FadeIn("right", 0.2)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.7 }}
                className="space-y-3 overflow-y-auto custom-scrollbar"
              >
                {(showAll ? reviews : reviews.slice(0, 3)).map((review) => (
                  <li key={review._id} className="border-b border-gray-500 pb-2">
                    <div className="flex justify-between items-center">
                      <h1 className="text-white">{review.comment}</h1>
                      <button
                        onClick={() => deleteReview(review._id)}
                        className="cursor-pointer bg-transparent text-red-500 hover:text-[var(--darkCyan)] text-xl"
                      >
                        🗑️
                      </button>
                    </div>
                    <div className="flex flex-col md:flex-row md:justify-between">
                      <StarRatings
                        rating={review.rating}
                        starRatedColor="#ffd700"
                        numberOfStars={5}
                        starDimension="15px"
                        starSpacing="2px"
                      />
                      {review.reviewer && (
                        <p className="text-sm text-gray-400 flex flex-col md:flex-row md:items-center gap-2">
                          By {review.reviewer} <span>{new Date(review.date).toLocaleDateString()}</span>
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </motion.ul>
              {reviews.length > 3 && (
                <button onClick={() => setShowAll(!showAll)} className="mt-4 w-full text-cyan font-bold hover:underline">
                  {showAll ? "See Less" : "See More"}
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
        <div className="bg-dark p-6 rounded-lg shadow-lg w-full">
          {success && (
            <p className={`text-cyan text-lg font-bold transition-opacity duration-1000 ${successVisible ? "opacity-100" : "opacity-0"}`}>
              {success}
            </p>
          )}
          <form onSubmit={sendReview} className="flex text-white flex-col mt-12 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              required
              value={name}
              className="w-full rounded-lg bg-lightBrown p-3"
              onChange={(e) => setName(e.target.value)}
            />
            <div className="flex items-center justify-between mt-2">
              <span className="text-md mt-1 font-semibold">Rate this Project:</span>
              <StarRatings
                rating={rating}
                starRatedColor="#ffd700"
                numberOfStars={5}
                starDimension="20px"
                starSpacing="3px"
                changeRating={setRating}
              />
            </div>
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
              className="w-full rounded-lg border border-cyan text-black h-12 font-bold text-xl bg-orange hover:bg-[var(--darkOrange)] transition-all duration-500"
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
