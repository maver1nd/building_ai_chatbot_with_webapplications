import React from 'react';

export default function CampusLife({ onDiscoverMore }) {
  const cards = [
    {
      id: 1,
      image: '/images/card1_tower.png',
      alt: 'Christ University Central Campus Tower and architecture',
      caption: 'World-Class Campus'
    },
    {
      id: 2,
      image: '/images/card2_students.png',
      alt: 'Students collaborating outdoors with laptops on university steps',
      caption: 'Dynamic Community'
    },
    {
      id: 3,
      image: '/images/card3_dancers.png',
      alt: 'Students performing traditional Indian dance at national cultural fest In-Bloom',
      caption: 'Cultural Vibrance'
    }
  ];

  return (
    <section id="campus-life" className="campus-life-section" aria-label="Campus Life Overview">
      <div className="campus-life-container">
        {/* Left Editorial Column */}
        <div className="campus-life-editorial">
          <div className="accent-gold-dash" />
          
          <h2 className="campus-life-heading">A Vibrant Campus Life</h2>
          
          <p className="campus-life-subheading">Learn. Grow. Belong.</p>
          
          <p className="campus-life-description">
            Experience a dynamic campus culture with world-class infrastructure, diverse communities and endless opportunities.
          </p>

          <a 
            href="#campus-activities" 
            className="discover-more-btn"
            onClick={onDiscoverMore}
          >
            <span>Discover More</span>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>

        {/* Right Gallery Cards */}
        <div className="campus-life-gallery">
          {cards.map((card) => (
            <div key={card.id} className="campus-card">
              <div className="campus-card-image-wrap">
                <img 
                  src={card.image} 
                  alt={card.alt} 
                  className="campus-card-img" 
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
