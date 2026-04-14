import React, { useContext, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Faq from '../components/Faq';
import Footer from '../components/Footer';
import { REVIEWS_DATA } from '../data';
import { DataContext } from '../context/DataContext';

const ReviewsPage = () => {
  const { reviews } = useContext(DataContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />

      <section style={{ backgroundColor: 'var(--white)', padding: '30px 0 15px', minHeight: '80vh' }}>
        <div className="section-inner">
          <h1 style={{ color: 'var(--black)', fontSize: '3rem', textAlign: 'center', marginBottom: '30px' }}>
            ALL CLIENT <span style={{ color: 'var(--red)' }}>REVIEWS</span>
          </h1>

          <div className="reviews-styled-grid" style={{ marginBottom: '80px' }}>
            {(reviews && reviews.length > 0 ? reviews : REVIEWS_DATA).map((review, idx) => {
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
                      <br />IMMIGRATION
                    </div>
                  </div>
                  {review.videoUrl && <div className="src-view-text">Watch Video</div>}
                </Wrapper>
              )
            })}
          </div>
        </div>
      </section>

      <Faq />
      <Footer />
    </>
  );
};

export default ReviewsPage;
