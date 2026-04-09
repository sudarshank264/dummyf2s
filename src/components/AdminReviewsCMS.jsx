import React, { useState, useEffect } from 'react';

const AdminReviewsCMS = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ videoUrl: '', img: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/reviews');
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePostReview = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch('http://localhost:5001/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setForm({ videoUrl: '', img: '' });
        fetchReviews(); // refresh list
      } else {
        alert('Failed to post review');
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
        .cms-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 40px; }
        .cms-form-card { background: var(--white); padding: 24px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .cms-input { width: 100%; padding: 10px; margin-top: 6px; margin-bottom: 16px; border: 1px solid #ccc; border-radius: 4px; font-family: var(--ff-body); }
        .cms-btn { background: var(--red); color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; width: 100%; }
        .cms-btn:hover { background: var(--red-dark); }
        .cms-list { background: var(--white); padding: 24px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .rev-item { display: flex; gap: 16px; padding: 12px; border-bottom: 1px solid #eee; align-items: center; }
        .rev-item img { width: 80px; height: 80px; object-fit: cover; border-radius: 4px; }
      `}</style>
      
      <div className="cms-grid">
        <div className="cms-form-card">
          <h3 style={{ marginBottom: '20px' }}>Add New Review</h3>
          <form onSubmit={handlePostReview}>
            <label><strong>Thumbnail Image URL *</strong></label>
            <input 
              className="cms-input" 
              type="text" 
              placeholder="https://example.com/thumb.jpg" 
              value={form.img} 
              onChange={e => setForm({...form, img: e.target.value})} 
              required 
            />

            <label><strong>Video URL (Optional)</strong></label>
            <input 
              className="cms-input" 
              type="text" 
              placeholder="https://youtube.com/..." 
              value={form.videoUrl} 
              onChange={e => setForm({...form, videoUrl: e.target.value})} 
            />

            <button type="submit" className="cms-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Posting...' : 'Publish Review'}
            </button>
          </form>
        </div>

        <div className="cms-list">
          <h3 style={{ marginBottom: '20px' }}>Live Reviews ({reviews.length})</h3>
          {loading ? <p>Loading reviews...</p> : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {reviews.map(rev => (
                <div key={rev._id} className="rev-item">
                  <img src={rev.img} alt="Rev thumb" />
                  <div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--grey)' }}>ID: {rev._id}</p>
                    {rev.videoUrl && <a href={rev.videoUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--red)', fontSize: '0.9rem' }}>Watch Video</a>}
                  </div>
                </div>
              ))}
              {reviews.length === 0 && <p style={{ color: 'var(--grey)' }}>No reviews in database.</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminReviewsCMS;
