const express = require('express');
const router = express.Router();
const { getBlogs, getBlogBySlug, createBlog } = require('../controllers/blogController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getBlogs);
router.get('/:slug', getBlogBySlug);
router.post('/', protect, createBlog); // Secure this route!

module.exports = router;
