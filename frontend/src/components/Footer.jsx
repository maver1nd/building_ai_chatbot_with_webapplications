import React from 'react';

export default function Footer({ onOpenChat }) {
  return (
    <footer className="footer-container" aria-label="Christ University Footer">
      <div className="footer-main">
        <div className="section-container footer-grid">
          {/* Brand Info */}
          <div className="footer-col brand-col">
            <div className="footer-logo-wrap">
              <img 
                src="/images/christ_logo_full.svg" 
                alt="CHRIST (Deemed to be University)" 
                className="footer-logo-img"
              />
            </div>
            <p className="footer-motto-text">
              Excellence and Service — A Premier Deemed to be University declared under Section 3 of the UGC Act 1956.
            </p>
            <div className="footer-campus-list">
              <strong>Campuses:</strong> Bengaluru Central · Kengeri · Bannerghatta Road (BGR) · Yeshwanthpur · Delhi NCR · Pune Lavasa
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Academics & Admissions</h4>
            <ul className="footer-links">
              <li><a href="#academics">Undergraduate Degrees</a></li>
              <li><a href="#academics">Postgraduate Degrees</a></li>
              <li><a href="#academics">Doctoral Research (Ph.D.)</a></li>
              <li><a href="#admissions">Online Application Portal</a></li>
              <li><a href="#admissions">Entrance Test Syllabus</a></li>
              <li><a href="#admissions">Fee Structure & Scholarships</a></li>
            </ul>
          </div>

          {/* Campus Resources */}
          <div className="footer-col">
            <h4 className="footer-heading">Campus Life</h4>
            <ul className="footer-links">
              <li><a href="#campus-life">Knowledge Centres (Libraries)</a></li>
              <li><a href="#campus-life">Student Residence & Hostels</a></li>
              <li><a href="#news">Cultural Fests: In-Bloom & Darpan</a></li>
              <li><a href="#campus-life">Centre for Social Action (CSA)</a></li>
              <li><a href="#placements">Placement & Career Cell</a></li>
              <li><a href="#global">Office of International Affairs</a></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="footer-col contact-col">
            <h4 className="footer-heading">Contact University</h4>
            <address className="footer-address">
              <strong>Central Campus:</strong><br />
              Hosur Road, Bengaluru - 560029,<br />
              Karnataka, India.
            </address>
            <div className="footer-contact-item">
              <span className="contact-label">Phone:</span>
              <span>+91 80 4012 9100 / 9600</span>
            </div>
            <div className="footer-contact-item">
              <span className="contact-label">Admissions:</span>
              <span>+91 80 4012 9281 / 9282</span>
            </div>
            <div className="footer-contact-item">
              <span className="contact-label">Email:</span>
              <a href="mailto:mail@christuniversity.in">mail@christuniversity.in</a>
            </div>

            <button 
              className="footer-chat-launcher"
              onClick={onOpenChat}
            >
              Ask ChristBot Assistant 💬
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar & Privacy Notice (NFR-PRIV-001) */}
      <div className="footer-bottom-bar">
        <div className="section-container footer-bottom-inner">
          <p className="copyright-text">
            © {new Date().getFullYear()} CHRIST (Deemed to be University). All rights reserved. Recreated for engineering demonstration.
          </p>
          <div className="footer-privacy-notice">
            <span className="privacy-badge">Privacy Notice:</span>
            <span>Anonymous sessions are kept for conversational context only. Do not submit sensitive personal identifiers.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
