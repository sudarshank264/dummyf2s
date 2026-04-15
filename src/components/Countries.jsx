import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { Link } from 'react-router-dom';

const Countries = () => {
  const { countries, loading } = useContext(DataContext);
  if (loading) return null;

  const displayCountries = countries || [];

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
          {displayCountries.map((country, idx) => (
            <Link to={`/countries/${country.slug}`} className="country-card" key={country._id || idx} style={{ textDecoration: 'none' }}>
              <div className="cc-header"><div className="cc-flag">{country.code}</div><div className="cc-arrow">↗</div></div>
              <div className="cc-name">{country.name}</div>
              <div className="cc-sub">{country.title}</div>
              <ul className="cc-features">
                {(country.shortPoints || []).map((feature, fIdx) => (
                  <li key={fIdx}>{feature}</li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Countries;