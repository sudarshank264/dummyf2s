import React from 'react';
import { FOOTER_LINKS_SERVICES, FOOTER_LINKS_QUICK, FOOTER_LINKS_CONTACT } from '../data';

const Footer = () => {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <img 
              src="f2slogo.webp" 
              alt="Flight2Sucess Immigration" 
              style={{ height: '40px', width: 'auto', filter: 'brightness(0) invert(1)' }}
              onError={(e) => {
                e.target.outerHTML = "<div style='font-family:var(--ff-display);font-size:1.4rem;color:var(--white);letter-spacing:1px;'>FLIGHT2SUCESS</div>";
              }} 
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