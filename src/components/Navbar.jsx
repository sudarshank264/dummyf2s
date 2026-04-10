import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '../data';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector('nav');
      if (nav) {
        nav.style.boxShadow = window.scrollY > 10 ? '0 4px 32px rgba(0,0,0,0.1)' : '0 2px 20px rgba(0,0,0,0.06)';
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <>
      <nav>
        <div className="nav-inner">
          <a href="/#home" className="logo">
            <img 
              src="/f2slogo.webp" 
              alt="Flight2Sucess Immigration"
            />
          </a>
          <ul className="nav-links">
            {NAV_LINKS.map((link, idx) => (
              <li key={idx}><a href={link.href}>{link.label}</a></li>
            ))}
            <li><a href="/#contact" className="nav-cta">Book a Call</a></li>
          </ul>
          <div className="hamburger" id="hamburger" onClick={() => setMobileMenuOpen(true)}>
            <span></span><span></span><span></span>
          </div>
        </div>
      </nav>

      <div className={`drawer-overlay ${mobileMenuOpen ? 'open' : ''}`} onClick={closeMobile}></div>
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`} id="mobileMenu">
        <button className="drawer-close" id="mobileClose" onClick={closeMobile}>✕</button>
        
        <div className="drawer-header" style={{ justifyContent: 'flex-start' }}>
          <a href="/#home" onClick={closeMobile} style={{ display: 'inline-block' }}>
            <img 
              src="/f2slogo.webp" 
              alt="Flight2Sucess Immigration"
              style={{ height: '42px', width: 'auto' }}
            />
          </a>
        </div>
        
        <div className="drawer-divider"><span>Explore F2S</span></div>
        
        <div className="drawer-links">
          {NAV_LINKS.map((link, idx) => {
            const icons = { 'Home': '🏠', 'Services': '⚙️', 'About': '🏢', 'Countries': '🌍', 'Reviews': '⭐', 'Blogs': '📰' };
            return (
              <a key={idx} href={link.href} onClick={closeMobile} className="drawer-item">
                <span className="drawer-icon">{icons[link.label] || '🔗'}</span>
                <span className="drawer-label">{link.label}</span>
              </a>
            );
          })}
        </div>

        <div className="drawer-links" style={{ paddingBottom: '30px', marginTop: 'auto' }}>
          <a href="/#contact" onClick={closeMobile} className="drawer-item" style={{ marginTop: '10px' }}>
            <span className="drawer-label" style={{ color: 'var(--red)', fontWeight: 'bold' }}>BOOK A CALL →</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;