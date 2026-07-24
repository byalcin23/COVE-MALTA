import React, { useState, useEffect } from 'react';
import { Sparkles, Layers, RefreshCw, Zap } from 'lucide-react';

export default function MorphingLab({ stepIndex = 0, activeOption = 2, setActiveOption }) {
  // Option 2: Sacred Geometry 12-Node Point Coordinates for 4 Icons
  // Exact 1 to 1 vertex mapping guarantees 100% fluid node migration physics!
  const nodeCoordinates = [
    // 0: Brain / Neural Ring (12 circular nodes)
    [
      { x: 12, y: 3 }, { x: 16.5, y: 4.2 }, { x: 19.8, y: 7.5 }, { x: 21, y: 12 },
      { x: 19.8, y: 16.5 }, { x: 16.5, y: 19.8 }, { x: 12, y: 21 }, { x: 7.5, y: 19.8 },
      { x: 4.2, y: 16.5 }, { x: 3, y: 12 }, { x: 4.2, y: 7.5 }, { x: 7.5, y: 4.2 }
    ],
    // 1: Map Pin (12 nodes outlining pin teardrop + inner eye)
    [
      { x: 12, y: 2 }, { x: 17, y: 4 }, { x: 20, y: 9 }, { x: 18, y: 14 },
      { x: 14, y: 18 }, { x: 12, y: 22 }, { x: 10, y: 18 }, { x: 6, y: 14 },
      { x: 4, y: 9 }, { x: 7, y: 4 }, { x: 12, y: 8 }, { x: 12, y: 12 }
    ],
    // 2: Sacred Shield (12 nodes outlining shield crest)
    [
      { x: 12, y: 2 }, { x: 16, y: 3.5 }, { x: 20, y: 5 }, { x: 20, y: 11 },
      { x: 18, y: 16 }, { x: 14, y: 20 }, { x: 12, y: 22 }, { x: 10, y: 20 },
      { x: 6, y: 16 }, { x: 4, y: 11 }, { x: 4, y: 5 }, { x: 8, y: 3.5 }
    ],
    // 3: Diamond Villa (12 nodes outlining luxury house crest)
    [
      { x: 12, y: 2 }, { x: 16.5, y: 5.5 }, { x: 21, y: 9.5 }, { x: 19.5, y: 15.5 },
      { x: 18, y: 21 }, { x: 12, y: 21 }, { x: 6, y: 21 }, { x: 4.5, y: 15.5 },
      { x: 3, y: 9.5 }, { x: 7.5, y: 5.5 }, { x: 12, y: 11 }, { x: 12, y: 17 }
    ]
  ];

  const currentNodes = nodeCoordinates[stepIndex % nodeCoordinates.length];

  // Helper to generate continuous SVG path string connecting all 12 migrating nodes
  const generatePathFromNodes = (nodes) => {
    return nodes.reduce((acc, point, i) => {
      return i === 0 ? `M ${point.x},${point.y}` : `${acc} L ${point.x},${point.y}`;
    }, "") + " Z";
  };

  return (
    <div className="morph-lab-container">
      {/* Option Selector Toolbar */}
      <div className="morph-lab-selector">
        <button
          className={`lab-opt-btn ${activeOption === 1 ? 'active' : ''}`}
          onClick={() => setActiveOption(1)}
        >
          <span>Option 1: Fluid Ribbon</span>
        </button>

        <button
          className={`lab-opt-btn ${activeOption === 2 ? 'active' : ''}`}
          onClick={() => setActiveOption(2)}
        >
          <Sparkles size={12} color="#E5C158" />
          <span>Option 2: Sacred Node Shift (Ultra-Smooth)</span>
        </button>

        <button
          className={`lab-opt-btn ${activeOption === 3 ? 'active' : ''}`}
          onClick={() => setActiveOption(3)}
        >
          <span>Option 3: Constellation Flux</span>
        </button>
      </div>

      {/* Render Active Prototype View */}
      <div className="morph-lab-viewport">
        {/* OPTION 1: FLUID QUANTUM RIBBON */}
        {activeOption === 1 && (
          <div className="opt-view opt-1-ribbon">
            <svg viewBox="0 0 24 24" className="svg-morph-canvas">
              <defs>
                <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E5C158" />
                  <stop offset="100%" stopColor="#38BDF8" />
                </linearGradient>
              </defs>
              <path
                d={generatePathFromNodes(currentNodes)}
                stroke="url(#ribbonGrad)"
                strokeWidth="1.8"
                fill="rgba(229, 193, 88, 0.08)"
                strokeDasharray="60"
                className="fluid-ribbon-path"
              />
            </svg>
          </div>
        )}

        {/* OPTION 2: SACRED GEOMETRY 12-NODE SHIFT (RECOMMENDED) */}
        {activeOption === 2 && (
          <div className="opt-view opt-2-sacred">
            <svg viewBox="0 0 24 24" className="svg-morph-canvas">
              <defs>
                <linearGradient id="sacredGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E5C158" />
                  <stop offset="50%" stopColor="#F3D379" />
                  <stop offset="100%" stopColor="#38BDF8" />
                </linearGradient>
                <filter id="sacredGlow">
                  <feGaussianBlur stdDeviation="1.2" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Connecting Laser String Line */}
              <path
                d={generatePathFromNodes(currentNodes)}
                stroke="url(#sacredGrad)"
                strokeWidth="1.4"
                fill="rgba(229, 193, 88, 0.06)"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#sacredGlow)"
                className="sacred-migrating-string"
              />

              {/* 12 Physical Migrating Golden Nodes */}
              {currentNodes.map((pt, i) => (
                <circle
                  key={i}
                  cx={pt.x}
                  cy={pt.y}
                  r="1.4"
                  fill="#E5C158"
                  className="sacred-migrating-node"
                  style={{
                    transitionDelay: `${i * 25}ms`
                  }}
                />
              ))}
            </svg>
          </div>
        )}

        {/* OPTION 3: CONSTELLATION STARDUST FLUX */}
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
                    transitionDelay: `${(i % 5) * 40}ms`
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
