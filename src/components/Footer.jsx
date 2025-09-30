import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-grid">
          <div className="footer-section">
            <h3>Climate Paradox Kenya</h3>
            <p>
              Raising awareness about Kenya's disproportionate vulnerability to climate change 
              despite minimal contribution to global emissions.
            </p>
          </div>
          
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul style={{ listStyle: 'none' }}>
              <li><a href="/" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</a></li>
              <li><a href="/data" style={{ color: 'white', textDecoration: 'none' }}>Climate Data</a></li>
              <li><a href="/stories" style={{ color: 'white', textDecoration: 'none' }}>Impact Stories</a></li>
              <li><a href="/petition" style={{ color: 'white', textDecoration: 'none' }}>Take Action</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Contact</h3>
            <p>Email: info@climateparadoxke.org</p>
            <p>Phone: +254 700 000 000</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2023 Climate Paradox Kenya. All rights reserved.</p>
          <p>Built with ❤️ for a sustainable future</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;