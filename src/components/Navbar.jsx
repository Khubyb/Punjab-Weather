import React, { useState } from "react";

/**
 * Sticky glass navbar with in-page section links and the
 * dark/light mode toggle.
 */
export default function Navbar({ activeSection, onNavigate, isDark, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { id: "home", label: "Home" },
    { id: "weather", label: "Weather" },
    { id: "about", label: "About" },
    { id: "developer", label: "Developer" },
  ];

  function handleNavigate(id) {
    onNavigate(id);
    setMenuOpen(false);
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand" onClick={() => handleNavigate("home")}>
          <i className="bx bxs-cloud-rain navbar-logo-icon"></i>
          <span>Punjab Weather Pro</span>
        </div>

        <nav className={`navbar-links ${menuOpen ? "open" : ""}`}>
          {links.map((link) => (
            <button
              key={link.id}
              className={`navbar-link ${activeSection === link.id ? "active" : ""}`}
              onClick={() => handleNavigate(link.id)}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="navbar-actions">
          <button
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label="Toggle dark mode"
            title="Toggle dark / light mode"
          >
            <i className={`bx ${isDark ? "bx-moon" : "bx-sun"}`}></i>
          </button>
          <button
            className="navbar-burger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle navigation menu"
          >
            <i className={`bx ${menuOpen ? "bx-x" : "bx-menu"}`}></i>
          </button>
        </div>
      </div>
    </header>
  );
}
