import React, { useState, useContext } from 'react';
import { CONTACT_INFO } from '../data';
import { DataContext } from '../context/DataContext';

const Contact = () => {
  const { content } = useContext(DataContext);
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    phone: '',
    service: '',
    country: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fname || !formData.email || !formData.phone || !formData.service) {
      setErrorMsg('Please fill in all required fields (Name, Email, Phone, Service).');
      setStatus('error');
      return;
    }
    
    setStatus('loading');
    
    try {
      const response = await fetch('http://localhost:5001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: `${formData.fname} ${formData.lname}`.trim(),
          email: formData.email,
          phone: formData.phone,
          serviceNeeded: formData.service,
          destinationCountry: formData.country,
          message: formData.message
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ fname: '', lname: '', email: '', phone: '', service: '', country: '', message: '' });
      } else {
        const data = await response.json();
        setErrorMsg(data.message || 'Server rejected the request.');
        setStatus('error');
      }
    } catch (error) {
      setErrorMsg('Failed to connect to the server. Please try again later.');
      setStatus('error');
    }
  };

  return (
    <section className="section contact-bg" id="contact">
      <div className="section-inner">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="section-tag">Get in Touch</span>
          <h2 className="section-title">LET'S MAKE YOUR<br/>DREAM A <span className="accent">REALITY</span></h2>
          <p className="section-desc" style={{ margin: '14px auto 0', textAlign: 'center' }}>Book a call and let's get started. Make the first move toward your global future.</p>
        </div>
        <div className="contact-grid reveal">
          <div className="contact-info">
            {CONTACT_INFO.map((info, idx) => {
              let dynamicLines = info.lines;
              if (content) {
                if (info.label === 'Our Office' && content.address) dynamicLines = [content.address];
                if (info.label === 'Phone Numbers' && content.contactPhone) dynamicLines = [content.contactPhone];
                if (info.label === 'Email Address' && content.contactEmail) dynamicLines = [content.contactEmail];
              }
              return (
              <div className="contact-item" key={idx}>
                <div className="ci-icon">{info.icon}</div>
                <div>
                  <div className="ci-label">{info.label}</div>
                  <div className="ci-value">
                    {dynamicLines.map((line, lIdx) => (
                      <React.Fragment key={lIdx}>
                        {info.isLink ? (
                          <a href={`${info.linkPrefix}${line.replace(/ /g, '').replace(/-/g, '')}`}>{line}</a>
                        ) : (
                          line
                        )}
                        {lIdx < dynamicLines.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            )})}
          </div>
          
          <div className="contact-form">
            <h3 className="form-title">BOOK A FREE CONSULTATION</h3>
            
            {status === 'success' ? (
              <div style={{ padding: '30px', background: 'rgba(0,255,100,0.1)', border: '1px solid rgba(0,255,100,0.3)', borderRadius: 'var(--radius)', textAlign: 'center', marginBottom: '20px' }}>
                <h4 style={{ color: '#00ff64', fontSize: '1.2rem', marginBottom: '10px' }}>✅ Successfully Submitted!</h4>
                <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Thank you. Our immigration experts will review your details and contact you shortly.</p>
                <button type="button" className="btn-primary" style={{ marginTop: '20px', padding: '10px 20px' }} onClick={() => setStatus('idle')}>Book Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {status === 'error' && (
                  <div style={{ padding: '12px', background: 'rgba(255,0,0,0.1)', border: '1px solid rgba(255,0,0,0.3)', borderRadius: '8px', marginBottom: '20px', color: '#ff4444', fontSize: '0.85rem' }}>
                    ⚠️ {errorMsg}
                  </div>
                )}
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="fname">First Name *</label>
                    <input type="text" id="fname" placeholder="Your first name" value={formData.fname} onChange={handleChange} required disabled={status === 'loading'} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lname">Last Name</label>
                    <input type="text" id="lname" placeholder="Your last name" value={formData.lname} onChange={handleChange} disabled={status === 'loading'} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input type="email" id="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} required disabled={status === 'loading'} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input type="tel" id="phone" placeholder="+91 XXXXX XXXXX" value={formData.phone} onChange={handleChange} required disabled={status === 'loading'} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="service">Service Interested In *</label>
                  <select id="service" value={formData.service} onChange={handleChange} required disabled={status === 'loading'}>
                    <option value="" disabled>Select a service</option>
                    <option>Smooth Immigration</option>
                    <option>Job Assistance Support</option>
                    <option>Study Abroad</option>
                    <option>Travel Visa</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="country">Destination Country</label>
                  <select id="country" value={formData.country} onChange={handleChange} disabled={status === 'loading'}>
                    <option value="" disabled>Select a country</option>
                    <option>Canada</option>
                    <option>Germany</option>
                    <option>Sweden</option>
                    <option>Austria</option>
                    <option>Portugal</option>
                    <option>UAE</option>
                    <option>Finland</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea id="message" placeholder="Tell us about your immigration goals..." value={formData.message} onChange={handleChange} disabled={status === 'loading'}></textarea>
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.88rem', padding: '16px', opacity: status === 'loading' ? 0.7 : 1 }} disabled={status === 'loading'}>
                  {status === 'loading' ? '⌛ SUBMITTING...' : '📅 BOOK MY FREE CONSULTATION'}
                </button>
                <p style={{ fontFamily: 'var(--ff-mono)', fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', textAlign: 'center', marginTop: '14px', letterSpacing: '0.04em' }}>
                  BY SUBMITTING, YOU AGREE TO BE CONTACTED BY OUR IMMIGRATION EXPERTS.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;