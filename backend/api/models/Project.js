const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    reviewer: { type: String, required: true, trim: true },  // Name of the reviewer
    rating: { type: Number, required: true, min: 1, max: 5 }, // Rating (1-5 stars)
    comment: { type: String, required: true, trim: true },
    date: { type: Date, default: Date.now } // Timestamp of review
});

const ProjectSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, trim: true },
    year: { type: Number },
    image: { type: [String], default: [] },
    // image: String,
    link: { type: String, trim: true },
    gitLink: { type: String, trim: true },
    description: { type: String, required: true },
    features: { type: [String], default: [] },
    complexity: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
    category: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    estimatedTime: { type: String },
    status: { type: String, enum: ["In Progress", "Completed", "Pending"] },
    contributors: { type: [String], default: [] },
    technologyUsage: { type: Object, default: {} },

    // Reviews & Ratings
    reviews: { type: [ReviewSchema], default: [] }, // Stores an array of reviews
    averageRating: { type: Number, default: 0 } // Stores overall rating for the project

}, { timestamps: true });
ProjectSchema.pre("save", function (next) {
    if (this.reviews.length > 0) {
        this.averageRating = parseFloat(
            (this.reviews.reduce((sum, review) => sum + review.rating, 0) / this.reviews.length).toFixed(1)
        );
    } else {
        this.averageRating = 0;
    }
    next();
});

// Export the Project model
module.exports = mongoose.model("Project", ProjectSchema);
