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
              src="f2slogo.webp" 
              alt="Flight2Sucess Immigration"
              onError={(e) => { 
                e.target.style.display = 'none'; 
                document.getElementById('logo-fb').style.display = 'flex'; 
              }} 
            />
            <div className="logo-fallback" id="logo-fb" style={{ display: 'none' }}>
              <div className="logo-mark">F2S</div>
              <div>
                <div className="logo-text">FLIGHT2SUCESS</div>
                <span className="logo-sub">Immigration Consultants</span>
              </div>
            </div>
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

      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`} id="mobileMenu">
        <button className="mobile-close" id="mobileClose" onClick={closeMobile}>✕</button>
        {NAV_LINKS.map((link, idx) => (
          <a key={idx} href={link.href} onClick={closeMobile}>{link.label.toUpperCase()}</a>
        ))}
        <a href="/#contact" onClick={closeMobile} style={{ color: 'var(--red)' }}>BOOK A CALL →</a>
      </div>
    </>
  );
};

export default Navbar;