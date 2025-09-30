import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="container">
      <div className="hero-section">
        <h1>About Climate Paradox Kenya</h1>
        <p>Understanding the injustice, advocating for solutions</p>
      </div>

      <div className="grid grid-2" style={{ gap: '3rem', marginTop: '3rem' }}>
        {/* The Problem */}
        <section>
          <div className="card">
            <h2>🌍 The Climate Paradox</h2>
            <p>
              Kenya faces a profound climate injustice. While contributing less than 0.1% 
              of global greenhouse gas emissions, it suffers disproportionately from 
              climate change impacts.
            </p>
            
            <h3>Key Challenges:</h3>
            <ul style={{ lineHeight: '1.8' }}>
              <li><strong>Recurrent Droughts:</strong> Affecting millions in arid and semi-arid regions</li>
              <li><strong>Flooding:</strong> Destroying infrastructure and displacing communities</li>
              <li><strong>Food Insecurity:</strong> Crop failures and livestock deaths</li>
              <li><strong>Water Scarcity:</strong> Limited access to clean water</li>
              <li><strong>Health Impacts:</strong> Spread of waterborne and vector-borne diseases</li>
            </ul>
          </div>
        </section>

        {/* The Solution */}
        <section>
          <div className="card">
            <h2>💡 The Way Forward</h2>
            <p>
              Despite the challenges, Kenya has immense potential for climate-resilient 
              development and can lead the way in sustainable solutions.
            </p>

            <h3>Opportunities:</h3>
            <ul style={{ lineHeight: '1.8' }}>
              <li><strong>Renewable Energy:</strong> Geothermal, wind, and solar potential</li>
              <li><strong>Climate-Smart Agriculture:</strong> Sustainable farming practices</li>
              <li><strong>Green Infrastructure:</strong> Building resilient communities</li>
              <li><strong>Carbon Markets:</strong> Benefiting from conservation efforts</li>
              <li><strong>Youth Innovation:</strong> Tech solutions for climate challenges</li>
            </ul>
          </div>
        </section>
      </div>

      {/* Our Mission */}
      <section style={{ marginTop: '3rem' }}>
        <div className="card">
          <h2>🎯 Our Mission</h2>
          <div className="grid grid-3">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
              <h3>Raise Awareness</h3>
              <p>Educate Kenyans about the climate paradox through data and stories</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🗣️</div>
              <h3>Amplify Voices</h3>
              <p>Share stories from affected communities to drive action</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
              <h3>Drive Action</h3>
              <p>Mobilize citizens to demand climate justice and solutions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section style={{ textAlign: 'center', margin: '3rem 0', padding: '2rem' }}>
        <h2>Ready to Make a Difference?</h2>
        <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
          Join thousands of Kenyans in demanding climate justice and sustainable solutions.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/petition" className="btn btn-primary btn-lg">
            ✍️ Sign the Petition
          </Link>
          <Link to="/stories" className="btn btn-accent btn-lg">
            📖 Share Your Story
          </Link>
          <Link to="/data" className="btn btn-outline btn-lg">
            📊 Explore Data
          </Link>
        </div>
      </section>

      {/* Technical Info */}
      <section style={{ marginTop: '3rem' }}>
        <div className="card">
          <h2>🛠️ About This Platform</h2>
          <p>
            This website is built using the MERN stack (MongoDB, Express.js, React, Node.js) 
            as a demonstration of how technology can be used to address social and environmental 
            challenges.
          </p>
          
          <div className="grid grid-4" style={{ marginTop: '2rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                background: '#1a535c', 
                color: 'white', 
                padding: '0.5rem', 
                borderRadius: '4px',
                marginBottom: '0.5rem'
              }}>
                MongoDB
              </div>
              <small>Database</small>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                background: '#4ecdc4', 
                color: 'white', 
                padding: '0.5rem', 
                borderRadius: '4px',
                marginBottom: '0.5rem'
              }}>
                Express.js
              </div>
              <small>Backend API</small>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                background: '#ff6b6b', 
                color: 'white', 
                padding: '0.5rem', 
                borderRadius: '4px',
                marginBottom: '0.5rem'
              }}>
                React
              </div>
              <small>Frontend</small>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                background: '#2d3047', 
                color: 'white', 
                padding: '0.5rem', 
                borderRadius: '4px',
                marginBottom: '0.5rem'
              }}>
                Node.js
              </div>
              <small>Runtime</small>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;