import React, { useState, useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { Link } from 'react-router-dom';

const Faq = () => {
  const [openIdx, setOpenIdx] = useState(null);
  const { content, loading } = useContext(DataContext);

  if (loading) return null;
  const displayFaqs = content?.faqs || [];

  const toggle = (idx) => {
    if (openIdx === idx) {
      setOpenIdx(null);
    } else {
      setOpenIdx(idx);
    }
  };

  return (
    <section className="faq-section" style={{ backgroundColor: 'var(--white)', padding: '60px 20px', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        {/* Red Call To Action Bar */}
        <div className="faq-cta-bar" style={{
          backgroundColor: 'var(--red)',
          borderRadius: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 20px',
          marginBottom: '10px',
          flexWrap: 'wrap',
          gap: ''
        }}>
          <div style={{ color: 'var(--white)', fontSize: '1.2rem', fontWeight: 500 }}>
            Want to turn your immigration dream into reality?
          </div>
          <Link to="/#contact" className="faq-cta-btn" style={{
            color: 'var(--white)',
            fontWeight: 700,
            textDecoration: 'none',
            fontSize: '1.1rem'
          }}>
            Book a call
          </Link>
        </div>

        <h2 style={{
          color: 'var(--black)',
          fontSize: 'clamp(2.5rem, 2vw, 3.5rem)',
          textAlign: 'center',
          marginBottom: '10px',
          fontWeight: 600,
          letterSpacing: '-1px'
        }}>
          Still have Questions In your mind?
        </h2>

        <div className="faq-list" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {displayFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`faq-item ${isOpen ? 'open' : ''}`}
                style={{
                  backgroundColor: 'var(--black)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => toggle(idx)}
              >
                <div style={{
                  padding: '10px 10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  color: 'var(--white)'
                }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, paddingRight: '20px' }}>
                    {faq.k}
                  </h3>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}>
                    ↑
                  </div>
                </div>
                <div style={{
                  padding: isOpen ? '0 30px 30px 30px' : '0 30px',
                  color: 'var(--white)',
                  maxHeight: isOpen ? '500px' : '0',
                  opacity: isOpen ? 1 : 0,
                  transition: 'all 0.4s ease',
                  lineHeight: 1.6,
                  fontSize: '0.95rem'
                }}>
                  {faq.v}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
};

export default Faq;
