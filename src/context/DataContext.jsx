import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  const [content, setContent] = useState(null);
  const [services, setServices] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [contentRes, servicesRes, blogsRes, reviewsRes, countriesRes] = await Promise.all([
          fetch(`${API_URL}/api/content`).catch(() => null),
          fetch(`${API_URL}/api/services`).catch(() => null),
          fetch(`${API_URL}/api/blogs`).catch(() => null),
          fetch(`${API_URL}/api/reviews`).catch(() => null),
          fetch(`${API_URL}/api/countries`).catch(() => null)
        ]);

        if (contentRes && contentRes.ok) {
          const data = await contentRes.json();
          setContent(Array.isArray(data) ? data[0] : data);
        }

        if (servicesRes && servicesRes.ok) {
          const data = await servicesRes.json();
          setServices(Array.isArray(data) ? data : []);
        }

        if (blogsRes && blogsRes.ok) {
          const data = await blogsRes.json();
          setBlogs(data.blogs || []);   // ✅ FIXED
        }

        if (reviewsRes && reviewsRes.ok) {
          const data = await reviewsRes.json();
          const activeOnly = data.filter(r => r.isActive);
          setReviews(activeOnly);
        }

        if (countriesRes && countriesRes.ok) {
          const data = await countriesRes.json();
          const activeOnly = data.filter(c => c.isActive);
          setCountries(activeOnly);
        }
      } catch (err) {
        console.error('Error fetching global data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [API_URL]);

  return (
    <DataContext.Provider value={{ content, services, blogs, reviews, countries, loading }}>
      {children}
    </DataContext.Provider>
  );
};
