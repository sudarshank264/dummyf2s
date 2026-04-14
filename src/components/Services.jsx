import React, { useContext } from 'react';
import { SERVICES_DATA } from '../data';
import { DataContext } from '../context/DataContext';

const Services = () => {
  const { services } = useContext(DataContext);
  const displayServices = services && services.length > 0 ? services : SERVICES_DATA;
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
          {displayServices.map((service, idx) => (
            <div className="service-card" key={idx}>
              <div className="service-num">{service.id || String(idx + 1).padStart(2, '0')}</div>
              <div className="service-icon-wrap">
                {service.iconUrl ? (
                  <img src={service.iconUrl} alt={service.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                ) : (
                  service.icon || '✨'
                )}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.description || service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;