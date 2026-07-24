import React, { useState } from 'react';
import { Heart, Map, Plus, ChevronDown } from 'lucide-react';

export default function Navbar({ savedCount, onOpenMap, onResetSearch, selectedLogoIndex, setSelectedLogoIndex }) {
  const [showLogoPicker, setShowLogoPicker] = useState(false);

  const logoOptions = [
    {
      id: 1,
      name: "Option 1: The Architectural 'C' Monogram",
      subtitle: "Knight Frank / Sotheby's Style (Golden Architectural Curve)",
      svg: (
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 8C18.5 5.5 12.5 5.5 9.5 8.8C6.5 12.1 6.5 17.5 9.5 20.8C12.5 24.1 18.5 24.1 22 21.5" stroke="#E5C158" strokeWidth="2.2" strokeLinecap="round"/>
          <circle cx="22" cy="8" r="2.2" fill="#38BDF8"/>
        </svg>
      )
    },
    {
      id: 2,
      name: "Option 2: The Sovereign Diamond Crest",
      subtitle: "Christie's International Style (Geometrical Wealth Shield)",
      svg: (
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 2L28 16L16 30L4 16L16 2Z" stroke="#E5C158" strokeWidth="1.8" strokeLinejoin="round"/>
          <path d="M10 16H22" stroke="#38BDF8" strokeWidth="1.6" strokeLinecap="round"/>
          <path d="M16 10V22" stroke="#E5C158" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      id: 3,
      name: "Option 3: The Coastal Cove Wave Arch",
      subtitle: "Engel & Völkers / Mediterranean Style (Sea & Horizon)",
      svg: (
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 16C4 9.37258 9.37258 4 16 4C22.6274 4 28 9.37258 28 16" stroke="#E5C158" strokeWidth="2.2" strokeLinecap="round"/>
          <path d="M9 21H23" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="16" cy="11" r="2" fill="#E5C158"/>
        </svg>
      )
    },
    {
      id: 4,
      name: "Option 4: Interlocking C+M Heritage Halo",
      subtitle: "Savills / Private Office Monogram (Halo Shield)",
      svg: (
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="13" stroke="#E5C158" strokeWidth="1.6"/>
          <path d="M11 11C8.8 13.2 8.8 18.8 11 21" stroke="#E5C158" strokeWidth="2" strokeLinecap="round"/>
          <path d="M15 21V12L18.5 17L22 12V21" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ];

  const currentLogo = logoOptions[selectedLogoIndex || 0];

  return (
    <header className="navbar">
      <div style={{ position: 'relative' }}>
        <div 
          className="brand-logo" 
          onClick={() => setShowLogoPicker(!showLogoPicker)}
          title="Click to toggle logo options"
        >
          <div className="logo-pure-svg">
            {currentLogo.svg}
          </div>

          <div className="brand-logo-text">
            <span className="brand-title">COVE</span>
            <span className="brand-subtitle">MALTA</span>
          </div>

          <ChevronDown size={14} color="#E5C158" style={{ marginLeft: '4px', transition: 'transform 0.2s', transform: showLogoPicker ? 'rotate(180deg)' : 'none' }} />
        </div>

        {/* Logo Picker Dropdown */}
        {showLogoPicker && (
          <div className="logo-picker-dropdown">
            <div className="picker-header">SELECT PRESTIGE LOGO STYLE</div>
            {logoOptions.map((item, idx) => (
              <div 
                key={item.id} 
                className={`picker-option ${selectedLogoIndex === idx ? 'active' : ''}`}
                onClick={() => {
                  setSelectedLogoIndex(idx);
                  setShowLogoPicker(false);
                }}
              >
                <div style={{ flexShrink: 0 }}>{item.svg}</div>
                <div>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.88rem' }}>{item.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{item.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="nav-actions">
        <button className="nav-btn" onClick={onOpenMap}>
          <Map size={15} color="#38BDF8" />
          <span>Interactive Map</span>
        </button>

        <button className="nav-btn">
          <Heart size={15} color={savedCount > 0 ? "#FF4757" : "currentColor"} fill={savedCount > 0 ? "#FF4757" : "none"} />
          <span>Saved ({savedCount})</span>
        </button>

        <button className="nav-btn nav-btn-primary">
          <Plus size={15} />
          <span>List Residence</span>
        </button>
      </div>
    </header>
  );
}
