import React, { useEffect, useState, useContext } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
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
      const decodedId = decodeURIComponent(id).toLowerCase();
      foundBlog = blogs.find((b) => 
        String(b._id).toLowerCase() === decodedId || 
        String(b.id).toLowerCase() === decodedId || 
        String(b.slug).toLowerCase() === decodedId
      );
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
          backgroundImage: `url(${blog.bannerImg || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop'})`,
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
              {(blog.title || '').split('33,000 Temporary').map((part, i, arr) => 
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
            {(!blog.content || (Array.isArray(blog.content) && blog.content.length === 0)) ? (
              <div style={{
                background: 'var(--off-white)',
                padding: '40px',
                borderRadius: '8px',
                textAlign: 'center',
                borderLeft: '4px solid var(--red)',
                boxShadow: 'var(--shadow)'
              }}>
                <p style={{
                  fontSize: '1.2rem',
                  fontStyle: 'italic',
                  color: 'var(--charcoal)',
                  lineHeight: 1.8,
                  marginBottom: '16px'
                }}>
                  {blog.excerpt || "We are currently drafting the full content for this article."}
                </p>
                <div style={{ fontSize: '0.9rem', color: 'var(--grey)' }}>Check back later for updates.</div>
              </div>
            ) : Array.isArray(blog.content) ? blog.content.map((block, idx) => {
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
                  lineHeight: 1.8,
                  whiteSpace: 'pre-wrap'
                }}>
                  {block.text}
                </p>
              );
            }
            if (block.type === 'image') {
              return (
                <img key={idx} src={block.text} alt="blog visual" style={{ width: '100%', borderRadius: '8px', marginBottom: '24px' }} />
              );
            }
            return null;
          }) : (
            <div dangerouslySetInnerHTML={{ __html: blog.content || '' }} />
          )}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default BlogPage;
