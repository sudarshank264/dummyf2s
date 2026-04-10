import React from 'react';
import Navbar from '../components/Navbar';
import Countries from '../components/Countries';
import Footer from '../components/Footer';

const CountriesPage = () => {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '20px', minHeight: '80vh' }}>
        <Countries />
      </div>
      <Footer />
    </>
  );
};

export default CountriesPage;
