import React, { useState, useEffect } from 'react';

const PopupForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+1',
    phone: '',
    isWhatsApp: false,
    termsAccepted: false,
  });

  const countryCodes = [
    { code: '+1', label: 'US/CA (+1)' },
    { code: '+44', label: 'UK (+44)' },
    { code: '+91', label: 'IN (+91)' },
    { code: '+971', label: 'UAE (+971)' },
    { code: '+61', label: 'AU (+61)' },
  ];

  useEffect(() => {
    // Check if user has already dismissed or submitted the popup
    const dismissed = localStorage.getItem('popupDismissed');
    
    // Force show in local development mode using import.meta.env.DEV
    if (!dismissed || import.meta.env.DEV) {
      // Small delay to allow the page to render first before showing the popup
      const timer = setTimeout(() => {
        setIsVisible(true);
        document.body.style.overflow = 'hidden'; // block scrolling
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setIsVisible(false);
    localStorage.setItem('popupDismissed', 'true');
    document.body.style.overflow = 'auto'; // allow scrolling
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.termsAccepted) {
      setStatus({ type: 'error', message: 'You must accept the Terms & Conditions.' });
      return;
    }

    if (!formData.firstName || !formData.email || !formData.phone) {
      setStatus({ type: 'error', message: 'Please fill out all required fields.' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: `${formData.countryCode} ${formData.phone}`,
        isWhatsApp: formData.isWhatsApp,
      };

      const response = await fetch('http://localhost:5001/api/contact/popup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      
      setStatus({ type: 'success', message: 'Thank you! We will get in touch shortly.' });
      
      setTimeout(() => {
        closePopup();
      }, 2000);
    } catch (error) {
      console.error(error);
      setStatus({ type: 'error', message: 'There was an issue submitting your request. Please try again later.' });
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="popup-close-btn" onClick={closePopup} aria-label="Close">
          &times;
        </button>
        <div className="popup-header">
          <h2>Welcome to Flights2Success!</h2>
          <p>Get started on your immigration journey by sharing a few details with us.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="popup-form">
          <div className="form-group flex-group">
            <div className="input-wrap">
              <label htmlFor="firstName">First Name *</label>
              <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="John" />
            </div>
            <div className="input-wrap">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john.doe@example.com" />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <div className="phone-input-wrap">
              <select name="countryCode" value={formData.countryCode} onChange={handleChange} className="country-code-select">
                {countryCodes.map((c) => (
                  <option key={c.code} value={c.code}>{c.label}</option>
                ))}
              </select>
              <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required placeholder="1234567890" />
            </div>
          </div>

          <div className="form-checkbox-group">
            <label className="checkbox-label">
              <input type="checkbox" name="isWhatsApp" checked={formData.isWhatsApp} onChange={handleChange} />
              Use as WhatsApp number
            </label>
          </div>

          <div className="form-checkbox-group">
            <label className="checkbox-label">
              <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} required />
              I agree to the Terms & Conditions
            </label>
          </div>

          {status.message && (
            <div className={`popup-status ${status.type}`}>
              {status.message}
            </div>
          )}

          <div className="form-actions">
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Get Started'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
