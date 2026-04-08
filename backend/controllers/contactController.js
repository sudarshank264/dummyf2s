const Lead = require('../models/Lead');

// @desc    Submit a new contact/lead form
// @route   POST /api/contact
// @access  Public
const submitLead = async (req, res) => {
  try {
    const { fullName, email, phone, serviceNeeded, destinationCountry, message } = req.body;

    if (!fullName || !email || !phone || !serviceNeeded) {
      return res.status(400).json({ message: 'Please add all required fields' });
    }

    const lead = await Lead.create({
      fullName,
      email,
      phone,
      serviceNeeded,
      destinationCountry,
      message,
    });

    res.status(201).json(lead);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error: Could not submit form' });
  }
};

// @desc    Get all leads
// @route   GET /api/contact
// @access  Private
const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find({}).sort({ createdAt: -1 });
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a lead
// @route   DELETE /api/contact/:id
// @access  Private
const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    await Lead.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id, message: 'Lead successfully deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  submitLead,
  getLeads,
  deleteLead,
};
