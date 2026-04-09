import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BLOGS_DATA } from '../data';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 800); // 800ms fast fail!
      try {
        const res = await fetch('http://localhost:5001/api/blogs', { signal: controller.signal });
        clearTimeout(timeoutId);
        if (res.ok) {
          const data = await res.json();
          setBlogs(data);
        } else {
          setBlogs(BLOGS_DATA); // Fallback
        }
      } catch (err) {
        clearTimeout(timeoutId);
        console.error('API Error, falling back to static blogs');
        setBlogs(BLOGS_DATA); // Fallback
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const displayBlogs = blogs.length > 0 ? blogs.slice(0, 3) : BLOGS_DATA.slice(0, 3); // show only 3 on home

  return (
    <section className="section blogs-bg" id="blogs">
      <div className="section-inner">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <span className="section-tag">Latest News</span>
            <h2 className="section-title">IMMIGRATION<br/><span className="outline">BLOGS</span></h2>
          </div>
          <Link to="/blogs" className="btn-primary" style={{ fontSize: '0.76rem', padding: '10px 22px' }}>View All Blogs →</Link>
        </div>
        <div className="blogs-grid reveal">
          {displayBlogs.map((blog, idx) => (
            <Link to={`/blog/${blog.slug || blog.id}`} className="blog-card" key={idx}>
              <div className="blog-thumb">
                {blog.bannerImg ? <img src={blog.bannerImg} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="blog thumb" /> : blog.thumb}
              </div>
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