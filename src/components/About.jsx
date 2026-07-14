import React from "react";

const FEATURES = [
  { icon: "bx bx-map-alt", text: "Covers every city and district in Punjab, Pakistan" },
  { icon: "bx bx-time", text: "Real-time current conditions, hourly and 7-day forecasts" },
  { icon: "bx bx-air-conditioner", text: "Air Quality Index, UV index, and detailed atmospherics" },
  { icon: "bx bx-moon", text: "Dark mode with a smooth animated transition" },
  { icon: "bx bx-heart", text: "Favorite cities and searchable history" },
  { icon: "bx bx-devices", text: "Fully responsive, from mobile to large desktop displays" },
];

const STACK = [
  { icon: "bx bxl-react", label: "React" },
  { icon: "bx bxl-javascript", label: "JavaScript (ES6)" },
  { icon: "bx bxl-html5", label: "HTML5" },
  { icon: "bx bxl-css3", label: "CSS3" },
  { icon: "bx bx-cloud", label: "OpenWeatherMap API" },
];

export default function About() {
  return (
    <section id="about" className="page-section">
      <h2 className="section-heading fade-in-up">About Punjab Weather Pro</h2>
      <p className="section-subheading fade-in-up">
        Punjab Weather Pro is a premium, glassmorphic weather experience built
        for every city and district across Punjab, Pakistan — from major
        hubs like Lahore and Multan to smaller towns like Renala Khurd and
        Talagang.
      </p>

      <div className="about-grid">
        <div className="about-card glass fade-in-up">
          <h3><i className="bx bx-star"></i> Features</h3>
          <ul>
            {FEATURES.map((f) => (
              <li key={f.text}>
                <i className={f.icon}></i> {f.text}
              </li>
            ))}
          </ul>
        </div>

        <div className="about-card glass fade-in-up">
          <h3><i className="bx bx-code-alt"></i> Technology Used</h3>
          <div className="stack-badges">
            {STACK.map((s) => (
              <span className="stack-badge" key={s.label}>
                <i className={s.icon}></i> {s.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
