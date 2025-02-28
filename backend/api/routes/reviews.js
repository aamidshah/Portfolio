const express = require("express");
const { getReviews, addReview, deleteReview   ,getReviewById} = require("../controllers/reviewController");
const router = express.Router();

// Routes
router.get("/:projectId", getReviews);
router.post("/:projectId", addReview);
router.get("/:projectId/:reviewId", getReviewById);
router.delete("/:projectId/:reviewId", deleteReview);
// router.patch("/:projectId/:reviewId/rating", updateRating);


module.exports = router;
