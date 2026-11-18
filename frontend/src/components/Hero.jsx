import React, { useState } from 'react';

export default function Hero({ onExploreClick, onKnowMoreClick }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "CHRIST",
      subtitle: "(Deemed to be University)",
      motto: "Excellence and Service",
      description: "A Premier Deemed to be University, committed to holistic education, research and social transformation.",
      bgImage: "/images/hero_banner.jpg",
    },
    {
      title: "INNOVATION & RESEARCH",
      subtitle: "Empowering Next-Gen Scholars",
      motto: "Knowledge for Global Impact",
      description: "Over 15,000 research publications, cutting-edge laboratories, and interdisciplinary exploration across 6 campuses.",
      bgImage: "/images/hero_banner.jpg",
    },
    {
      title: "GLOBAL COLLABORATION",
      subtitle: "150+ International University Partners",
      motto: "Learning Beyond Borders",
      description: "Providing world-class semester exchange, dual-degree opportunities, and international research initiatives.",
      bgImage: "/images/hero_banner.jpg",
    },
    {
      title: "VIBRANT STUDENT LIFE",
      subtitle: "Culture, Leadership & Service",
      motto: "Holistic Student Development",
      description: "Home to India's most celebrated cultural fests In-Bloom and Darpan, alongside 45+ student-led development clubs.",
      bgImage: "/images/hero_banner.jpg",
    }
  ];

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const current = slides[currentSlide];

  return (
    <section id="home" className="hero-section" aria-label="Campus Hero Showcase">
      {/* Background Image with Cinematic Overlay */}
      <div 
        className="hero-background"
        style={{ backgroundImage: `url(${current.bgImage})` }}
      >
        <div className="hero-gradient-overlay" />
      </div>

      {/* Main Content Container */}
      <div className="hero-content-wrapper">
        <div className="hero-text-content">
          <h1 className="hero-heading">
            <span className="hero-title">{current.title}</span>
            <span className="hero-subtitle">{current.subtitle}</span>
          </h1>

          <p className="hero-motto">{current.motto}</p>
          
          <div className="hero-gold-divider" />

          <p className="hero-description">{current.description}</p>

          <div className="hero-cta-group">
            <a 
              href="#campus-life" 
              className="hero-btn-primary"
              onClick={onExploreClick}
            >
              <span>Explore Our Campus</span>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>

            <button 
              className="hero-btn-secondary"
              onClick={onKnowMoreClick}
              aria-label="Know More about Christ University"
            >
              <span>Know More</span>
              <span className="play-icon-wrap">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Left Carousel Arrow */}
      <button 
        className="carousel-arrow carousel-arrow-left" 
        onClick={handlePrev}
        aria-label="Previous Slide"
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      {/* Right Carousel Arrow */}
      <button 
        className="carousel-arrow carousel-arrow-right" 
        onClick={handleNext}
        aria-label="Next Slide"
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      {/* Slide Pagination Indicator Dots */}
      <div className="carousel-dots-container" role="tablist">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={`carousel-dot ${currentSlide === idx ? 'active' : ''}`}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            role="tab"
            aria-selected={currentSlide === idx}
          />
        ))}
      </div>
    </section>
  );
}
