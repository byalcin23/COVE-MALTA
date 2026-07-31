import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ShieldCheck, Zap, FileText, Compass, CheckCircle2, ArrowRight } from 'lucide-react';

export default function CoveProductPanel() {
  const [activeStep, setActiveStep] = useState(0);
  const [matrixTransform, setMatrixTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0,0,0) scale(1)');
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

  // Apple Flagship 3D Perspective Matrix Parallax Scroll Calculation (Desktop)
  useEffect(() => {
    const handleScroll = () => {
      if (!panelRef.current) return;
      const rect = panelRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        const totalHeight = rect.height;
        const rawProgress = (windowHeight - rect.top) / (windowHeight + totalHeight);
        const progress = Math.min(Math.max(rawProgress, 0), 1);

        // Step switching
        const nextStep = Math.min(Math.floor(progress * steps.length), steps.length - 1);
        setActiveStep(nextStep);

        // Apple 3D Matrix Perspective Tilt Transform Formula:
        const rotX = (0.5 - progress) * 14;
        const rotY = (progress - 0.5) * 12;
        const translateY = (0.5 - progress) * 25;
        const translateZ = (progress - 0.5) * 40;
        const scale = 0.98 + (1 - Math.abs(progress - 0.5) * 2) * 0.04;

        setMatrixTransform(
          `perspective(1100px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translate3d(0, ${translateY.toFixed(2)}px, ${translateZ.toFixed(2)}px) scale(${scale.toFixed(3)})`
        );
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
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

        {/* DESKTOP 2-COLUMN STORYTELLER GRID */}
        <div className="apple-storyteller-grid desktop-only-storyteller">
          {/* LEFT COLUMN: INTERACTIVE NAVIGATION TABS */}
          <div className="story-nav-column">
            {steps.map((step, idx) => {
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

          {/* RIGHT COLUMN: APPLE 3D MATRIX PARALLAX DEMO SHOWCASE */}
          <div className="story-demo-column">
            <div
              className="apple-glass-card-preview 3d-matrix-card"
              style={{
                transform: matrixTransform,
                transition: 'transform 0.12s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <div className="glass-card-header">
                <div className="glass-dots">
                  <span className="dot dot-red" />
                  <span className="dot dot-yellow" />
                  <span className="dot dot-green" />
                </div>
                <span className="glass-card-title">
                  {steps[activeStep].badge} // 3D MATRIX PARALLAX
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
                <div className="footer-status">
                  <span className="status-dot-live" />
                  <span>COVE INTEL ENGINE ACTIVE</span>
                </div>
                <span className="footer-ver">v2.4 REALTIME</span>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE INTEGRATED STEP CARDS (PAIRED WITH ATTACHED DEMO PREVIEW) */}
        <div className="mobile-integrated-storyteller mobile-only-storyteller">
          {steps.map((step, idx) => (
            <div key={step.id} className="mobile-step-unit-card">
              <div className="story-tab-header">
                <span className="story-num">{step.num}</span>
                <span className="story-badge-tag">{step.badge}</span>
              </div>

              <h3 className="story-tab-title">{step.title}</h3>
              <p className="story-tab-desc">{step.desc}</p>

              {/* ATTACHED LIVE DEMO SHOWCASE CARD FOR THIS EXACT STEP */}
              <div className="mobile-attached-demo-box">
                <div className="glass-card-header">
                  <div className="glass-dots">
                    <span className="dot dot-red" />
                    <span className="dot dot-yellow" />
                    <span className="dot dot-green" />
                  </div>
                  <span className="glass-card-title">{step.badge}</span>
                </div>

                <div className="glass-card-body" style={{ padding: '16px' }}>
                  {idx === 0 && (
                    <div className="demo-step-1-content">
                      <div className="demo-input-prompt-box">
                        <Sparkles size={14} color="var(--luxury-gold)" />
                        <span style={{ fontSize: '0.82rem' }}>{step.demoContent.query}</span>
                      </div>
                      <div className="demo-tokens-grid" style={{ marginTop: '10px' }}>
                        {step.demoContent.parsedTokens.map((tok, i) => (
                          <div key={i} className="demo-token-pill">
                            <span className="token-key">{tok.key}:</span>
                            <span className="token-val">{tok.val}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {idx === 1 && (
                    <div className="demo-step-2-content">
                      <div className="demo-spatial-badge-box">
                        <Compass size={16} color="var(--luxury-gold)" />
                        <span style={{ fontSize: '0.82rem' }}>{step.demoContent.radius}</span>
                      </div>
                      <div className="demo-spatial-grid">
                        {step.demoContent.spatialData.map((item, i) => (
                          <div key={i} className="spatial-data-row">
                            <span className="spatial-label">{item.label}</span>
                            <span className="spatial-val">{item.val}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {idx === 2 && (
                    <div className="demo-step-3-content">
                      <div className="demo-escrow-certificate" style={{ padding: '12px' }}>
                        <ShieldCheck size={24} color="#10B981" />
                        <h4 style={{ fontSize: '0.86rem' }}>{step.demoContent.certificateTitle}</h4>
                        <p style={{ fontSize: '0.74rem' }}>Protected by Malta Housing Authority Verified Escrow Standards</p>
                      </div>
                      <div className="demo-guarantees-list" style={{ marginTop: '10px' }}>
                        {step.demoContent.guarantees.map((g, i) => (
                          <div key={i} className="guarantee-item" style={{ fontSize: '0.78rem' }}>
                            <CheckCircle2 size={15} color="#10B981" />
                            <span>{g}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
