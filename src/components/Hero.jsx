import React from 'react';
import { HERO_STATS } from '../data';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-red-bar"></div>
      <div className="hero-inner">
        <div className="hero-content">
          <div className="hero-eyebrow fade-up">India's Trusted Immigration Experts</div>
          <h1 className="fade-up d1">
            GET THE
            <span className="accent">BEST VISA</span>
            <span className="outline">SERVICE</span>
          </h1>
          <p className="hero-desc fade-up d2">
            Embark on your international aspirations with confidence. We navigate the complexities of immigration, education, career, and travel — your one-stop shop for global success.
          </p>
          <div className="hero-actions fade-up d3">
            <a href="/#contact" className="btn-primary">📅 Book a Free Call</a>
            <a href="/#reviews" className="btn-outline">⭐ Client Reviews</a>
          </div>
          <div className="hero-stats fade-up d4">
            {HERO_STATS.map((stat, idx) => (
              <div className="stat" key={idx}>
                <div className="stat-num">{stat.num}<span>{stat.append}</span></div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card-stack">
            <div className="floating-badge">
              <div className="dot"></div>
              Visa Approved ✓
            </div>
            <div className="flight-card">
              <div className="card-route">
                <div>
                  <div className="card-city">DEL</div>
                  <div className="card-code">New Delhi, IN</div>
                </div>
                <div className="card-arrow">✈</div>
                <div style={{ textAlign: 'right' }}>
                  <div className="card-city">YYZ</div>
                  <div className="card-code">Toronto, CA</div>
                </div>
              </div>
              <hr className="card-divider" />
              <div className="card-info-row">
                <div><div className="card-info-label">Applicant</div><div className="card-info-value">Rahul Sharma</div></div>
                <div><div className="card-info-label">Visa Type</div><div className="card-info-value">PR — Canada</div></div>
                <div className="card-badge approved">APPROVED</div>
              </div>
              <hr className="card-divider" />
              <div className="card-info-row">
                <div><div className="card-info-label">Processed by</div><div className="card-info-value" style={{ fontSize: '0.76rem' }}>Flight2Sucess Immigration</div></div>
                <div className="card-badge" style={{ background: 'var(--off-white)', color: 'var(--grey)', border: '1px solid var(--border)' }}>f2s.in</div>
              </div>
            </div>
            <div className="card-2">
              <div className="card-2-inner">
                <div>
                  <div className="card-2-title">Total Visas Processed</div>
                  <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', marginTop: '2px' }}>Since 2014</div>
                </div>
                <div className="card-2-value">5000+</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;