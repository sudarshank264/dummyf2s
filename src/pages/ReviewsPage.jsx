import React from 'react';
import Topbar from '../components/Topbar';
import Navbar from '../components/Navbar';
import Faq from '../components/Faq';
import Footer from '../components/Footer';
import { REVIEWS_DATA } from '../data';

const ReviewsPage = () => {
  return (
    <>
      <Topbar />
      <Navbar />
      
      {/* Expanded Reviews List rendered similar to Image 1's aesthetic */}
      <section style={{ backgroundColor: 'var(--white)', padding: '120px 0 60px' }}>
        <div className="section-inner">
          <h1 style={{ color: 'var(--black)', fontSize: '3rem', textAlign: 'center', marginBottom: '60px' }}>
            ALL CLIENT <span style={{ color: 'var(--red)' }}>REVIEWS</span>
          </h1>
          <div className="reviews-styled-grid" style={{ marginBottom: '80px' }}>
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
            
            {/* Adding duplicate reviews layout to simulate 'all reviews' page fullness */}
             {REVIEWS_DATA.map((review, idx) => (
              <div className="styled-review-card" key={`dup-${idx}`}>
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
        </div>
      </section>

      <Faq />
      <Footer />
    </>
  );
};

export default ReviewsPage;
