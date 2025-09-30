import React, { useState, useEffect } from 'react';
import { storiesAPI } from '../utils/api';

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    location: '',
    county: '',
    category: 'drought',
    email: '',
    consent: false
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      setLoading(true);
      const [storiesRes, statsRes] = await Promise.all([
        storiesAPI.getAll({ verified: true }),
        storiesAPI.getStats()
      ]);
      
      setStories(storiesRes.data.data);
      setStats(statsRes.data.data);
    } catch (error) {
      console.error('Error fetching stories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await storiesAPI.create(formData);
      alert('Story submitted successfully! It will be reviewed before publishing.');
      setFormData({
        title: '',
        content: '',
        author: '',
        location: '',
        county: '',
        category: 'drought',
        email: '',
        consent: false
      });
      setShowForm(false);
      fetchStories(); // Refresh stories
    } catch (error) {
      alert('Error submitting story: ' + error.response?.data?.message || error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const kenyaCounties = [
    'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika',
    'Turkana', 'Marsabit', 'Mandera', 'Wajir', 'Garissa', 'Tana River',
    'Kitui', 'Makueni', 'Machakos', 'Kajiado', 'Narok', 'Baringo',
    'Samburu', 'Isiolo', 'Meru', 'Embu', 'Kirinyaga', 'Nyeri', 'Muranga',
    'Kiambu', 'Nyandarua', 'Laikipia', 'Nakuru', 'Kericho', 'Bomet',
    'Kakamega', 'Vihiga', 'Bungoma', 'Busia', 'Siaya', 'Kisii', 'Nyamira',
    'Migori', 'Homa Bay', 'Kilifi', 'Kwale', 'Lamu', 'Taita Taveta'
  ];

  if (loading) {
    return <div className="loading">Loading stories...</div>;
  }

  return (
    <div className="container">
      <div className="hero-section">
        <h1>Impact Stories</h1>
        <p>Real stories from Kenyans affected by climate change</p>
        <button 
          className="btn btn-accent"
          onClick={() => setShowForm(true)}
          style={{ marginTop: '1rem' }}
        >
          ✍️ Share Your Story
        </button>
      </div>

      {/* Statistics */}
      {stats && (
        <section style={{ marginBottom: '2rem' }}>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{stats.totalStories}</div>
              <div className="stat-label">Total Stories</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.verifiedStories}</div>
              <div className="stat-label">Verified Stories</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.storiesByCategory.length}</div>
              <div className="stat-label">Categories</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.storiesByCounty.length}</div>
              <div className="stat-label">Counties</div>
            </div>
          </div>
        </section>
      )}

      {/* Story Submission Form */}
      {showForm && (
        <section style={{ marginBottom: '3rem' }}>
          <div className="card">
            <h2>Share Your Climate Story</h2>
            <form onSubmit={handleSubmit} className="petition-form">
              <div className="form-group">
                <label className="form-label">Story Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="form-control"
                  required
                  placeholder="e.g., How drought affected our community"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Your Story *</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  className="form-control"
                  rows="6"
                  required
                  placeholder="Tell us how climate change has affected you, your family, or your community..."
                />
              </div>

              <div className="grid grid-2">
                <div className="form-group">
                  <label className="form-label">Your Name *</label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-2">
                <div className="form-group">
                  <label className="form-label">Location *</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="form-control"
                    required
                    placeholder="e.g., Specific village or area"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">County *</label>
                  <select
                    name="county"
                    value={formData.county}
                    onChange={handleChange}
                    className="form-control"
                    required
                  >
                    <option value="">Select County</option>
                    {kenyaCounties.map(county => (
                      <option key={county} value={county}>{county}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Impact Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="drought">Drought</option>
                  <option value="floods">Floods</option>
                  <option value="agriculture">Agriculture</option>
                  <option value="livelihood">Livelihood</option>
                  <option value="health">Health</option>
                  <option value="displacement">Displacement</option>
                </select>
              </div>

              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'start', gap: '0.5rem' }}>
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    required
                    style={{ marginTop: '0.25rem' }}
                  />
                  <span>
                    I consent to sharing my story publicly on this platform. 
                    I understand that my email will be kept private.
                  </span>
                </label>
              </div>

              <div className="form-actions">
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={submitting}
                >
                  {submitting ? 'Submitting...' : 'Submit Story'}
                </button>
                <button 
                  type="button" 
                  className="btn btn-outline"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </section>
      )}

      {/* Stories Grid */}
      <section>
        <h2>Recent Stories</h2>
        
        {stories.length > 0 ? (
          <div className="story-grid">
            {stories.map(story => (
              <div key={story._id} className="story-card">
                <div className="story-content">
                  <h3>{story.title}</h3>
                  <div className="story-meta">
                    <span className="story-location">{story.location}, {story.county}</span>
                    <span className="story-category">{story.category}</span>
                  </div>
                  <p>{story.content.substring(0, 200)}...</p>
                  <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
                    By {story.author} • {new Date(story.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
            <h3>No stories yet</h3>
            <p>Be the first to share your climate impact story!</p>
            <button 
              className="btn btn-primary"
              onClick={() => setShowForm(true)}
              style={{ marginTop: '1rem' }}
            >
              Share Your Story
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Stories;