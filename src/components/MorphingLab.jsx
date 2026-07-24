import React, { useState } from 'react';
import { Sparkles, Brain, MapPin, ShieldCheck, Home } from 'lucide-react';

export default function MorphingLab({ stepIndex = 0, activeOption = 2, setActiveOption }) {
  // Option 2: 16 High-Precision Geometric Coordinates for 4 Iconic Shapes
  // Carefully engineered 16-point vectors so every icon is 100% crisp & instantly recognizable!
  const precisionNodes = [
    // 0: Neural Brain / AI Core (Crisp Octagonal Core + Outer Satellite Nodes)
    {
      name: "NEURAL AI CORE",
      icon: Brain,
      nodes: [
        { x: 12, y: 3 },  { x: 16, y: 4.5 }, { x: 19.5, y: 8 }, { x: 21, y: 12 },
        { x: 19.5, y: 16 },{ x: 16, y: 19.5 },{ x: 12, y: 21 }, { x: 8, y: 19.5 },
        { x: 4.5, y: 16 }, { x: 3, y: 12 },  { x: 4.5, y: 8 }, { x: 8, y: 4.5 },
        // Inner Core Nodes
        { x: 12, y: 8 },  { x: 16, y: 12 },  { x: 12, y: 16 }, { x: 8, y: 12 }
      ]
    },

    // 1: Precision Malta Location Pin (Teardrop contour + central focal point)
    {
      name: "MALTA GEO-PIN",
      icon: MapPin,
      nodes: [
        { x: 12, y: 2 },  { x: 16.5, y: 3.5 },{ x: 20, y: 8 },   { x: 20, y: 12 },
        { x: 17, y: 16 }, { x: 14, y: 19 },  { x: 12, y: 22 }, { x: 10, y: 19 },
        { x: 7, y: 16 },  { x: 4, y: 12 },   { x: 4, y: 8 },   { x: 7.5, y: 3.5 },
        // Inner Pin Core Ring
        { x: 12, y: 8 },  { x: 14.5, y: 10.5 },{ x: 12, y: 13 },{ x: 9.5, y: 10.5 }
      ]
    },

    // 2: Sovereign Shield of Malta (Heraldic sharp crest)
    {
      name: "VERIFIED LEASE SHIELD",
      icon: ShieldCheck,
      nodes: [
        { x: 12, y: 2 },  { x: 16.5, y: 3 },  { x: 21, y: 4 },  { x: 21, y: 11 },
        { x: 19, y: 16.5 },{ x: 15.5, y: 20.5 },{ x: 12, y: 22.5 },{ x: 8.5, y: 20.5 },
        { x: 5, y: 16.5 }, { x: 3, y: 11 },   { x: 3, y: 4 },   { x: 7.5, y: 3 },
        // Inner Shield Security Cross
        { x: 12, y: 6 },  { x: 16, y: 11 },   { x: 12, y: 16 }, { x: 8, y: 11 }
      ]
    },

    // 3: Luxury Penthouse Residence (Sharp architectural roof, balcony & base)
    {
      name: "BESPOKE VILLA RESIDENCE",
      icon: Home,
      nodes: [
        { x: 12, y: 2 },  { x: 17, y: 6.5 }, { x: 22, y: 11 }, { x: 22, y: 13 },
        { x: 19, y: 13 }, { x: 19, y: 21 }, { x: 12, y: 21 }, { x: 5, y: 21 },
        { x: 5, y: 13 },  { x: 2, y: 13 },   { x: 2, y: 11 },  { x: 7, y: 6.5 },
        // Inner Architectural Window/Door
        { x: 12, y: 7 },  { x: 15, y: 14 },  { x: 12, y: 17 }, { x: 9, y: 14 }
      ]
    }
  ];

  const currentShape = precisionNodes[stepIndex % precisionNodes.length];
  const currentNodes = currentShape.nodes;

  // Generate outer perimeter path from first 12 nodes
  const outerPath = currentNodes.slice(0, 12).reduce((acc, point, i) => {
    return i === 0 ? `M ${point.x},${point.y}` : `${acc} L ${point.x},${point.y}`;
  }, "") + " Z";

  // Generate inner core path from last 4 nodes
  const innerPath = currentNodes.slice(12, 16).reduce((acc, point, i) => {
    return i === 0 ? `M ${point.x},${point.y}` : `${acc} L ${point.x},${point.y}`;
  }, "") + " Z";

  return (
    <div className="morph-lab-container">
      {/* Option Selector Toolbar */}
      <div className="morph-lab-selector">
        <button
          className={`lab-opt-btn ${activeOption === 2 ? 'active' : ''}`}
          onClick={() => setActiveOption(2)}
        >
          <Sparkles size={12} color="#E5C158" />
          <span>Option 2: High-Precision Sacred Shift</span>
        </button>

        <button
          className={`lab-opt-btn ${activeOption === 1 ? 'active' : ''}`}
          onClick={() => setActiveOption(1)}
        >
          <span>Option 1: Fluid Ribbon</span>
        </button>

        <button
          className={`lab-opt-btn ${activeOption === 3 ? 'active' : ''}`}
          onClick={() => setActiveOption(3)}
        >
          <span>Option 3: Stardust Flux</span>
        </button>
      </div>

      {/* Render Active Prototype Viewport */}
      <div className="morph-lab-viewport-large">
        {/* OPTION 2: HIGH-PRECISION SACRED NODE SHIFT (ENHANCED) */}
        {activeOption === 2 && (
          <div className="sacred-precision-stage">
            <svg viewBox="0 0 24 24" className="svg-precision-canvas">
              <defs>
                <linearGradient id="precisionGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E5C158" />
                  <stop offset="60%" stopColor="#F3D379" />
                  <stop offset="100%" stopColor="#38BDF8" />
                </linearGradient>
                <filter id="precisionGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Structural Cross-Spoke Lattice (Connects outer nodes to inner core for crisp geometry!) */}
              {currentNodes.slice(0, 4).map((outerPt, idx) => {
                const innerPt = currentNodes[12 + idx];
                return (
                  <line
                    key={`spoke-${idx}`}
                    x1={outerPt.x}
                    y1={outerPt.y}
                    x2={innerPt.x}
                    y2={innerPt.y}
                    stroke="rgba(229, 193, 88, 0.25)"
                    strokeWidth="0.8"
                    strokeDasharray="2 2"
                    className="sacred-spoke-line"
                  />
                );
              })}

              {/* Crisp Outer Perimeter Contour */}
              <path
                d={outerPath}
                stroke="url(#precisionGold)"
                strokeWidth="1.8"
                fill="rgba(229, 193, 88, 0.07)"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#precisionGlow)"
                className="sacred-migrating-string"
              />

              {/* Crisp Inner Core Contour */}
              <path
                d={innerPath}
                stroke="url(#precisionGold)"
                strokeWidth="1.4"
                fill="rgba(56, 189, 248, 0.12)"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="sacred-migrating-string"
              />

              {/* 16 High-Precision Migrating Golden Nodes */}
              {currentNodes.map((pt, i) => (
                <circle
                  key={i}
                  cx={pt.x}
                  cy={pt.y}
                  r={i >= 12 ? "1.6" : "1.3"}
                  fill={i >= 12 ? "#38BDF8" : "#E5C158"}
                  className="sacred-migrating-node"
                  style={{
                    transitionDelay: `${(i % 4) * 30}ms`
                  }}
                />
              ))}
            </svg>

            {/* Current Active Shape Precision Badge */}
            <div className="shape-precision-badge">
              <span className="shape-step-num">0{stepIndex + 1}</span>
              <span className="shape-step-title">{currentShape.name}</span>
            </div>
          </div>
        )}

        {/* OPTION 1: FLUID RIBBON */}
        {activeOption === 1 && (
          <div className="opt-view opt-1-ribbon">
            <svg viewBox="0 0 24 24" className="svg-morph-canvas">
              <path
                d={outerPath}
                stroke="#E5C158"
                strokeWidth="1.8"
                fill="rgba(229, 193, 88, 0.08)"
                className="fluid-ribbon-path"
              />
            </svg>
          </div>
        )}

        {/* OPTION 3: STARDUST FLUX */}
        {activeOption === 3 && (
          <div className="opt-view opt-3-flux">
            <div className="stardust-flux-box">
              {currentNodes.map((pt, i) => (
                <div
                  key={i}
                  className="flux-particle"
                  style={{
                    left: `${(pt.x / 24) * 100}%`,
                    top: `${(pt.y / 24) * 100}%`,
                    transitionDelay: `${(i % 4) * 40}ms`
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
