import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ShieldCheck, Zap, FileText, Compass, CheckCircle2, ArrowRight } from 'lucide-react';

export default function CoveProductPanel() {
  const [activeStep, setActiveStep] = useState(0);
  const panelRef = useRef(null);

  const steps = [
    {
      id: 'step-1',
      num: '01',
      badge: 'PROMPT INTELLIGENCE',
      title: 'Natural Human Language Understanding',
      desc: 'No more clicking through 20 rigid drop-down menus. Simply type or speak your dream home request in plain English. COVE’s NLP engine extracts your budget, location preferences, and lifestyle needs in milliseconds.',
      icon: Zap,
      demoContent: {
        query: '"3-bedroom seafront penthouse in Sliema with a private jacuzzi terrace & garage"',
        parsedTokens: [
          { key: 'Property Type', val: 'Penthouse' },
          { key: 'Target Location', val: 'Sliema Seafront' },
          { key: 'Bedrooms', val: '3 Beds' },
          { key: 'Key Amenity', val: 'Private Jacuzzi Terrace' },
          { key: 'Parking', val: 'Lock-Up Garage' }
        ]
      }
    },
    {
      id: 'step-2',
      num: '02',
      badge: '3D SPATIAL SCANNING',
      title: '3D Sea View & Architectural Verification',
      desc: 'COVE cross-references real-time GIS satellite data and architectural floorplans to verify true unobstructed sea view radiuses, balcony sun orientation, and walking distances to business hubs.',
      icon: Compass,
      demoContent: {
        radius: '180° Unobstructed Mediterranean Panorama',
        spatialData: [
          { label: 'Marina Distance', val: '120 Meters (2 Min Walk)' },
          { label: 'Sun Exposure', val: 'South-Facing Afternoon Sun' },
          { label: 'Energy Rating', val: 'Class A++ High Efficiency' },
          { label: 'Acoustic Index', val: 'Quiet Residential Street' }
        ]
      }
    },
    {
      id: 'step-3',
      num: '03',
      badge: 'ESCROW SECURITY',
      title: 'Direct Landlord Verification & Escrow Protection',
      desc: 'Eliminate duplicate listings, fake deposits, and rental scams. Every rental agreement on COVE undergoes direct landlord identity validation and verified escrow deposit protection.',
      icon: ShieldCheck,
      demoContent: {
        certificateTitle: 'MALTA VERIFIED LEASE CERTIFICATE',
        guarantees: [
          'Direct Landlord Identity Verified ✔',
          'Zero Rental Deposit Fraud Escrow ✔',
          'Standardized Maltese Housing Authority Contract ✔',
          'Instant Digital Booking & Key Handover ✔'
        ]
      }
    }
  ];

  // Auto-switch steps as user scrolls down the section
  useEffect(() => {
    const handleScroll = () => {
      if (!panelRef.current) return;
      const rect = panelRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight * 0.6 && rect.bottom > 0) {
        const totalHeight = rect.height;
        const progress = Math.min(Math.max((windowHeight * 0.5 - rect.top) / totalHeight, 0), 0.99);
        const nextStep = Math.floor(progress * steps.length);
        setActiveStep(nextStep);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [steps.length]);

  return (
    <section className="cove-product-panel apple-storytelling-section" id="about-cove" ref={panelRef}>
      <div className="product-panel-container">
        
        {/* Section Header */}
        <div className="panel-header-center">
          <div className="panel-badge">
            <Sparkles size={14} color="var(--luxury-gold)" />
            <span>THE COVE AI INTELLIGENCE SYSTEM</span>
          </div>

          <h2 className="panel-title">
            The Natural Search Concierge for <span className="luxury-gold-text">Malta Leases</span>
          </h2>

          <p className="panel-subtitle">
            Traditional real estate portals force you through 30 drop-down filters that miss what you actually want. COVE is an AI-first intelligence engine that understands natural human descriptions and matches you directly with verified Malta penthouses and villas.
          </p>
        </div>

        {/* APPLE-STYLE INTERACTIVE SCROLL STORYTELLER */}
        <div className="apple-storyteller-grid">
          
          {/* LEFT COLUMN: INTERACTIVE NAVIGATION TABS */}
          <div className="story-nav-column">
            {steps.map((step, idx) => {
              const IconComp = step.icon;
              const isActive = activeStep === idx;

              return (
                <div
                  key={step.id}
                  className={`story-tab-card ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveStep(idx)}
                >
                  <div className="story-tab-header">
                    <span className="story-num">{step.num}</span>
                    <span className="story-badge-tag">{step.badge}</span>
                  </div>

                  <h3 className="story-tab-title">{step.title}</h3>
                  <p className="story-tab-desc">{step.desc}</p>

                  <div className="story-tab-indicator">
                    <div className="indicator-progress-fill" style={{ width: isActive ? '100%' : '0%' }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT COLUMN: DYNAMIC PREVIEW DEMO SHOWCASE */}
          <div className="story-demo-column">
            <div className="apple-glass-card-preview">
              <div className="glass-card-header">
                <div className="glass-dots">
                  <span className="dot dot-red" />
                  <span className="dot dot-yellow" />
                  <span className="dot dot-green" />
                </div>
                <span className="glass-card-title">
                  {steps[activeStep].badge} // LIVE DEMO
                </span>
              </div>

              <div className="glass-card-body">
                {activeStep === 0 && (
                  <div className="demo-step-1-content">
                    <div className="demo-input-prompt-box">
                      <Sparkles size={16} color="var(--luxury-gold)" />
                      <span>{steps[0].demoContent.query}</span>
                    </div>

                    <div className="demo-tokens-header">
                      <span>▶ AI PARSED INTENT TOKENS</span>
                    </div>

                    <div className="demo-tokens-grid">
                      {steps[0].demoContent.parsedTokens.map((tok, i) => (
                        <div key={i} className="demo-token-pill">
                          <span className="token-key">{tok.key}:</span>
                          <span className="token-val">{tok.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeStep === 1 && (
                  <div className="demo-step-2-content">
                    <div className="demo-spatial-badge-box">
                      <Compass size={18} color="var(--luxury-gold)" />
                      <span>{steps[1].demoContent.radius}</span>
                    </div>

                    <div className="demo-spatial-grid">
                      {steps[1].demoContent.spatialData.map((item, i) => (
                        <div key={i} className="spatial-data-row">
                          <span className="spatial-label">{item.label}</span>
                          <span className="spatial-val">{item.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeStep === 2 && (
                  <div className="demo-step-3-content">
                    <div className="demo-escrow-certificate">
                      <ShieldCheck size={28} color="#10B981" />
                      <h4>{steps[2].demoContent.certificateTitle}</h4>
                      <p>Protected by Malta Housing Authority Verified Escrow Standards</p>
                    </div>

                    <div className="demo-guarantees-list">
                      {steps[2].demoContent.guarantees.map((g, i) => (
                        <div key={i} className="guarantee-item">
                          <CheckCircle2 size={16} color="#10B981" />
                          <span>{g}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="glass-card-footer">
                <span className="footer-status">STATUS: VERIFIED & READY FOR BOOKING</span>
                <button
                  className="demo-action-btn"
                  onClick={() => {
                    const searchElem = document.querySelector('.search-input');
                    if (searchElem) {
                      searchElem.value = steps[activeStep].demoContent.query || 'Seafront apartment in Sliema';
                      searchElem.dispatchEvent(new Event('input', { bubbles: true }));
                    }
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <span>Try In Live Search</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
