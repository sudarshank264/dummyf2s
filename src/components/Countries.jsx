import React from 'react';
import { COUNTRIES_DATA } from '../data';

const Countries = () => {
  return (
    <section className="section countries-bg" id="countries">
      <div className="section-inner">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <span className="section-tag">Destinations</span>
            <h2 className="section-title">COUNTRY<br /><span className="outline">VISA GUIDES</span></h2>
          </div>
          <p className="section-desc" style={{ maxWidth: '340px' }}>
            Discover a comprehensive visa process guide for different countries on our website. Simplify your visa application journey with expert tips and valuable insights.
          </p>
        </div>
        <div className="countries-grid reveal">
          {COUNTRIES_DATA.map((country, idx) => (
            <a href={country.url} className="country-card" target="_blank" rel="noreferrer" key={idx}>
              <div className="cc-header"><div className="cc-flag">{country.flag}</div><div className="cc-arrow">↗</div></div>
              <div className="cc-name">{country.name}</div>
              <div className="cc-sub">{country.sub}</div>
              <ul className="cc-features">
                {country.features.map((feature, fIdx) => (
                  <li key={fIdx}>{feature}</li>
                ))}
              </ul>
            </a>
          ))}
          <div className="cc-more">
            <div className="cc-more-icon">🌐</div>
            <div className="cc-more-title">MORE COUNTRIES</div>
            <div className="cc-more-sub">Canada, Finland & many more</div>
            <a target="_blank" rel="noreferrer" className="btn-primary" style={{ fontSize: '0.76rem', padding: '10px 22px' }}>Explore All →</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Countries;