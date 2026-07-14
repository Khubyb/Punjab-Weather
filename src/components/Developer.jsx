import React from "react";

/**
 * Developer profile card. Replace the href values below with your
 * real GitHub / LinkedIn / portfolio links before publishing.
 */
export default function Developer() {
  return (
    <section id="developer" className="page-section">
      <h2 className="section-heading fade-in-up">Meet the Developer</h2>

      <div className="developer-card glass fade-in-up">
        <div className="developer-avatar">
          <i className="bx bxs-user-circle"></i>
        </div>
        <h3 className="developer-name">Muhammad Khubaib</h3>
        <p className="developer-role">Frontend Developer</p>
        <p className="developer-location">
          <i className="bx bx-flag"></i> Pakistan
        </p>

        <div className="developer-links">
          <a
            className="dev-btn"
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bx bxl-github"></i> GitHub
          </a>
          <a
            className="dev-btn"
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bx bxl-linkedin"></i> LinkedIn
          </a>
          <a
            className="dev-btn"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bx bx-globe"></i> Portfolio
          </a>
        </div>
      </div>
    </section>
  );
}
