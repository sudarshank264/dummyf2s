import React, { useEffect, useState, useContext } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { BLOGS_DATA } from '../data';
import { DataContext } from '../context/DataContext';

const BlogPage = () => {
  const { id } = useParams();
  const { blogs, loading: contextLoading } = useContext(DataContext);
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top on load
    window.scrollTo(0, 0);

    if (contextLoading) return;

    let foundBlog = null;
    if (blogs && blogs.length > 0) {
      foundBlog = blogs.find((b) => String(b._id) === id || String(b.id) === id || String(b.slug) === id);
    }

    if (!foundBlog) {
      foundBlog = BLOGS_DATA.find((b) => String(b.id) === id || String(b.slug) === id);
    }

    setBlog(foundBlog === undefined ? false : foundBlog);
    setLoading(false);
  }, [id, blogs, contextLoading]);

  if (loading) {
    return <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</main>;
  }

  if (blog === false) {
    return <Navigate to="/" />; // Redirect if not found
  }

  if (!blog) {
    return null;
  }

  return (
    <>
      <Navbar />

      <main style={{ backgroundColor: 'var(--white)', minHeight: '80vh' }}>
        {/* HERO BANNER */}
        <section style={{
          position: 'relative',
          width: '100%',
          height: '55vh',
          minHeight: '400px',
          backgroundImage: `url(${blog.bannerImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Overlay to ensure text readability */}
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.65)' }}></div>
          
          <div className="section-inner" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <h1 style={{
              fontFamily: 'var(--ff-display)',
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              color: 'var(--white)',
              lineHeight: 1.1,
              letterSpacing: '1px',
              maxWidth: '900px',
              margin: 'auto'
            }}>
              {blog.title.split('33,000 Temporary').map((part, i, arr) => 
                i === 0 && arr.length > 1 
                  ? <React.Fragment key={i}>{part}<span style={{ color: '#FFD700' }}>33,000 Temporary</span></React.Fragment> 
                  : part
              )}
            </h1>
          </div>
        </section>

        {/* CONTENT AREA - WHITE BACKGROUND, RED & BLACK ACCENTS */}
        <div className="section" style={{ padding: '60px 0', minHeight: '50vh' }}>
          <section className="section-inner" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {blog.content.map((block, idx) => {
            if (block.type === 'intro') {
              return (
                <p key={idx} style={{
                  fontSize: '1.15rem',
                  fontStyle: 'italic',
                  color: 'var(--black)',
                  lineHeight: 1.8,
                  marginBottom: '40px',
                  paddingLeft: '20px',
                  borderLeft: '4px solid var(--red)'
                }}>
                  {block.text}
                </p>
              );
            }
            if (block.type === 'h3') {
              return (
                <h3 key={idx} style={{
                  fontFamily: 'var(--ff-display)',
                  fontSize: '2rem',
                  color: 'var(--red)',
                  marginBottom: '16px',
                  letterSpacing: '0.5px'
                }}>
                  {block.text}
                </h3>
              );
            }
            if (block.type === 'p') {
              return (
                <p key={idx} style={{
                  fontSize: '0.95rem',
                  color: 'var(--charcoal)',
                  marginBottom: '24px',
                  lineHeight: 1.8
                }}>
                  {block.text}
                </p>
              );
            }
            return null;
          })}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default BlogPage;
