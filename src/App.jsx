import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import ReviewsPage from './pages/ReviewsPage';
import BlogPage from './pages/BlogPage';
import Cursor from './components/Cursor';

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
    <>
      <Cursor />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/blog/:id" element={<BlogPage />} />
      </Routes>
    </>
  );
};

export default App;