import React, { useState } from 'react';

export default function Programmes({ onAskProgram }) {
  const [activeLevel, setActiveLevel] = useState('ug');

  const programsData = {
    ug: [
      {
        title: "B.Tech in Computer Science & AI",
        duration: "4 Years",
        campus: "Kengeri Campus",
        details: "Specialized streams in Machine Learning, Cloud Systems, and Cyber Security with industry-backed lab projects."
      },
      {
        title: "BCA (Bachelor of Computer Applications)",
        duration: "3-4 Years (Honours)",
        campus: "Central Campus",
        details: "Comprehensive curriculum covering Full Stack Engineering, Big Data, and Cloud DevOps."
      },
      {
        title: "BBA (Finance & Accountancy)",
        duration: "3 Years",
        campus: "Central & BGR Campuses",
        details: "Accredited integration with ACCA, UK and CIMA, preparing graduates for international corporate finance."
      },
      {
        title: "B.Com (Professional / Honours)",
        duration: "3-4 Years",
        campus: "Bangalore & Delhi NCR",
        details: "Premier commerce education with KPMG and EY business simulation labs."
      }
    ],
    pg: [
      {
        title: "Master of Business Administration (MBA)",
        duration: "2 Years",
        campus: "Central / Kengeri / Pune Lavasa",
        details: "Dual specializations in Marketing, Finance, HR, Business Analytics, and Lean Operations."
      },
      {
        title: "Master of Computer Applications (MCA)",
        duration: "2 Years",
        campus: "Central Campus",
        details: "Advanced software engineering, intelligent systems, microservices, and enterprise architecture."
      },
      {
        title: "M.Sc in Data Science & AI",
        duration: "2 Years",
        campus: "Pune Lavasa & Central",
        details: "Deep learning, predictive modeling, big data streaming, and applied research labs."
      },
      {
        title: "M.Sc in Clinical Psychology",
        duration: "2 Years",
        campus: "Central Campus",
        details: "Clinical rotations, neuropsychological assessment, psychopathology, and hospital internships."
      }
    ],
    phd: [
      {
        title: "Doctor of Philosophy (Ph.D.) in Computer Science",
        duration: "3-5 Years",
        campus: "Central & Kengeri",
        details: "Research areas: NLP, Computer Vision, Edge Computing, and Quantum Algorithms."
      },
      {
        title: "Doctor of Philosophy (Ph.D.) in Management Studies",
        duration: "3-5 Years",
        campus: "Central & BGR",
        details: "Research in Sustainable Finance, Strategic Marketing, and Organizational Behaviour."
      },
      {
        title: "Doctor of Philosophy (Ph.D.) in Psychology & Humanities",
        duration: "3-5 Years",
        campus: "Central Campus",
        details: "Advanced behavioral sciences, developmental psychology, and socio-cultural studies."
      }
    ]
  };

  return (
    <section id="academics" className="programmes-section" aria-label="Academic Programmes">
      <div className="section-container">
        <div className="section-header">
          <div className="accent-gold-dash center" />
          <h2 className="section-title">Academic Programmes</h2>
          <p className="section-subtitle">Empowering leaders through world-class, globally benchmarked higher education.</p>
          
          {/* Level Switcher Tabs */}
          <div className="program-tabs">
            <button 
              className={`program-tab-btn ${activeLevel === 'ug' ? 'active' : ''}`}
              onClick={() => setActiveLevel('ug')}
            >
              Undergraduate (UG)
            </button>
            <button 
              className={`program-tab-btn ${activeLevel === 'pg' ? 'active' : ''}`}
              onClick={() => setActiveLevel('pg')}
            >
              Postgraduate (PG)
            </button>
            <button 
              className={`program-tab-btn ${activeLevel === 'phd' ? 'active' : ''}`}
              onClick={() => setActiveLevel('phd')}
            >
              Doctoral Research (Ph.D.)
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="program-cards-grid">
          {programsData[activeLevel].map((prog, idx) => (
            <div key={idx} className="program-card">
              <div className="program-card-badges">
                <span className="badge-duration">{prog.duration}</span>
                <span className="badge-campus">{prog.campus}</span>
              </div>
              <h3 className="program-card-title">{prog.title}</h3>
              <p className="program-card-desc">{prog.details}</p>
              
              <div className="program-card-actions">
                <a href="#admissions" className="program-apply-link">
                  Apply Now →
                </a>
                {onAskProgram && (
                  <button 
                    className="program-ask-bot-btn"
                    onClick={() => onAskProgram(`Tell me about ${prog.title} admissions, eligibility and fees.`)}
                  >
                    Ask ChristBot
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
