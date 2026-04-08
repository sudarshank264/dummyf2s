import React, { useState } from 'react';
import { FAQ_DATA } from '../data';
import { Link } from 'react-router-dom';

const Faq = () => {
  const [openIdx, setOpenIdx] = useState(null);

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
          borderRadius: '50px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '20px 40px',
          marginBottom: '80px',
          flexWrap: 'wrap',
          gap: '20px'
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
          color: 'var(--red)', 
          fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', 
          textAlign: 'center', 
          marginBottom: '60px',
          fontWeight: 600,
          letterSpacing: '-1px'
        }}>
          Still have Questions In your mind?
        </h2>

        <div className="faq-list" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {FAQ_DATA.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx} 
                className={`faq-item ${isOpen ? 'open' : ''}`}
                style={{
                  backgroundColor: 'var(--red)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => toggle(idx)}
              >
                <div style={{ 
                  padding: '24px 30px', 
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
