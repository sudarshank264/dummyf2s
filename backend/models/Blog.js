const mongoose = require('mongoose');

// Schema for individual content blocks (intro, h3, p, etc)
const ContentBlockSchema = mongoose.Schema({
  type: {
    type: String,
    enum: ['intro', 'h3', 'p', 'image'],
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

const blogSchema = mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    thumb: {
      type: String,
      default: '📰',
    },
    tag: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    bannerImg: {
      type: String,
    },
    content: [ContentBlockSchema]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Blog', blogSchema);
