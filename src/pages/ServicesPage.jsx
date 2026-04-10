import React from 'react';
import Navbar from '../components/Navbar';
import Services from '../components/Services';
import Footer from '../components/Footer';

const ServicesPage = () => {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '20px', minHeight: '80vh' }}>
        <Services />
      </div>
      <Footer />
    </>
  );
};

export default ServicesPage;
