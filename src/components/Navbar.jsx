import React, { useState, useRef, useEffect } from 'react';
import { Heart, Map, Palette, ChevronDown, Sparkles } from 'lucide-react';

export default function Navbar({ savedCount, onOpenMap, theme, setTheme, geometry, setGeometry }) {
  const [isStyleMenuOpen, setIsStyleMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const themes = [
    { id: 'porcelain-light', name: 'Porcelain Light', color: '#F8F9FA' },
    { id: 'nordic-light', name: 'Nordic Light', color: '#FBFBFA' },
    { id: 'sandstone-light', name: 'Sandstone Light', color: '#F7F5EE' },
    { id: 'obsidian-dark', name: 'Obsidian Dark', color: '#070D18' }
  ];

  const geometries = [
    { id: 'hybrid', label: '📐 Hybrid Curve (Default)' },
    { id: 'soft', label: '🟢 Soft Squircle (2026)' },
    { id: 'sharp', label: '🔲 Sharp Grid' }
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsStyleMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="navbar">
      {/* ELEVATED COVE BRAND EMBLEM LOGO */}
      <div className="brand-logo">
        <div className="brand-emblem-box">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 8C18.5 5.5 12.5 5.5 9.5 8.8C6.5 12.1 6.5 17.5 9.5 20.8C12.5 24.1 18.5 24.1 22 21.5" stroke="var(--luxury-gold)" strokeWidth="2.6" strokeLinecap="round"/>
            <circle cx="22" cy="8" r="2.4" fill="#059669"/>
          </svg>
        </div>

        <div className="brand-text-wrapper">
          <span className="brand-title">COVE</span>
          <span className="brand-subtitle-tag">MALTA • AI LEASE CONCIERGE</span>
        </div>
      </div>

      {/* NAV ACTIONS & COMPACT STYLE DROPDOWN MENU */}
      <div className="nav-actions">
        {/* COMPACT COLLAPSIBLE STYLE MENU DROPDOWN */}
        <div className="style-dropdown-container" ref={dropdownRef}>
          <button
            className={`nav-btn style-toggle-btn ${isStyleMenuOpen ? 'active-view' : ''}`}
            onClick={() => setIsStyleMenuOpen(!isStyleMenuOpen)}
            title="Custom Theme & Geometry Settings"
          >
            <Palette size={15} color="var(--luxury-gold)" />
            <span className="hide-on-tiny">Style Controls</span>
            <ChevronDown size={13} className={`dropdown-chevron ${isStyleMenuOpen ? 'open' : ''}`} />
          </button>

          {isStyleMenuOpen && (
            <div className="style-menu-popover">
              <div className="menu-group">
                <span className="menu-group-label">📐 2026 Edge Geometry</span>
                <div className="menu-geom-list">
                  {geometries.map((g) => (
                    <button
                      key={g.id}
                      className={`menu-geom-item ${geometry === g.id ? 'selected' : ''}`}
                      onClick={() => { setGeometry(g.id); setIsStyleMenuOpen(false); }}
                    >
                      <span>{g.label}</span>
                      {geometry === g.id && <Sparkles size={13} color="var(--luxury-gold)" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="menu-divider" />

              <div className="menu-group">
                <span className="menu-group-label">🎨 Color Palette</span>
                <div className="menu-theme-grid">
                  {themes.map((t) => (
                    <button
                      key={t.id}
                      className={`menu-theme-item ${theme === t.id ? 'selected' : ''}`}
                      onClick={() => { setTheme(t.id); setIsStyleMenuOpen(false); }}
                    >
                      <span className="theme-color-swatch" style={{ background: t.color }} />
                      <span>{t.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <button className="nav-btn" onClick={onOpenMap}>
          <Map size={15} />
          <span className="hide-on-tiny">Map View</span>
        </button>

        <button className="nav-btn">
          <Heart size={15} color="#FF4757" />
          <span>Saved ({savedCount})</span>
        </button>
      </div>
    </header>
  );
}
