import React from 'react';
import { Heart, Map, Plus } from 'lucide-react';

export default function Navbar({ savedCount, onOpenMap, theme, setTheme, geometry, setGeometry }) {
  const themes = [
    { id: 'porcelain-light', name: 'Porcelain Light (Default)', color: '#F8F9FA' },
    { id: 'nordic-light', name: 'Nordic Light', color: '#FBFBFA' },
    { id: 'sandstone-light', name: 'Sandstone Light', color: '#F7F5EE' },
    { id: 'obsidian-dark', name: 'Obsidian Dark', color: '#070D18' }
  ];

  const geometries = [
    { id: 'soft', label: '🟢 Soft Squircle (2026)' },
    { id: 'sharp', label: '🔲 Sharp Grid' },
    { id: 'hybrid', label: '📐 Hybrid Curve' }
  ];

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

      {/* NAV ACTIONS & LIVE 2026 GEOMETRY + PALETTE SWITCHERS */}
      <div className="nav-actions">
        {/* 2026 Edge Geometry Switcher (Squircle Soft vs Sharp vs Hybrid) */}
        <div className="geometry-switcher-bar" title="Test 2026 Edge Geometry (Border Radius)">
          {geometries.map((g) => (
            <button
              key={g.id}
              className={`geom-btn ${geometry === g.id ? 'active' : ''}`}
              onClick={() => setGeometry(g.id)}
            >
              {g.label}
            </button>
          ))}
        </div>

        {/* 2026 Color Palette Switcher */}
        <div className="palette-switcher-bar" title="Test 2026 Color Palettes">
          {themes.map((t) => (
            <button
              key={t.id}
              className={`palette-btn ${theme === t.id ? 'active' : ''}`}
              style={{ background: t.color }}
              onClick={() => setTheme(t.id)}
              title={t.name}
            />
          ))}
        </div>

        <button className="nav-btn" onClick={onOpenMap}>
          <Map size={15} />
          <span>Interactive Map</span>
        </button>

        <button className="nav-btn">
          <Heart size={15} color="#FF4757" />
          <span>Saved ({savedCount})</span>
        </button>
      </div>
    </header>
  );
}
