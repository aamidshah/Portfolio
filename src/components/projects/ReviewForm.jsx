


import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from '../../framerMotion/Variants'



const ReviewForm = ({ projectId }) => {
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');
  const [successVisible, setSuccessVisible] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState('');
  const [showAll, setShowAll] = useState(false);

 
  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/reviews/${projectId}`);
      if (!response.ok) throw new Error('Failed to fetch reviews');

      const data = await response.json();

      // ✅ Ensure state only updates with fresh data
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };
  useEffect(() => {
   
  
    // ✅ Clear old reviews before fetching new ones
    setReviews([]); // This prevents duplicates from accumulating
    fetchReviews();
  }, [projectId]);
  
  const sendReview = async (e) => {
    e.preventDefault();
    if (!message.trim() || !name.trim()) return;

    const newReview = {
      reviewer: name,
      rating: 5, // Set a default rating for now
      comment: message
    };

    try {
      const response = await fetch(`http://localhost:5000/api/reviews/${projectId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview),
      });

      if (!response.ok) throw new Error('Failed to submit review');
      fetchReviews(); 
      
      // setReviews((prevReviews) => [...prevReviews, addedReview]);
      setMessage('');
      setName('');
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
    console.log(`Deleting review:http://localhost:5000/api/reviews/${projectId}/${reviewId}`);

    try {
      const response = await fetch(`http://localhost:5000/api/reviews/${projectId}/${reviewId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete review');

      setReviews(reviews.filter((review) => review._id !== reviewId));
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };
  return (
    <div className="relative flex flex-col md:flex-row  items-center md:gap-38  max-w-7xl mx-auto">
      {/* Reviews Display */}
      <div className="w-full md:w-1/2 lg:w-1/2 mt-8">
        <div className="bg-dark p-6 rounded-lg shadow-lg w-full">
          <h3 className="text-xl font-bold text-white mb-4">User Reviews:

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
                          className="cursor-pointer bg-transparent text-red-500 hover:text-[var(--darkCyan)] text-xl mb-2"

                      >
                        🗑️
                      </button>
                  </div>
                  <div className='flex justify-between i'> 
                  {review.reviewer && <p className="text-sm text-gray-400 gap-23 flex flex-row ">By {review.reviewer} <p>{new Date(review.date).toLocaleDateString()}</p></p>}
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
