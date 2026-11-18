import React, { useState } from 'react';

export default function Navbar({ onOpenChat }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

  const navLinks = [
    { name: 'Home', href: '#home', hasDropdown: false },
    { name: 'About', href: '#about', hasDropdown: true },
    { name: 'Academics', href: '#academics', hasDropdown: true },
    { name: 'Admissions', href: '#admissions', hasDropdown: true },
    { name: 'Campus Life', href: '#campus-life', hasDropdown: true },
    { name: 'Research', href: '#research', hasDropdown: true },
    { name: 'News & Events', href: '#news', hasDropdown: true },
  ];

  return (
    <header className="navbar-container">
      <div className="navbar-inner">
        {/* Brand / Logo */}
        <a href="#home" className="brand-logo" aria-label="Christ University Homepage">
          <img 
            src="/images/christ_logo_full.svg" 
            alt="CHRIST (Deemed to be University)" 
            className="brand-logo-img"
          />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.name} className="nav-item">
                <a
                  href={link.href}
                  className={`nav-link ${activeTab === link.name ? 'active' : ''}`}
                  onClick={() => setActiveTab(link.name)}
                >
                  {link.name}
                  {link.hasDropdown && (
                    <svg className="dropdown-caret" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  )}
                </a>
                {activeTab === link.name && <span className="active-indicator" />}
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Controls (Search + Apply Now) */}
        <div className="nav-actions">
          {/* Search Button */}
          <button className="search-btn" aria-label="Search site">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>

          {/* Apply Now CTA */}
          <a href="#admissions" className="apply-now-btn">
            <span>Apply Now</span>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              {mobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer">
          <ul className="mobile-nav-list">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="mobile-nav-link"
                  onClick={() => {
                    setActiveTab(link.name);
                    setMobileMenuOpen(false);
                  }}
                >
                  {link.name}
                  {link.hasDropdown && <span>▾</span>}
                </a>
              </li>
            ))}
            <li className="mobile-cta-item">
              <a 
                href="#admissions" 
                className="mobile-apply-btn"
                onClick={() => setMobileMenuOpen(false)}
              >
                Apply Now →
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
