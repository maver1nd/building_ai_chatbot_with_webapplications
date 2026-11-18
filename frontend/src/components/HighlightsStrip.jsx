import React from 'react';

export default function HighlightsStrip({ onSelectCategory }) {
  const highlights = [
    {
      id: 'academics',
      title: 'Academics',
      href: '#academics',
      icon: (
        <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="#1F3A93" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
          <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
        </svg>
      )
    },
    {
      id: 'admissions',
      title: 'Admissions',
      href: '#admissions',
      icon: (
        <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="#1F3A93" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      )
    },
    {
      id: 'research',
      title: 'Research',
      href: '#research',
      icon: (
        <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="#1F3A93" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 18h8"></path>
          <path d="M3 22h18"></path>
          <path d="M14 22a7 7 0 1 0 0-14h-1"></path>
          <path d="M9 14h2"></path>
          <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2"></path>
          <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"></path>
        </svg>
      )
    },
    {
      id: 'student-life',
      title: 'Student Life',
      href: '#campus-life',
      icon: (
        <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="#1F3A93" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
          <path d="M4 22h16"></path>
          <path d="M10 14.66V17c0 .55-.45 1-1 1H7v2h10v-2h-2c-.55 0-1-.45-1-1v-2.34"></path>
          <path d="M18 4H6v7a6 6 0 0 0 12 0V4z"></path>
        </svg>
      )
    },
    {
      id: 'global-outreach',
      title: 'Global Outreach',
      href: '#global',
      icon: (
        <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="#1F3A93" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
      )
    },
    {
      id: 'placements',
      title: 'Placements',
      href: '#placements',
      icon: (
        <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="#1F3A93" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 15h2"></path>
          <path d="M18 11l-5-5-5 5"></path>
          <path d="M12 20h.01"></path>
          <path d="M19 14v1a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3v-1"></path>
          <path d="M7 11.5L12 16l5-4.5"></path>
        </svg>
      )
    }
  ];

  return (
    <div className="highlights-strip-section" aria-label="University Highlights Quick Navigation">
      <div className="highlights-strip-container">
        {highlights.map((item, index) => (
          <a
            key={item.id}
            href={item.href}
            className="highlight-card"
            onClick={() => onSelectCategory && onSelectCategory(item.id)}
          >
            <div className="highlight-icon-wrapper">
              {item.icon}
            </div>
            <span className="highlight-title">{item.title}</span>
            {index < highlights.length - 1 && <span className="highlight-card-divider" />}
          </a>
        ))}
      </div>
    </div>
  );
}
