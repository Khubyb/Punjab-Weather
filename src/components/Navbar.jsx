import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle.jsx';

const LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#weather', label: 'Weather' },
  { href: '#forecast', label: 'Forecast' },
  { href: '#map', label: 'Weather Map' },
  { href: '#about', label: 'About' }
];

export default function Navbar({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <a href="#home" className="brand">
          <span className="brand-mark">☀️</span>
          Punjab Weather
        </a>

        <nav>
          <ul className={`nav-links ${open ? 'open' : ''}`}>
            {LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-right">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            className="nav-toggle"
            aria-label="Toggle navigation menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>
      <div className="truck-stripe" />
    </header>
  );
}
