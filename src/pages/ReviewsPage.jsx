import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Faq from '../components/Faq';
import Footer from '../components/Footer';
import { REVIEWS_DATA } from '../data';

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchReviews = async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 800); // 800ms fast fail!
      try {
        const res = await fetch('http://localhost:5001/api/reviews', { signal: controller.signal });
        clearTimeout(timeoutId);
        if (res.ok) {
          const data = await res.json();
          const activeOnly = data.filter(r => r.isActive);
          setReviews(activeOnly.length > 0 ? activeOnly : REVIEWS_DATA);
        } else {
          setReviews(REVIEWS_DATA);
        }
      } catch (err) {
        clearTimeout(timeoutId);
        console.error('API Error, falling back to static reviews');
        setReviews(REVIEWS_DATA);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  return (
    <>
      <Navbar />
      
      <section style={{ backgroundColor: 'var(--white)', padding: '120px 0 60px', minHeight: '80vh' }}>
        <div className="section-inner">
          <h1 style={{ color: 'var(--black)', fontSize: '3rem', textAlign: 'center', marginBottom: '60px' }}>
            ALL CLIENT <span style={{ color: 'var(--red)' }}>REVIEWS</span>
          </h1>
          
          {loading ? (
             <div style={{ textAlign: 'center' }}>Loading reviews...</div>
          ) : (
            <div className="reviews-styled-grid" style={{ marginBottom: '80px' }}>
              {reviews.map((review, idx) => {
                const Wrapper = review.videoUrl ? 'a' : 'div';
                const wrapperProps = review.videoUrl ? { href: review.videoUrl, target: '_blank', rel: 'noreferrer' } : {};
                
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
                      <img src={review.img} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} alt="Client Review" />
                      <div className="src-brand-overlay">
                         <span>FLIGHT2SUCESS</span>
                         <br/>IMMIGRATION
                      </div>
                    </div>
                    {review.videoUrl && <div className="src-view-text">Watch Video</div>}
                  </Wrapper>
                )
              })}
            </div>
          )}
        </div>
      </section>

      <Faq />
      <Footer />
    </>
  );
};

export default ReviewsPage;
