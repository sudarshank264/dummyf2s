import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../context/DataContext';

const Blogs = ({ hideViewAllButton, showAll }) => {
  const { blogs, loading } = useContext(DataContext);

  const displayBlogs = showAll 
    ? (blogs || [])
    : ((blogs || []).slice(0, 3));

  if (loading) return null;

  return (
    <section className="section blogs-bg" id="blogs">
      <div className="section-inner">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <span className="section-tag">Latest News</span>
            <h2 className="section-title">IMMIGRATION<br /><span className="outline">BLOGS</span></h2>
          </div>
          {!hideViewAllButton && (
            <Link to="/blogs" className="btn-primary" style={{ fontSize: '0.76rem', padding: '10px 22px' }}>View All Blogs →</Link>
          )}
        </div>
        <div className="blogs-grid reveal">
          {displayBlogs.map((blog, idx) => (
            <Link to={`/blog/${blog.slug || blog._id || blog.id}`} className="blog-card" key={idx}>
              <div className="blog-thumb">
                <div className="blog-thumb-pattern"></div>
                <div className="blog-thumb-icon">
                  <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                </div>
              </div>
              <div className="blog-body">
                <div className="blog-tag">{blog.tag}</div>
                <h3 className="blog-title">{blog.title}</h3>
                <p className="blog-excerpt">{blog.excerpt}</p>
                <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
                  <span className="btn-primary" style={{ display: 'inline-block', padding: '8px 16px', fontSize: '0.85rem', width: 'fit-content' }}>Read More →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;