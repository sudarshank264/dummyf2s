import React from 'react';
import { ABOUT_STATS, MISSION_VISION } from '../data';

const About = () => {
  return (
    <section className="section about-bg" id="about">
      <div className="section-inner">
        <div className="about-grid">
          <div className="about-left reveal">
            <div className="about-visual">
              <div className="about-big-num">F2S</div>
              <div className="about-plane">✈️</div>
              <div className="about-grid-stats">
                {ABOUT_STATS.map((stat, idx) => (
                  <div className="astat" key={idx}>
                    <div className="astat-num">{stat.num}</div>
                    <div className="astat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="about-badge">
              <div className="ab-num">10+</div>
              <div className="ab-label">Years of<br/>Excellence</div>
            </div>
          </div>
          <div className="reveal">
            <span className="section-tag">Who We Are</span>
            <h2 className="section-title">ABOUT<br/><span className="outline">FLIGHT2SUCESS</span></h2>
            <p style={{ color: 'var(--grey)', marginTop: '20px', lineHeight: 1.85, fontSize: '0.93rem' }}>
              Flight2Sucess Immigration is your trusted partner in navigating the complexities of global mobility. Specializing in a wide range of visas including Travel, PR, Student, Job Seeker, Work Permit, Family, and more, we're dedicated to turning your dreams of living and working abroad into reality.
            </p>
            <p style={{ color: 'var(--grey)', marginTop: '12px', lineHeight: 1.85, fontSize: '0.93rem' }}>
              With expert guidance and personalized service, we streamline the immigration process, ensuring smooth transitions for individuals and families alike. Our commitment to excellence, integrity, and customer satisfaction sets us apart as leaders in the industry.
            </p>
            <p style={{ color: 'var(--grey)', marginTop: '12px', lineHeight: 1.85, fontSize: '0.93rem' }}>
              Whether you're seeking new opportunities, reuniting with loved ones, or pursuing educational goals, let Flight2Sucess Immigration be your wings to success.<strong style={{ color: 'var(--black)' }}><br/>FLIGHT TO SUCESS IMMIGRATION LLP</strong>.
            </p>
            <div className="mv-list">
              {MISSION_VISION.map((item, idx) => (
                <div className="mv-item" key={idx}>
                  <div className="mv-icon">{item.icon}</div>
                  <div>
                    <div className="mv-title">{item.title}</div>
                    <p className="mv-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;