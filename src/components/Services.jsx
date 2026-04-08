import React from 'react';
import { SERVICES_DATA } from '../data';

const Services = () => {
  return (
    <section className="section services-bg" id="services">
      <div className="section-inner">
        <div className="services-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <span className="section-tag">What We Do</span>
            <h2 className="section-title" style={{ color: 'var(--black)' }}>OUR<br/><span style={{ WebkitTextStroke: '1.5px rgba(27, 18, 18, 0.12)', color: 'transparent' }}>SERVICES</span></h2>
          </div>
          <p style={{ color: 'var(--grey)', fontSize: '0.9rem', lineHeight: 1.75, maxWidth: '360px' }}>
            We leverage our expertise and established relationships to expedite your application, ensuring a quicker path to your new home. Don't just immigrate, thrive! We can help connect you with potential employers and navigate the job market in your chosen country. Whether you're seeking an education visa, a travel visa, a job seeker visa, a work visa, or more, we have the knowledge and experience to guide you towards the right option.
          </p>
        </div>
        
        <div className="services-grid reveal">
          {SERVICES_DATA.map((service, idx) => (
            <div className="service-card" key={idx}>
              <div className="service-num">{service.id}</div>
              <div className="service-icon-wrap">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;