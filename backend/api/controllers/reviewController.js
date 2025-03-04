

// // const deleteReview = async (req, res) => {
// //   try {
// //       const { projectId, reviewId } = req.params;

// //       console.log("Received delete request for:", projectId, reviewId); // Fix logging

// //       if (!mongoose.Types.ObjectId.isValid(reviewId)) {
// //           return res.status(400).json({ message: "Invalid review ID format" });
// //       }

// //       // Convert reviewId to ObjectId before using $pull
// //       const updatedProject = await Project.findByIdAndUpdate(
// //           projectId,
// //           { $pull: { reviews: { _id: new mongoose.Types.ObjectId(reviewId) } } },
// //           { new: true }
// //       );

// //       if (!updatedProject) {
// //           return res.status(404).json({ message: "Project not found" });
// //       }

// //       res.status(200).json({ message: "Review deleted successfully", project: updatedProject });
// //   } catch (error) {
// //       console.error("Error deleting review:", error);
// //       res.status(500).json({ message: "Error deleting review", error });
// //   }
// // };

// const deleteReview = async (req, res) => {
//     try {
//         const { projectId, reviewId } = req.params;

//         if (!mongoose.Types.ObjectId.isValid(reviewId)) {
//             return res.status(400).json({ message: "Invalid review ID format" });
//         }

//         // Find project and remove the review
//         const project = await Project.findById(projectId);
//         if (!project) return res.status(404).json({ message: "Project not found" });

//         project.reviews = project.reviews.filter(review => review._id.toString() !== reviewId);

//         // Recalculate average rating
//         project.averageRating = project.reviews.length
//             ? parseFloat(
//                 (project.reviews.reduce((sum, r) => sum + r.rating, 0) / project.reviews.length).toFixed(1)
//             )
//             : 0; // Set to 0 if no reviews remain

//         await project.save();

//         res.status(200).json({ message: "Review deleted successfully", reviews: project.reviews, averageRating: project.averageRating });
//     } catch (error) {
//         res.status(500).json({ message: "Error deleting review", error });
//     }
// };


// module.exports = { deleteReview,addReview,getReviewById, getReviews };

const Project = require("../models/Project");
const mongoose = require("mongoose");

// ✅ Get reviews for a specific project
const getReviews = async (req, res) => {
  try {
      const project = await Project.findById(req.params.projectId);
      if (!project) {
          console.warn("❌ Project not found:", req.params.projectId);
          return res.status(404).json({ message: "Project not found" });
      }

      // Ensure `reviews` is always an array and `averageRating` is always a number
      const response = {
          reviews: Array.isArray(project.reviews) ? project.reviews : [],
          averageRating: typeof project.averageRating === "number" ? project.averageRating : 0
      };

      console.log("✅ Sending Response:", response);
      res.json(response); // ✅ Always send an object
  } catch (error) {
      console.error("❌ Error fetching reviews:", error);
      res.status(500).json({ message: "Server error", error });
  }
};



// ✅ Add a new review
const addReview = async (req, res) => {
    console.log("Received review data:", req.body);
    try {
        const { reviewer, rating, comment } = req.body;

        if (!reviewer || !rating || !comment) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (isNaN(rating) || rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Invalid rating. It must be a number between 1 and 5." });
        }

        const project = await Project.findById(req.params.projectId);
        if (!project) return res.status(404).json({ message: "Project not found" });

        // ✅ Check if the reviewer already submitted a review
        const existingReview = project.reviews.find((review) => 
            review.reviewer === reviewer || review.comment === comment
        );

        if (existingReview) {
            return res.status(400).json({ message: "Duplicate review detected" });
        }

        // Create & add new review
        const newReview = { reviewer, rating, comment, date: new Date() };
        project.reviews.unshift(newReview);

        // ✅ Update the average rating
        project.averageRating = parseFloat(
            (project.reviews.reduce((sum, r) => sum + r.rating, 0) / project.reviews.length).toFixed(1)
        );

        await project.save();
        
        console.log("✅ Review added successfully:", newReview);

        res.status(201).json({ 
            message: "Review added successfully", 
            reviews: project.reviews, 
            averageRating: project.averageRating 
        });
    } catch (error) {
        console.error("❌ Error adding review:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

// ✅ Get a specific review by its ID
const getReviewById = async (req, res) => {
    try {
        const { projectId, reviewId } = req.params;

        const project = await Project.findById(projectId);
        if (!project) return res.status(404).json({ message: "Project not found" });

        const review = project.reviews.find((r) => r._id.toString() === reviewId);
        if (!review) return res.status(404).json({ message: "Review not found" });

        res.json(review);
    } catch (error) {
        console.error("❌ Error fetching review:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

// ✅ Delete a review
const deleteReview = async (req, res) => {
  

try {
  const { projectId, reviewId } = req.params;

  const project = await Project.findById(projectId);

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  // Remove the review
  project.reviews = project.reviews.filter(
    (review) => review._id.toString() !== reviewId
  );

  // Save the project to trigger the pre("save", ...) middleware
  await project.save();

  res.json({ message: "Review deleted and average rating updated" });
} catch (error) {
  console.error("Error deleting review:", error);
  res.status(500).json({ message: "Internal server error" });
}
};



module.exports = { deleteReview, addReview, getReviewById, getReviews };

