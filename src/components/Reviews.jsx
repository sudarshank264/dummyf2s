import React from 'react';
import { Link } from 'react-router-dom';
import { REVIEWS_DATA } from '../data';

const Reviews = () => {
  return (
    <section className="section" style={{ backgroundColor: 'var(--white)' }} id="reviews">
      <div className="section-inner">
        <div style={{ marginBottom: '40px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h2 className="section-title" style={{ color: 'var(--red)', fontSize: '2.5rem', margin: 0 }}>Reviews</h2>
          <p className="section-desc" style={{ color: "var(--grey)", maxWidth: '100%', fontSize: '0.9rem', marginTop: '4px' }}>
            Hear it from our clients. See How We Empowered Clients to Reach Their Immigration Goals
          </p>
        </div>
        
        <div className="reviews-styled-grid reveal">
          {REVIEWS_DATA.map((review, idx) => (
            <div className="styled-review-card" key={idx}>
              <div className="src-header">
                <div className="src-contact">
                  <div>📞 +91 926-689-6162 | +91 704-223-8065</div>
                  <div>🌐 www.flight2sucessimmigration.com</div>
                </div>
                <div className="src-logo-sm">F2S</div>
              </div>
              <div className="src-visual-wrap">
                <img src={review.img} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} alt="Client Review" />
                <div className="src-brand-overlay">
                   <span>FLIGHT2SUCESS</span>
                   <br/>IMMIGRATION
                </div>
              </div>
              <div className="src-view-text">View Video</div>
            </div>
          ))}
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link to="/reviews" className="btn-primary">View All Reviews</Link>
        </div>
      </div>
    </section>
  );
};

export default Reviews;