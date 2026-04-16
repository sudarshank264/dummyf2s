import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../context/DataContext';

const Reviews = () => {
  const { reviews, loading } = useContext(DataContext);
  if (loading) return null;

  const displayReviews = reviews ? reviews.slice(0, 4) : [];

  return (
    <section className="section" id="reviews">
      <div className="section-inner">
        <div style={{ marginBottom: '40px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span className="section-tag">Client Reviews</span>
          <h2 className="section-title">OUR<br/><span className="outline">REVIEWS</span></h2>
          <p className="section-desc" style={{ color: "var(--grey)", maxWidth: '100%', fontSize: '0.9rem', marginTop: '4px' }}>
            Hear it from our clients. See How We Empowered Clients to Reach Their Immigration Goals
          </p>
        </div>
        
        <div className="reviews-styled-grid reveal">
          {displayReviews.map((review, idx) => {
            const Wrapper = review.videoUrl ? 'a' : 'div';
            const wrapperProps = review.videoUrl ? { href: review.videoUrl, target: '_blank', rel: 'noreferrer' } : {};
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
            
            return (
            <Wrapper {...wrapperProps} className="styled-review-card" key={idx}>
              <div className="src-header">
                <div className="src-contact">
                  <div>📞 +91 926-689-6162 | +91 704-223-8065</div>
                  <div>🌐 www.flight2sucessimmigration.com</div>
                </div>
                <div className="src-logo-sm">F2S</div>
              </div>
              <div className="src-visual-wrap">
                <img 
                  src={(review.image || review.img) && (review.image || review.img).startsWith('http') ? (review.image || review.img) : `${API_URL}${review.image || review.img}`} 
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} 
                  alt="Client Review" 
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }} 
                />
                <div className="src-brand-overlay">
                   <span>FLIGHT2SUCESS</span>
                   <br/>IMMIGRATION
                </div>
              </div>
              {review.videoUrl && <div className="src-view-text">Watch Video</div>}
            </Wrapper>
            );
          })}
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link to="/reviews" className="btn-primary">View All Reviews</Link>
        </div>
      </div>
    </section>
  );
};

export default Reviews;