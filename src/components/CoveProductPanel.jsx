import React from 'react';
import { Sparkles, ShieldCheck, Zap, FileText } from 'lucide-react';

export default function CoveProductPanel() {
  return (
    <section className="cove-product-panel" id="about-cove">
      <div className="product-panel-container">
        
        {/* Section Header */}
        <div className="panel-badge">
          <Sparkles size={14} color="var(--luxury-gold)" />
          <span>WHAT IS COVE & WHY IT EXISTS</span>
        </div>

        <h2 className="panel-title">
          The Natural Search Concierge for <span className="luxury-gold-text">Malta Leases</span>
        </h2>

        <p className="panel-subtitle">
          Traditional real estate portals force you through rigid drop-down filters that miss the essence of what you want. COVE is an AI-first intelligence engine that understands natural human descriptions and matches you directly with verified Malta penthouses and villas.
        </p>

        {/* 3 Core Value Pillars */}
        <div className="panel-pillars-grid">
          <div className="pillar-card">
            <div className="pillar-icon-box">
              <Zap size={22} color="var(--luxury-gold)" />
            </div>
            <h3 className="pillar-title">Natural Language Matching</h3>
            <p className="pillar-desc">
              Describe your ideal home in natural sentences like <i>"Seafront penthouse in Sliema with a terrace, desk for remote work, under €2,200"</i>. No rigid filters needed.
            </p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon-box">
              <ShieldCheck size={22} color="var(--luxury-gold)" />
            </div>
            <h3 className="pillar-title">100% Verified Escrow Leases</h3>
            <p className="pillar-desc">
              Direct landlord verification eliminates rental fraud and duplicate listings. Every lease agreement is protected through verified escrow security.
            </p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon-box">
              <FileText size={22} color="var(--luxury-gold)" />
            </div>
            <h3 className="pillar-title">Instant Dossier Curation</h3>
            <p className="pillar-desc">
              COVE instantly synthesizes 3D virtual tour dossiers, key specifications, and direct landlord inquiry channels within seconds.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
