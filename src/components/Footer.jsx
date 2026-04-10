import React from 'react';
import { FOOTER_LINKS_SERVICES, FOOTER_LINKS_QUICK, FOOTER_LINKS_CONTACT } from '../data';

const Footer = () => {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-topbar" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '20px', paddingBottom: '32px', marginBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', fontSize: '0.85rem' }}>
            <a href="tel:+919266896162" style={{ color: 'var(--red)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>📞 <span style={{ color: 'var(--white)', transition: 'color var(--transition)' }}>+91 926-689-6162</span></a>
            <a href="tel:+917042238065" style={{ color: 'var(--red)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>📞 <span style={{ color: 'var(--white)', transition: 'color var(--transition)' }}>+91 704-223-8065</span></a>
            <a href="tel:+919211517828" style={{ color: 'var(--red)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>📞 <span style={{ color: 'var(--white)', transition: 'color var(--transition)' }}>+91 921-151-7828</span></a>
          </div>
          <div style={{ fontSize: '0.85rem' }}>
            <a href="mailto:info@flight2sucessimmigration.com" style={{ color: 'var(--red)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>✉ <span style={{ color: 'var(--white)', transition: 'color var(--transition)' }}>info@flight2sucessimmigration.com</span></a>
          </div>
        </div>
        <div className="footer-grid">
          <div className="footer-brand">
            <img 
              src="/f2slogo.webp" 
              alt="Flight2Sucess Immigration" 
              style={{ height: '56px', width: 'auto' }}
            />
            <p>India's best Immigration and Visa Consultants based in South Delhi, providing reliable assistance to thousands of clients across the world.</p>
            <p className="brand-legal">Brand name of<br/>FLIGHT TO SUCESS IMMIGRATION LLP</p>
          </div>
          <div>
            <h4 className="footer-col-title">Services</h4>
            <ul className="footer-links">
              {FOOTER_LINKS_SERVICES.map((link, idx) => (
                <li key={idx}><a href={link.href}>{link.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links">
              {FOOTER_LINKS_QUICK.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noreferrer" : undefined}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="footer-col-title">Contact</h4>
            <ul className="footer-links">
              {FOOTER_LINKS_CONTACT.map((link, idx) => (
                <li key={idx}><a href={link.href}>{link.label}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <hr className="footer-divider" />
        <div className="footer-bottom">
          <p className="footer-copy">© 2025 FLIGHT TO SUCESS IMMIGRATION LLP. ALL RIGHTS RESERVED.</p>
          <div className="footer-legal">
            <a href="https://flight2sucessimmigration.com/antifraud.html" target="_blank" rel="noreferrer">Anti Fraud Policy</a>
            <a href="/#contact">Privacy Policy</a>
            <a href="/#contact">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;