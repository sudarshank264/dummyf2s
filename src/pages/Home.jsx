import React from 'react';
import Topbar from "../components/Topbar";
import Navbar from "../components/Navbar";
import Ticker from '../components/Ticker';
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Countries from "../components/Countries";
import CtaBanner from "../components/CtaBanner";
import Reviews from "../components/Reviews";
import Blogs from "../components/Blogs";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Topbar />
      <Navbar />
      <Ticker />
      <Hero />
      <About />
      <Services />
      <Countries />
      <CtaBanner />
      <Reviews />
      <Blogs />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;