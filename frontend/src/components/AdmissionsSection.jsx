import React from 'react';

export default function AdmissionsSection({ onAskAdmissions }) {
  const steps = [
    {
      num: "01",
      title: "Online Application",
      desc: "Register on the university portal, fill in candidate academic background, and upload required documents."
    },
    {
      num: "02",
      title: "Entrance Test (CUET)",
      desc: "Appear for the Christ University Entrance Test evaluating reasoning, quantitative skills, and domain proficiency."
    },
    {
      num: "03",
      title: "Skill Assessment & PI",
      desc: "Participate in Skill Assessment (SA), Micro Presentation (MP), and Personal Interview with academic faculty."
    },
    {
      num: "04",
      title: "Offer & Fee Payment",
      desc: "Receive admission offer based on composite score and confirm enrollment by submitting first installment tuition."
    }
  ];

  return (
    <section id="admissions" className="admissions-section" aria-label="Admissions 2026-2027">
      <div className="section-container">
        <div className="admissions-banner-card">
          <div className="admissions-header">
            <span className="admissions-pill">ADMISSIONS 2026-2027</span>
            <h2 className="admissions-heading">Begin Your Journey of Excellence</h2>
            <p className="admissions-lead">
              Join a distinguished community of scholars and professionals. Applications are open across all campuses.
            </p>
          </div>

          <div className="admissions-steps-grid">
            {steps.map((st) => (
              <div key={st.num} className="admissions-step-item">
                <span className="step-number">{st.num}</span>
                <h3 className="step-title">{st.title}</h3>
                <p className="step-desc">{st.desc}</p>
              </div>
            ))}
          </div>

          <div className="admissions-footer-actions">
            <a 
              href="https://christuniversity.in" 
              target="_blank" 
              rel="noreferrer" 
              className="admissions-main-btn"
            >
              Access Online Application Portal →
            </a>
            
            {onAskAdmissions && (
              <button 
                className="admissions-bot-help-btn"
                onClick={() => onAskAdmissions("What is the admission procedure, entrance test date and eligibility for 2026?")}
              >
                Chat with ChristBot for Admission Help 💬
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
