import React, { useEffect, useState, useContext } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { DataContext } from '../context/DataContext';

const CountryDetailPage = () => {
  const { slug } = useParams();
  const { countries, loading: contextLoading } = useContext(DataContext);
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (contextLoading) return;

    if (countries && countries.length > 0) {
      const found = countries.find((c) => String(c.slug) === slug || String(c._id) === slug);
      setCountry(found === undefined ? false : found);
    } else {
      setCountry(false);
    }
    setLoading(false);
  }, [slug, countries, contextLoading]);

  if (loading || contextLoading) {
    return <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Country Guide...</main>;
  }

  if (country === false) {
    return <Navigate to="/#countries" />;
  }

  if (!country) return null;

  return (
    <>
      <Navbar />
      
      <main style={{ backgroundColor: 'var(--white)', minHeight: '80vh', paddingBottom: '60px' }}>
        {/* HERO SECTION */}
        <section style={{
          backgroundColor: 'var(--black)',
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          padding: '80px 20px 60px',
          textAlign: 'center',
          color: 'var(--white)'
        }}>
          <div className="section-inner">
            <span style={{ 
              display: 'inline-block',
              background: 'rgba(232, 0, 13, 0.2)',
              color: 'var(--red)',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '20px'
            }}>
              {country.code} • Visa Guide
            </span>
            <h1 style={{
              fontFamily: 'var(--ff-display)',
              fontSize: 'clamp(3.5rem, 8vw, 5.5rem)',
              color: 'var(--white)',
              lineHeight: 1,
              letterSpacing: '2px',
              marginBottom: '10px',
            }}>
              {country.name}
            </h1>
            <h2 style={{
              fontFamily: 'var(--ff-mono)',
              fontSize: '1rem',
              color: 'var(--grey-light)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase'
            }}>
              {country.title}
            </h2>
          </div>
        </section>

        {/* DETAILS SECTION */}
        <div className="section-inner" style={{ marginTop: '50px', maxWidth: '850px' }}>
          
          {country.fullDescription && (
             <div style={{ marginBottom: '50px' }}>
               <h3 style={{
                 fontFamily: 'var(--ff-display)',
                 fontSize: '2rem',
                 color: 'var(--red)',
                 marginBottom: '16px',
                 letterSpacing: '0.5px'
               }}>
                 Overview
               </h3>
               <p style={{
                 fontSize: '1.05rem',
                 color: 'var(--charcoal)',
                 lineHeight: 1.8
               }}>
                 {country.fullDescription}
               </p>
             </div>
          )}

          {(country.sections || []).map((sec, idx) => (
             <div key={idx} style={{ marginBottom: '40px' }}>
               <h3 style={{
                 fontFamily: 'var(--ff-display)',
                 fontSize: '1.8rem',
                 color: 'var(--black)',
                 marginBottom: '16px',
                 borderBottom: '2px solid var(--light-grey)',
                 paddingBottom: '10px'
               }}>
                 {sec.heading}
               </h3>
               <div style={{
                 fontSize: '1rem',
                 color: 'var(--grey)',
                 lineHeight: 1.7,
                 whiteSpace: 'pre-wrap'
               }}>
                 {sec.content}
               </div>
             </div>
          ))}

          {/* CTA Box */}
          <div style={{
            background: 'var(--off-white)',
            border: '1px solid var(--border)',
            padding: '40px',
            borderRadius: 'var(--radius-lg)',
            textAlign: 'center',
            marginTop: '60px',
            boxShadow: 'var(--shadow)'
          }}>
            <h3 style={{
              fontFamily: 'var(--ff-display)',
              fontSize: '2.2rem',
              color: 'var(--black)',
              marginBottom: '10px'
            }}>Start Your {country.name} Journey</h3>
            <p style={{ color: 'var(--grey)', marginBottom: '24px' }}>
              Connect with our experts and secure your visa successfully.
            </p>
            <Link to="/contact" className="btn-primary">
              Book a Consultation
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default CountryDetailPage;
