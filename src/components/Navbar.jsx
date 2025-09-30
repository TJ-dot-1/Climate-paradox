import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link to="/" className="logo">
          🌍 Climate Paradox KE
        </Link>
        
        <ul className="nav-links">
          <li>
            <Link to="/" className={isActive('/') ? 'active' : ''}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/data" className={isActive('/data') ? 'active' : ''}>
              Data & Charts
            </Link>
          </li>
          <li>
            <Link to="/stories" className={isActive('/stories') ? 'active' : ''}>
              Stories
            </Link>
          </li>
          <li>
            <Link to="/petition" className={isActive('/petition') ? 'active' : ''}>
              Take Action
            </Link>
          </li>
          <li>
            <Link to="/about" className={isActive('/about') ? 'active' : ''}>
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;