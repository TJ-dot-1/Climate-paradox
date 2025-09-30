import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { climateDataAPI, petitionAPI, storiesAPI } from '../utils/api';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Dashboard = () => {
  const [climateData, setClimateData] = useState([]);
  const [petitionStats, setPetitionStats] = useState(null);
  const [storyStats, setStoryStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [climateRes, petitionRes, storiesRes] = await Promise.all([
        climateDataAPI.getAll(),
        petitionAPI.getStats(),
        storiesAPI.getStats()
      ]);

      setClimateData(climateRes.data.data);
      setPetitionStats(petitionRes.data.data);
      setStoryStats(storiesRes.data.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard data...</div>;
  }

  // Sample data for charts
  const emissionsData = {
    labels: ['Kenya', 'USA', 'China', 'Germany', 'South Africa', 'Global Avg'],
    datasets: [
      {
        label: 'CO2 Emissions per capita (tons)',
        data: [0.4, 14.7, 8.2, 8.9, 6.9, 4.7],
        backgroundColor: [
          '#2E8B57', '#DC143C', '#FFD700', '#000080', '#FF8C00', '#6A5ACD'
        ],
        borderColor: [
          '#2E8B57', '#DC143C', '#FFD700', '#000080', '#FF8C00', '#6A5ACD'
        ],
        borderWidth: 1,
      },
    ],
  };

  const vulnerabilityData = {
    labels: ['Drought Risk', 'Flood Risk', 'Food Security', 'Water Stress', 'Health Impact'],
    datasets: [
      {
        label: 'Vulnerability Score',
        data: [8.2, 7.8, 7.5, 8.0, 6.9],
        backgroundColor: 'rgba(255, 107, 107, 0.6)',
        borderColor: 'rgba(255, 107, 107, 1)',
        borderWidth: 2,
      },
    ],
  };

  const kenyaCounties = [
    { name: 'Turkana', lat: 3.1167, lng: 35.6000, impacts: 'Severe Drought', severity: 'High' },
    { name: 'Marsabit', lat: 2.3333, lng: 37.9833, impacts: 'Drought & Conflict', severity: 'High' },
    { name: 'Mandera', lat: 3.9366, lng: 41.8670, impacts: 'Food Insecurity', severity: 'High' },
    { name: 'Wajir', lat: 1.7500, lng: 40.0500, impacts: 'Water Scarcity', severity: 'High' },
    { name: 'Garissa', lat: -0.4569, lng: 39.6589, impacts: 'Flood Risk', severity: 'Medium' },
    { name: 'Tana River', lat: -1.5000, lng: 40.0000, impacts: 'Flooding', severity: 'Medium' },
    { name: 'Kitui', lat: -1.3667, lng: 38.0167, impacts: 'Desertification', severity: 'Medium' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1>Climate Paradox Kenya</h1>
          <p>High Vulnerability, Minimal Contribution - Exploring Kenya's unjust climate reality</p>
          <div style={{ marginTop: '2rem' }}>
            <Link to="/petition" className="btn btn-accent" style={{ marginRight: '1rem' }}>
              📢 Take Action
            </Link>
            <Link to="/data" className="btn btn-outline" style={{ color: 'white', borderColor: 'white' }}>
              📊 Explore Data
            </Link>
          </div>
        </div>
      </section>

      <div className="container">
        {/* Key Statistics */}
        <section style={{ marginBottom: '3rem' }}>
          <h2>Key Statistics</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{petitionStats?.totalSignatures || '1,247'}</div>
              <div className="stat-label">Petition Signatures</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{storyStats?.totalStories || '89'}</div>
              <div className="stat-label">Impact Stories</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">&lt;0.1%</div>
              <div className="stat-label">Global Emissions</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">4.3M</div>
              <div className="stat-label">People Affected by Drought</div>
            </div>
          </div>
        </section>

        {/* Charts Grid */}
        <section style={{ marginBottom: '3rem' }}>
          <div className="grid grid-2">
            <div className="chart-container">
              <h3>Carbon Emissions Comparison</h3>
              <Bar 
                data={emissionsData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    title: {
                      display: true,
                      text: 'CO2 Emissions Per Capita (2022)'
                    },
                  },
                }}
              />
              <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
                Kenya emits 36x less CO2 per person than the United States
              </p>
            </div>

            <div className="chart-container">
              <h3>Climate Vulnerability</h3>
              <Line 
                data={vulnerabilityData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 10
                    }
                  }
                }}
              />
            </div>
          </div>
        </section>

        {/* Impact Map */}
        <section style={{ marginBottom: '3rem' }}>
          <h2>Climate Impact Map of Kenya</h2>
          <div className="map-container">
            <MapContainer 
              center={[0.5, 38]} 
              zoom={6} 
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {kenyaCounties.map((county, index) => (
                <Marker key={index} position={[county.lat, county.lng]}>
                  <Popup>
                    <strong>{county.name} County</strong><br />
                    Impact: {county.impacts}<br />
                    Severity: {county.severity}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </section>

        {/* Call to Action */}
        <section style={{ textAlign: 'center', padding: '3rem 0' }}>
          <h2>Ready to Make a Difference?</h2>
          <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
            Join thousands of Kenyans demanding climate justice and sustainable solutions.
          </p>
          <Link to="/petition" className="btn btn-primary btn-lg">
            ✍️ Sign the Petition Now
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;