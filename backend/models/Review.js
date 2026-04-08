const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
  {
    videoUrl: {
      type: String, // Link to an external video platform or raw mp4
    },
    img: {
      type: String, // Thumbnail representing the review
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Review', reviewSchema);
