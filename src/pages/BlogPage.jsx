import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BlogPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchBlog = async () => {
      try {
        const res = await fetch(`${API_URL}/api/blogs/${id}`);

        if (!res.ok) {
          setBlog(false); // not found
          return;
        }

        const data = await res.json();
        setBlog(data);
      } catch (err) {
        console.error('Error fetching blog:', err);
        setBlog(false);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Loading...
      </main>
    );
  }

  if (blog === false) {
    return <Navigate to="/" />;
  }

  if (!blog) return null;

  return (
    <>
      <Navbar />

      <main style={{ backgroundColor: 'var(--white)', minHeight: '80vh' }}>

        {/* HERO */}
        <section
          style={{
            position: 'relative',
            width: '100%',
            height: '55vh',
            minHeight: '400px',
            backgroundImage: `url(${blog.bannerImg || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.65)' }}></div>

          <div className="section-inner" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <h1
              style={{
                fontFamily: 'var(--ff-display)',
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                color: 'var(--white)',
                lineHeight: 1.1,
                letterSpacing: '1px',
                maxWidth: '900px',
                margin: 'auto'
              }}
            >
              {blog.title}
            </h1>
          </div>
        </section>

        {/* CONTENT */}
        <div className="section" style={{ padding: '60px 0', minHeight: '50vh' }}>
          <section className="section-inner" style={{ maxWidth: '800px', margin: '0 auto' }}>

            {/* If no content */}
            {(!blog.content || blog.content.length === 0) ? (
              <div
                style={{
                  background: 'var(--off-white)',
                  padding: '40px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  borderLeft: '4px solid var(--red)'
                }}
              >
                <p style={{ fontStyle: 'italic' }}>
                  {blog.excerpt || 'Content not available.'}
                </p>
              </div>
            ) : (
              blog.content.map((block, idx) => {

                if (block.type === 'intro') {
                  return (
                    <p key={idx} style={{ fontStyle: 'italic', marginBottom: '30px' }}>
                      {block.text}
                    </p>
                  );
                }

                if (block.type === 'h3') {
                  return (
                    <h3 key={idx} style={{ color: 'red', marginBottom: '10px' }}>
                      {block.text}
                    </h3>
                  );
                }

                if (block.type === 'p') {
                  return (
                    <p key={idx} style={{ marginBottom: '20px', lineHeight: '1.7' }}>
                      {block.text}
                    </p>
                  );
                }

                if (block.type === 'image') {
                  return (
                    <img
                      key={idx}
                      src={block.text}
                      alt="blog"
                      style={{ width: '100%', borderRadius: '8px', marginBottom: '20px' }}
                    />
                  );
                }

                return null;
              })
            )}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default BlogPage;