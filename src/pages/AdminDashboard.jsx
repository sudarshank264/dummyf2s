import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminBlogsCMS from '../components/AdminBlogsCMS';
import AdminReviewsCMS from '../components/AdminReviewsCMS';
import AdminCountriesCMS from '../components/AdminCountriesCMS';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('leads'); // leads | blogs | reviews
  const [leadsData, setLeadsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Authentication check & Fetching
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    // Fetch Leads if authorized
    const fetchLeads = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/contact', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (response.status === 401) {
          // Token expired or invalid
          localStorage.removeItem('adminToken');
          navigate('/admin/login');
          return;
        }

        const data = await response.json();
        setLeadsData(data);
      } catch (err) {
        console.error('Error fetching leads:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminName');
    navigate('/admin/login');
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar Navigation */}
      <aside className="ad-sidebar">
        <div className="ad-logo">
          ✈️ <span style={{ color: 'var(--white)'}}>F2S</span> Admin
        </div>
        
        <nav className="ad-nav">
          <button className={`ad-nav-btn ${activeTab === 'leads' ? 'active' : ''}`} onClick={() => setActiveTab('leads')}>
            📥 Client Leads <span className="ad-badge">{leadsData.length}</span>
          </button>
          <button className={`ad-nav-btn ${activeTab === 'blogs' ? 'active' : ''}`} onClick={() => setActiveTab('blogs')}>
            📰 Manage Blogs
          </button>
          <button className={`ad-nav-btn ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => setActiveTab('reviews')}>
            ⭐ Manage Reviews
          </button>
          <button className={`ad-nav-btn ${activeTab === 'countries' ? 'active' : ''}`} onClick={() => setActiveTab('countries')}>
            🗺️ Manage Countries
          </button>
        </nav>

        <div className="ad-sidebar-footer">
          <div className="ad-user">
            <div className="ad-avatar">A</div>
            <span>{localStorage.getItem('adminName') || 'Administrator'}</span>
          </div>
          <button className="ad-logout" onClick={handleLogout}>Log Out</button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="ad-main">
        <header className="ad-header">
          <h1>{activeTab === 'leads' ? 'Client Leads Overview' : activeTab === 'blogs' ? 'Blog Management' : activeTab === 'countries' ? 'Country Visa Guides' : 'Client Reviews Content'}</h1>
          <p className="ad-subtitle">Welcome back. Here is your latest data payload.</p>
        </header>

        <div className="ad-content-area">
          {loading ? (
            <div className="ad-loader">Securely fetching database...</div>
          ) : (
            <>
              {activeTab === 'leads' && (
                <div className="ad-table-wrapper">
                  <table className="ad-table">
                    <thead>
                      <tr>
                        <th>Date & Time</th>
                        <th>Client Name</th>
                        <th>Contact Email</th>
                        <th>Phone</th>
                        <th>Service Target</th>
                        <th>Destination</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leadsData.map((lead) => (
                        <tr key={lead._id}>
                          <td style={{ color: 'var(--grey)'}}>{formatDate(lead.createdAt)}</td>
                          <td style={{ fontWeight: 600, color: 'var(--white)'}}>{lead.fullName}</td>
                          <td><a href={`mailto:${lead.email}`} style={{ color: 'var(--red)'}}>{lead.email}</a></td>
                          <td>{lead.phone}</td>
                          <td><span className="ad-tag">{lead.serviceNeeded}</span></td>
                          <td>{lead.destinationCountry || '-'}</td>
                        </tr>
                      ))}
                      {leadsData.length === 0 && (
                        <tr>
                          <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: 'var(--grey)'}}>
                            No leads submitted yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'blogs' && <AdminBlogsCMS />}

              {activeTab === 'reviews' && <AdminReviewsCMS />}

              {activeTab === 'countries' && <AdminCountriesCMS />}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
