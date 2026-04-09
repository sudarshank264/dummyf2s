import React, { useState, useEffect } from 'react';

const AdminBlogsCMS = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    slug: '',
    thumb: '📰',
    tag: '',
    title: '',
    excerpt: '',
    bannerImg: '',
    content: [{ type: 'p', text: '' }]
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/blogs');
      if (res.ok) {
        const data = await res.json();
        setBlogs(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBlockChange = (index, field, value) => {
    const newContent = [...form.content];
    newContent[index][field] = value;
    setForm({ ...form, content: newContent });
  };

  const addBlock = () => {
    setForm({ ...form, content: [...form.content, { type: 'p', text: '' }] });
  };

  const removeBlock = (index) => {
    const newContent = form.content.filter((_, i) => i !== index);
    setForm({ ...form, content: newContent });
  };

  const handlePostBlog = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const token = localStorage.getItem('adminToken');
    try {
      const payload = {
        ...form,
        slug: form.slug.toLowerCase().replace(/\s+/g, '-')
      };
      const res = await fetch('http://localhost:5001/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setForm({
          slug: '', thumb: '📰', tag: '', title: '', excerpt: '', bannerImg: '', content: [{ type: 'p', text: '' }]
        });
        fetchBlogs();
      } else {
        alert('Failed to post blog');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-cms-panel" style={{ color: 'var(--black)' }}>
      <style>{`
        .cms-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
        .cms-form-card { background: var(--white); padding: 24px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .cms-input { width: 100%; padding: 10px; margin-top: 6px; margin-bottom: 12px; border: 1px solid #ccc; border-radius: 4px; font-family: var(--ff-body); }
        .cms-btn { background: var(--red); color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; width: 100%; }
        .cms-btn:hover { background: var(--red-dark); }
        .cms-btn-outline { background: transparent; color: var(--red); border: 1px solid var(--red); padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 0.8rem; }
        .cms-list { background: var(--white); padding: 24px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .blog-item { padding: 12px 0; border-bottom: 1px solid #eee; }
        .content-block { background: #f9f9f9; padding: 12px; border-radius: 4px; margin-bottom: 12px; border: 1px solid #eee; position: relative; }
      `}</style>
      
      <div className="cms-grid">
        <div className="cms-form-card">
          <h3 style={{ marginBottom: '20px' }}>Publish New Blog Article</h3>
          <form onSubmit={handlePostBlog}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label><strong>Title *</strong></label>
                <input className="cms-input" type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
              </div>
              <div>
                <label><strong>Slug URL *</strong></label>
                <input className="cms-input" type="text" value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} placeholder="e.g. canada-visa-update" required />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label><strong>Tag Category</strong></label>
                <input className="cms-input" type="text" value={form.tag} onChange={e => setForm({...form, tag: e.target.value})} placeholder="e.g. VISAS" />
              </div>
              <div>
                <label><strong>Emoji Thumb</strong></label>
                <input className="cms-input" type="text" value={form.thumb} onChange={e => setForm({...form, thumb: e.target.value})} />
              </div>
            </div>

            <label><strong>Short Excerpt *</strong></label>
            <textarea className="cms-input" rows="2" value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} required />

            <label><strong>Banner Image URL *</strong></label>
            <input className="cms-input" type="text" value={form.bannerImg} onChange={e => setForm({...form, bannerImg: e.target.value})} required />

            <div style={{ margin: '20px 0', borderTop: '2px dashed #ccc', paddingTop: '20px' }}>
              <h4 style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }}>
                Content Blocks
                <button type="button" className="cms-btn-outline" onClick={addBlock}>+ Add Block</button>
              </h4>
              
              {form.content.map((block, idx) => (
                <div key={idx} className="content-block">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <select value={block.type} onChange={(e) => handleBlockChange(idx, 'type', e.target.value)} style={{ padding: '4px' }}>
                      <option value="p">Paragraph (p)</option>
                      <option value="h3">Heading (h3)</option>
                      <option value="intro">Intro Text</option>
                      <option value="image">Image (URL)</option>
                    </select>
                    {form.content.length > 1 && (
                      <span style={{ color: 'red', cursor: 'pointer', fontSize: '0.8rem' }} onClick={() => removeBlock(idx)}>Remove</span>
                    )}
                  </div>
                  <textarea 
                    className="cms-input" 
                    style={{ marginBottom: 0 }} 
                    rows="3" 
                    placeholder="Enter text or image URL..."
                    value={block.text} 
                    onChange={e => handleBlockChange(idx, 'text', e.target.value)} 
                    required 
                  />
                </div>
              ))}
            </div>

            <button type="submit" className="cms-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Publishing...' : 'Publish Blog Article'}
            </button>
          </form>
        </div>

        <div className="cms-list">
          <h3 style={{ marginBottom: '20px' }}>Published Articles ({blogs.length})</h3>
          {loading ? <p>Loading blogs...</p> : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {blogs.map(blog => (
                <div key={blog._id} className="blog-item">
                  <strong style={{ fontSize: '1.1rem' }}>{blog.title}</strong>
                  <p style={{ fontSize: '0.8rem', color: 'var(--grey)', marginTop: '4px' }}>/{blog.slug} • {new Date(blog.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
              {blogs.length === 0 && <p style={{ color: 'var(--grey)' }}>No blogs in database.</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBlogsCMS;
