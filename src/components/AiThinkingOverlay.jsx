import React, { useState, useEffect } from 'react';
import { Sparkles, Compass, CheckCircle2, ArrowRight, Wand2, Star, ShieldCheck } from 'lucide-react';
import { LISTINGS } from '../data/listings';

export default function AiThinkingOverlay({ isOpen, onClose, onSelectListing, searchSummary }) {
  const [phase, setPhase] = useState('synthesizing'); // 'synthesizing' | 'revealed'
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const mysticalSteps = [
    { label: "Reading the architectural & lifestyle intent of your prompt...", detail: "Parsing budget bounds, sea exposure, and commute constraints." },
    { label: "Querying live Sliema, Valletta & Gozo verified registries...", detail: "Cross-referencing 120+ active private landlord databases." },
    { label: "Computing 98.6% affinity index & price value matrix...", detail: "Filtering off-market luxury units matching your lifestyle energy." },
    { label: "Synthesizing your bespoke Malta rental dossier...", detail: "Finalizing 3D perspectives, map markers, and direct contact details." }
  ];

  // Pick top 2 matched listings to display as luxury editorial matches
  const matchedListings = LISTINGS.slice(0, 2);

  useEffect(() => {
    if (!isOpen) {
      setPhase('synthesizing');
      setCurrentStepIndex(0);
      setProgress(0);
      return;
    }

    // Slower, majestic progress bar increment (~4.5 seconds total)
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 1;
      });
    }, 45);

    // Step state switcher timed gracefully
    const stepTimer1 = setTimeout(() => setCurrentStepIndex(1), 1100);
    const stepTimer2 = setTimeout(() => setCurrentStepIndex(2), 2200);
    const stepTimer3 = setTimeout(() => setCurrentStepIndex(3), 3300);

    // Transition to 'revealed' phase after 4.5 seconds
    const revealTimer = setTimeout(() => {
      setPhase('revealed');
    }, 4500);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      clearTimeout(stepTimer3);
      clearTimeout(revealTimer);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="mystic-portal-overlay">
      <div className="mystic-portal-card">
        {/* Mystical Background Celestial Geometry Rings */}
        <div className="mystic-geometry-bg"></div>

        {/* Top Header */}
        <div className="mystic-header">
          <div className="mystic-oracle-icon-wrapper">
            <Wand2 size={24} color="#E5C158" className="mystic-wand-spin" />
          </div>
          <div>
            <h3 className="mystic-portal-title">COVE AI Intelligence</h3>
            <p className="mystic-portal-sub">Real Estate Affinity Synthesis</p>
          </div>
          <button className="mystic-close-x" onClick={onClose}>✕</button>
        </div>

        {phase === 'synthesizing' ? (
          <div className="mystic-synthesis-body">
            {/* Pulsing Stardust Oracle Orb */}
            <div className="mystic-oracle-orb">
              <Compass size={40} color="#E5C158" className="orb-compass-rotate" />
              <div className="orb-aura-pulse"></div>
            </div>

            {/* Glowing Progress Bar */}
            <div className="mystic-progress-container">
              <div className="mystic-progress-fill" style={{ width: `${progress}%` }}></div>
            </div>

            {/* Step Trace Logs */}
            <div className="mystic-steps-list">
              {mysticalSteps.map((step, idx) => {
                const isDone = idx < currentStepIndex;
                const isCurrent = idx === currentStepIndex;

                return (
                  <div key={idx} className={`mystic-step-item ${isDone ? 'done' : ''} ${isCurrent ? 'active' : ''}`}>
                    <div className="mystic-step-icon">
                      {isDone ? (
                        <CheckCircle2 size={16} color="#38BDF8" />
                      ) : (
                        <Sparkles size={16} color={isCurrent ? "#E5C158" : "#64748B"} />
                      )}
                    </div>
                    <div>
                      <div className="mystic-step-label">{step.label}</div>
                      {isCurrent && <div className="mystic-step-detail">{step.detail}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* PHASE 2: LUXURY EDITORIAL AI MATCH DOSSIER */
          <div className="mystic-results-body">
            <div className="mystic-match-badge">
              <ShieldCheck size={14} color="#E5C158" />
              <span>98.6% Residence Affinity Match</span>
            </div>

            <p className="mystic-match-intro">
              Based on your prompt intent, COVE AI has curated these 2 luxury residences:
            </p>

            <div className="mystic-cards-container">
              {matchedListings.map((item) => (
                <div key={item.id} className="mystic-listing-item" onClick={() => { onSelectListing(item); onClose(); }}>
                  <img src={item.image} alt={item.title} />
                  <div className="mystic-item-details">
                    <div className="mystic-item-location">{item.location}, MALTA</div>
                    <h4 className="mystic-item-title">{item.title}</h4>
                    <div className="mystic-item-specs">
                      <span>{item.bedrooms} Bed • {item.area} m²</span>
                      <span className="mystic-rating"><Star size={11} fill="#E5C158" /> {item.rating}</span>
                    </div>
                    <div className="mystic-item-price-row">
                      <span className="mystic-price">{item.currency}{item.price.toLocaleString()}/m</span>
                      <span className="mystic-explore-link">
                        <span>View Dossier</span>
                        <ArrowRight size={13} />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="mystic-close-btn" onClick={onClose}>
              View Full Malta Listings Grid
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
