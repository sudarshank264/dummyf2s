const Review = require('../models/Review');

// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Public
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ isActive: true }).sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error: Could not fetch reviews' });
  }
};

// @desc    Create a new review
// @route   POST /api/reviews
// @access  Private (Admin only)
const createReview = async (req, res) => {
  try {
    const { videoUrl, img } = req.body;
    if (!img) {
      return res.status(400).json({ message: 'Review thumbnail image is required' });
    }

    const review = await Review.create(req.body);
    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error: Could not create review' });
  }
};

module.exports = {
  getReviews,
  createReview
};
