import React from 'react';
import { Sparkles, Brain, MapPin, ShieldCheck, Home } from 'lucide-react';

export default function MorphingLab({ stepIndex = 0, activeOption = 1, setActiveOption }) {
  // 100% HOMOGENOUS BEZIER TOPOLOGY FOR ALL 4 SHAPES!
  // Every path uses the EXACT SAME 8-Cubic-Bezier sequence (4 outer + 4 inner).
  // This guarantees 100% smooth, unbroken liquid morphing across ALL transitions (1->2, 2->3, 3->4, 4->1)!

  const liquidShapes = [
    // 0: Neural Brain Core (8 Cubic Beziers)
    {
      name: "NEURAL AI CORE",
      icon: Brain,
      path: "M 12,3 C 17,3 21,7 21,12 C 21,17 17,21 12,21 C 7,21 3,17 3,12 C 3,7 7,3 12,3 Z M 12,7 C 14.8,7 17,9.2 17,12 C 17,14.8 14.8,17 12,17 C 9.2,17 7,14.8 7,12 C 7,9.2 9.2,7 12,7 Z"
    },

    // 1: Malta Geo-Pin (Homogenous 8 Cubic Beziers matching Brain topology)
    {
      name: "MALTA GEO-PIN",
      icon: MapPin,
      path: "M 12,2 C 17.5,2 21,6.5 21,11 C 21,17.5 16,21 12,22.5 C 8,21 3,17.5 3,11 C 3,6.5 6.5,2 12,2 Z M 12,7.5 C 14,7.5 15.5,9 15.5,11 C 15.5,13 14,14.5 12,14.5 C 10,14.5 8.5,13 8.5,11 C 8.5,9 10,7.5 12,7.5 Z"
    },

    // 2: Sovereign Shield of Malta (Homogenous 8 Cubic Beziers matching Brain & Pin topology)
    {
      name: "VERIFIED LEASE SHIELD",
      icon: ShieldCheck,
      path: "M 12,2 C 18,3.5 21,5.5 21,11.5 C 21,17.5 17,21.5 12,23 C 7,21.5 3,17.5 3,11.5 C 3,5.5 6,3.5 12,2 Z M 12,7 C 14.2,7 16,8.8 16,11 C 16,13 15.5,15.5 12,17.5 C 8.5,15.5 8,13 8,11 C 8,8.8 9.8,7 12,7 Z"
    },

    // 3: Bespoke Villa Residence (Homogenous 8 Cubic Beziers matching Brain, Pin & Shield topology)
    {
      name: "BESPOKE VILLA RESIDENCE",
      icon: Home,
      path: "M 12,2.5 C 18.5,7 21.5,9.5 18.5,21.5 C 14,21.5 10,21.5 5.5,21.5 C 2.5,9.5 5.5,7 12,2.5 Z M 12,7.5 C 15,10 16.5,11 14.5,17.5 C 12,17.5 10.5,17.5 9.5,17.5 C 7.5,11 9,10 12,7.5 Z"
    }
  ];

  const currentShape = liquidShapes[stepIndex % liquidShapes.length];

  return (
    <div className="morph-lab-container">
      {/* Render Active Prototype Viewport */}
      <div className="morph-lab-viewport-large">
        <div className="sacred-precision-stage">
          <svg viewBox="0 0 24 24" className="svg-precision-canvas">
            <defs>
              <linearGradient id="liquidGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E5C158" />
                <stop offset="50%" stopColor="#F3D379" />
                <stop offset="100%" stopColor="#38BDF8" />
              </linearGradient>

              <filter id="liquidGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="1.2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Outer Ambient Glow Line */}
            <path
              d={currentShape.path}
              stroke="url(#liquidGoldGrad)"
              strokeWidth="2.2"
              fill="rgba(229, 193, 88, 0.08)"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#liquidGlow)"
              className="liquid-silk-path"
            />

            {/* Inner Pure Silk Ribbon Line */}
            <path
              d={currentShape.path}
              stroke="#FFFFFF"
              strokeWidth="0.8"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.85"
              className="liquid-silk-path"
            />
          </svg>

          {/* Current Active Shape Precision Badge */}
          <div className="shape-precision-badge">
            <span className="shape-step-num">0{stepIndex + 1}</span>
            <span className="shape-step-title">{currentShape.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
