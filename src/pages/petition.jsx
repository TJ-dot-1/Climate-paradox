import React, { useState, useEffect } from 'react';
import { petitionAPI } from '../utils/api';

const Petition = () => {
  const [petitionStats, setPetitionStats] = useState(null);
  const [recentSignatures, setRecentSignatures] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    county: '',
    comment: '',
    isAnonymous: false
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchPetitionData();
  }, []);

  const fetchPetitionData = async () => {
    try {
      const [statsRes, signaturesRes] = await Promise.all([
        petitionAPI.getStats(),
        petitionAPI.getSignatures(1, 10)
      ]);
      
      setPetitionStats(statsRes.data.data);
      setRecentSignatures(signaturesRes.data.data);
    } catch (error) {
      console.error('Error fetching petition data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await petitionAPI.sign(formData);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        location: '',
        county: '',
        comment: '',
        isAnonymous: false
      });
      fetchPetitionData(); // Refresh data
    } catch (error) {
      alert('Error signing petition: ' + error.response?.data?.message || error.message);
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

  return (
    <div className="container">
      <div className="hero-section">
        <h1>Take Action</h1>
        <p>Join the movement for climate justice in Kenya</p>
      </div>

      {/* Petition Statistics */}
      {petitionStats && (
        <section style={{ marginBottom: '3rem' }}>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{petitionStats.totalSignatures.toLocaleString()}</div>
              <div className="stat-label">Total Signatures</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{petitionStats.recentSignatures.toLocaleString()}</div>
              <div className="stat-label">This Week</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{petitionStats.signaturesByCounty.length}</div>
              <div className="stat-label">Counties Represented</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">100K</div>
              <div className="stat-label">Our Goal</div>
            </div>
          </div>
        </section>
      )}

      <div className="grid grid-2" style={{ gap: '3rem', alignItems: 'start' }}>
        {/* Petition Form */}
        <section>
          <div className="card">
            <h2>Sign the Climate Justice Petition</h2>
            
            {submitted ? (
              <div className="success">
                <h3>✅ Thank You for Signing!</h3>
                <p>Your signature has been added to the petition. Together, we're making a difference!</p>
                <button 
                  className="btn btn-outline"
                  onClick={() => setSubmitted(false)}
                  style={{ marginTop: '1rem' }}
                >
                  Sign Again
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="petition-form">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                    required
                    disabled={formData.isAnonymous}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
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
                      placeholder="e.g., Nairobi Central"
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
                  <label className="form-label">Why is climate justice important to you?</label>
                  <textarea
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    className="form-control"
                    rows="4"
                    placeholder="Share your thoughts on climate justice in Kenya..."
                  />
                </div>

                <div className="form-group">
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="checkbox"
                      name="isAnonymous"
                      checked={formData.isAnonymous}
                      onChange={handleChange}
                    />
                    <span>Sign anonymously</span>
                  </label>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={submitting}
                  style={{ width: '100%', fontSize: '1.1rem', padding: '1rem' }}
                >
                  {submitting ? 'Signing...' : '✍️ Sign the Petition'}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* Petition Details */}
        <section>
          <div className="card">
            <h2>Our Demands</h2>
            <div style={{ lineHeight: '1.8' }}>
              <h3>🌍 To the Kenyan Government:</h3>
              <ul style={{ marginBottom: '1.5rem' }}>
                <li>Strengthen climate change adaptation policies</li>
                <li>Invest in renewable energy infrastructure</li>
                <li>Support climate-smart agriculture</li>
                <li>Protect vulnerable communities</li>
              </ul>

              <h3>🌐 To the International Community:</h3>
              <ul style={{ marginBottom: '1.5rem' }}>
                <li>Provide adequate climate finance</li>
                <li>Transfer clean energy technology</li>
                <li>Honor climate funding commitments</li>
                <li>Support loss and damage mechanisms</li>
              </ul>

              <h3>💚 To All Kenyans:</h3>
              <ul>
                <li>Adopt sustainable practices</li>
                <li>Support local climate initiatives</li>
                <li>Educate others about climate justice</li>
                <li>Hold leaders accountable</li>
              </ul>
            </div>
          </div>

          {/* Recent Signatures */}
          <div className="card" style={{ marginTop: '2rem' }}>
            <h3>Recent Supporters</h3>
            {recentSignatures.length > 0 ? (
              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {recentSignatures.map(signature => (
                  <div 
                    key={signature._id}
                    style={{ 
                      padding: '0.75rem',
                      borderBottom: '1px solid #eee',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <strong>{signature.name}</strong>
                      <div style={{ fontSize: '0.9rem', color: '#666' }}>
                        {signature.location}, {signature.county}
                      </div>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#999' }}>
                      {new Date(signature.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>
                No signatures yet. Be the first!
              </p>
            )}
          </div>
        </section>
      </div>

      {/* Share Section */}
      <section style={{ textAlign: 'center', marginTop: '3rem', padding: '2rem' }}>
        <h2>Spread the Word</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Help us reach more people by sharing this petition on social media.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-outline">📘 Facebook</button>
          <button className="btn btn-outline">🐦 Twitter</button>
          <button className="btn btn-outline">📷 Instagram</button>
          <button className="btn btn-outline">💬 WhatsApp</button>
        </div>
      </section>
    </div>
  );
};

export default Petition;