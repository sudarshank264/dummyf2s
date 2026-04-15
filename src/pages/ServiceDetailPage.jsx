import React, { useEffect, useState, useContext } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { DataContext } from '../context/DataContext';

const ServiceDetailPage = () => {
  const { id } = useParams();
  const { services, loading: contextLoading } = useContext(DataContext);
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (contextLoading) return;

    let found = null;
    if (services && services.length > 0) {
      found = services.find((s) => String(s._id) === id || String(s.id) === id || s.title.toLowerCase().replace(/[\s\W-]+/g, '-') === id);
    }

    setService(found === undefined ? false : found);
    setLoading(false);
  }, [id, services, contextLoading]);

  if (loading) {
    return <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</main>;
  }

  if (service === false) {
    return <Navigate to="/services" />;
  }

  if (!service) {
    return null;
  }

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
              Service Details
            </span>
            <div style={{
              fontSize: '4rem',
              lineHeight: 1,
              marginBottom: '10px'
            }}>
              {service.iconUrl ? (
                  <img src={service.iconUrl} alt={service.title} style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
                ) : (
                  service.icon || '✨'
              )}
            </div>
            <h1 style={{
              fontFamily: 'var(--ff-display)',
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              color: 'var(--white)',
              lineHeight: 1.1,
              letterSpacing: '1px',
              marginBottom: '20px',
              maxWidth: '800px',
              margin: '0 auto 20px'
            }}>
              {service.title}
            </h1>
            <p style={{
              fontSize: '1.05rem',
              color: 'var(--grey-light)',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.6
            }}>
              {service.desc}
            </p>
          </div>
        </section>

        {/* DETAILS SECTION */}
        <div className="section-inner" style={{ marginTop: '40px', maxWidth: '800px' }}>
          
          <h2 style={{
            fontFamily: 'var(--ff-display)',
            fontSize: '2rem',
            color: 'var(--red)',
            marginBottom: '16px',
            letterSpacing: '0.5px'
          }}>
            About This Service
          </h2>
          <p style={{
            fontSize: '1rem',
            color: 'var(--charcoal)',
            marginBottom: '40px',
            lineHeight: 1.8
          }}>
            {service.fullDesc || service.description || service.desc}
          </p>
          
          {(service.features && service.features.length > 0) && (
            <>
              <h2 style={{
                fontFamily: 'var(--ff-display)',
                fontSize: '2rem',
                color: 'var(--red)',
                marginBottom: '16px',
                letterSpacing: '0.5px'
              }}>
                Key Features
              </h2>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 50px 0',
                display: 'grid',
                gap: '16px'
              }}>
                {service.features.map((feat, idx) => (
                  <li key={idx} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    fontSize: '1rem',
                    color: 'var(--charcoal)',
                    background: 'var(--off-white)',
                    padding: '16px 20px',
                    borderRadius: 'var(--radius)',
                    borderLeft: '4px solid var(--red)'
                  }}>
                    <span style={{ color: 'var(--red)' }}>✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* CTA Box */}
          <div style={{
            background: 'var(--light-grey)',
            padding: '40px',
            borderRadius: 'var(--radius-lg)',
            textAlign: 'center',
            boxShadow: 'var(--shadow)'
          }}>
            <h3 style={{
              fontFamily: 'var(--ff-display)',
              fontSize: '2rem',
              color: 'var(--black)',
              marginBottom: '10px'
            }}>Ready to Get Started?</h3>
            <p style={{ color: 'var(--grey)', marginBottom: '24px' }}>
              Let our experts handle the hassle. Contact us today for a free consultation.
            </p>
            <Link to="/contact" className="btn-primary">
              Contact Us Now
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ServiceDetailPage;
