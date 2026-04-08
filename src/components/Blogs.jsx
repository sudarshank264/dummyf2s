import React from 'react';
import { Link } from 'react-router-dom';
import { BLOGS_DATA } from '../data';

const Blogs = () => {
  return (
    <section className="section blogs-bg" id="blogs">
      <div className="section-inner">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <span className="section-tag">Latest News</span>
            <h2 className="section-title">IMMIGRATION<br/><span className="outline">BLOGS</span></h2>
          </div>
          <a target="_blank" rel="noreferrer" className="btn-primary" style={{ fontSize: '0.76rem', padding: '10px 22px' }}>View All Blogs →</a>
        </div>
        <div className="blogs-grid reveal">
          {BLOGS_DATA.map((blog, idx) => (
            <Link to={`/blog/${blog.id}`} className="blog-card" key={idx}>
              <div className="blog-thumb">{blog.thumb}</div>
              <div className="blog-body">
                <div className="blog-tag">{blog.tag}</div>
                <h3 className="blog-title">{blog.title}</h3>
                <p className="blog-excerpt">{blog.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;