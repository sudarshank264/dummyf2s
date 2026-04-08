const mongoose = require('mongoose');

const leadSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Please add a full name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email address'],
    },
    phone: {
      type: String,
      required: [true, 'Please add a phone number'],
    },
    serviceNeeded: {
      type: String,
      required: [true, 'Please select a service'],
    },
    destinationCountry: {
      type: String,
    },
    message: {
      type: String,
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Closed'],
      default: 'New',
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Lead', leadSchema);
