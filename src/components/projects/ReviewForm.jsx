


import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from '../../framerMotion/Variants'
import StarRatings from "react-star-ratings";
import useGlobalStateStore from '../../store/useProjectStore';

const BASE_URL = import.meta.env.VITE_API_URL;

const ReviewForm = ({ projectId }) => {
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');
  const [successVisible, setSuccessVisible] = useState(false);
  const [name, setName] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [rating, setRating] = useState(0);
  

  const {reviews,setReviews,averageRating,setAverageRating} = useGlobalStateStore();

  const fetchReviews = async () => {
    console.log("Fetching rating for projectId:", projectId);

    if (!projectId) {
      console.warn("projectId is undefined, skipping fetch.");
      return;
    }
    try {
      // console.log(`Fetching reviews from: ${BASE_URL}/reviews/${projectId}`);

      const response = await fetch(`${BASE_URL}/reviews/${projectId}`);
      if (!response.ok) throw new Error('Failed to fetch reviews');

      const data = await response.json();

      // ✅ Ensure state only updates with fresh data
      setReviews(data.reviews);
      setAverageRating(data.averageRating);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };
  useEffect(() => {
   
    if (!projectId) return;
    // ✅ Clear old reviews before fetching new ones
    setReviews([]); // This prevents duplicates from accumulating
    fetchReviews();
    setAverageRating(0);
  }, [projectId]);
  
  const sendReview = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || rating === 0) return;


    const newReview = {
      reviewer: name,
      rating,
            comment: message
    };
    console.log("Sending review:", newReview); // ✅ Debugging
    const isDuplicate = reviews.some(review => review.reviewer.toLowerCase() === name.trim().toLowerCase());
    if (isDuplicate) {
      setSuccess('You have already submitted a review!');
      setSuccessVisible(true);
      setTimeout(() => setSuccessVisible(false), 3000);
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/reviews/${projectId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit review');
      }      fetchReviews(); 
      
      setMessage('');
      setName('');
      setRating(0);
      setSuccess('Review submitted successfully!');
      setSuccessVisible(true);

      setTimeout(() => setSuccessVisible(false), 3000);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };
  useEffect(() => {
    console.log("Updated reviews:", reviews);
  }, [reviews]);
  

  // Delete a review from the database
  const deleteReview = async (reviewId) => {

    try {
      const response = await fetch(`${BASE_URL}/reviews/${projectId}/${reviewId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete review');

      setReviews(reviews.filter((review) => review._id !== reviewId));
      // setAverageRating(rating)
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };
  return (
    <div className="relative flex flex-col md:flex-row  items-center md:gap-38  max-w-7xl mx-auto">
      {/* Reviews Display */}
      <div className="w-full md:w-1/2 lg:w-1/2 mt-8">
        <div className="bg-dark p-6 rounded-lg shadow-lg w-full">
          <h3 className="text-xl font-semibold text-white mb-4">User Reviews and Ratings:
          

          </h3>
          {reviews.length > 0 ? (
            <>
            <motion.ul 
              variants={FadeIn('right', 0.2) }
              initial = 'hidden'
              whileInView = 'show'
              viewport={{once: false, amount: 0.7}}
            className="space-y-3 overflow-y-auto custom-scrollbar">
              {(showAll? reviews: reviews.slice(0, 3)).map((review) => (
                

                <li key={review._id} className="border-b border-gray-500 pb-2">
                  <div
                
                  className="flex justify-between items-center">
                    <div className="flex items-center gap-30">
                      <h1 className="text-white">{review.comment}</h1>
                     
                    </div>
                    <button
                        onClick={() => {
                          console.log("Rendering review:", review._id); // Debugging

                          deleteReview(review._id)}}
                          className="cursor-pointer bg-transparent text-red-500 hover:text-[var(--darkCyan)] text-xl md:mb-0 mb-[-100px]"

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
      By {review.reviewer}
      <span>{new Date(review.date).toLocaleDateString()}</span>
    </p>
  )}
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
      <div className="flex flex-row xsm:flex-col items-center md:gap-0 md:flex-col lg:flex-row  lg:gap-18 justify-between mt-2">
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
