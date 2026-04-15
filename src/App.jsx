import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import Home from './pages/Home';
import ReviewsPage from './pages/ReviewsPage';
import BlogPage from './pages/BlogPage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import CountriesPage from './pages/CountriesPage';
import BlogsListPage from './pages/BlogsListPage';
import ContactPage from './pages/ContactPage';
import PopupForm from './components/PopupForm';

// ScrollToTop strictly for route changes
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Allow minor delay for Home page to render if navigating from another route
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

const App = () => {
  useEffect(() => {
    // Scroll reveal animation
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en, i) => {
        if (en.isIntersecting) {
          setTimeout(() => en.target.classList.add('visible'), i * 80);
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.1 });

    const observerTimer = setInterval(() => {
      document.querySelectorAll('.reveal:not(.visible)').forEach(el => io.observe(el));
    }, 500);

    return () => {
      clearInterval(observerTimer);
      io.disconnect();
    };
  }, []);

  return (
    <DataProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/countries" element={<CountriesPage />} />
        <Route path="/blogs" element={<BlogsListPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/blog/:id" element={<BlogPage />} />
      </Routes>
      <PopupForm />
    </DataProvider>
  );
};

export default App;