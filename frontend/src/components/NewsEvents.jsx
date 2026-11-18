import React from 'react';

export default function NewsEvents({ onAskNews }) {
  const newsItems = [
    {
      id: 1,
      date: "18 Nov 2026",
      tag: "Admissions",
      title: "Admissions Open for Undergraduate and Postgraduate Cohorts 2026-2027",
      snippet: "Applications are formally invited for Arts, Science, Commerce, Management, and Engineering programs across all six campuses."
    },
    {
      id: 2,
      date: "14 Nov 2026",
      tag: "Cultural Fest",
      title: "Christ University Announces Dates for National Cultural Festival 'In-Bloom 2027'",
      snippet: "Over 80 colleges from across India to participate in 50+ music, theatre, literary, and dance competitions."
    },
    {
      id: 3,
      date: "08 Nov 2026",
      tag: "Placements",
      title: "Placement Season 2026 Achieves 92% Placements with 500+ Corporate Recruiters",
      snippet: "Marquee companies including Microsoft, Amazon, Google, Deloitte, and Goldman Sachs visit Bengaluru Central Campus."
    }
  ];

  return (
    <section id="news" className="news-section" aria-label="Campus News and Events">
      <div className="section-container">
        <div className="section-header">
          <div className="accent-gold-dash center" />
          <h2 className="section-title">News & Campus Events</h2>
          <p className="section-subtitle">Stay informed with the latest happenings, academic milestones, and student life updates.</p>
        </div>

        <div className="news-grid">
          {newsItems.map((item) => (
            <article key={item.id} className="news-card">
              <div className="news-card-meta">
                <span className="news-tag">{item.tag}</span>
                <time className="news-date">{item.date}</time>
              </div>
              <h3 className="news-card-title">{item.title}</h3>
              <p className="news-card-snippet">{item.snippet}</p>
              <div className="news-card-footer">
                <span className="news-read-more">Read Full Story →</span>
                {onAskNews && (
                  <button 
                    className="news-ask-chip"
                    onClick={() => onAskNews(`Tell me more about ${item.title}`)}
                  >
                    Ask ChristBot
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
