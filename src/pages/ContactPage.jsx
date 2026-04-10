import React from 'react';
import Navbar from '../components/Navbar';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const ContactPage = () => {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '20px', minHeight: '80vh' }}>
        <Contact />
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
