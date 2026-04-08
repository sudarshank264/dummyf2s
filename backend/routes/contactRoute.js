const express = require('express');
const router = express.Router();
const { submitLead, getLeads, deleteLead } = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', submitLead);
router.get('/', protect, getLeads); // Secure this route!
router.delete('/:id', protect, deleteLead); // High security restrict

module.exports = router;
