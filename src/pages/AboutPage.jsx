import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import About from '../components/About';
import Footer from '../components/Footer';

const AboutPage = () => {
  // Global scroll reveal is handled in App.jsx

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '20px', minHeight: '80vh' }}>
        <About />
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
