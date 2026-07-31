import React, { useEffect, useRef } from 'react';

export default function MorphingLab({ stepIndex = 0 }) {
  // Homogenous Bezier Control Points for Liquid SVG Morphing
  const liquidShapes = [
    // 0: Neural AI Core
    "M 12,3 C 17,3 21,7 21,12 C 21,17 17,21 12,21 C 7,21 3,17 3,12 C 3,7 7,3 12,3 Z M 12,7 C 14.8,7 17,9.2 17,12 C 17,14.8 14.8,17 12,17 C 9.2,17 7,14.8 7,12 C 7,9.2 9.2,7 12,7 Z",
    // 1: Malta Geo-Pin
    "M 12,2 C 17.5,2 21,6.5 21,11 C 21,17.5 16,21 12,22.5 C 8,21 3,17.5 3,11 C 3,6.5 6.5,2 12,2 Z M 12,7.5 C 14,7.5 15.5,9 15.5,11 C 15.5,13 14,14.5 12,14.5 C 10,14.5 8.5,13 8.5,11 C 8.5,9 10,7.5 12,7.5 Z",
    // 2: Verified Lease Shield
    "M 12,2 C 18,3.5 21,5.5 21,11.5 C 21,17.5 17,21.5 12,23 C 7,21.5 3,17.5 3,11.5 C 3,5.5 6,3.5 12,2 Z M 12,7 C 14.2,7 16,8.8 16,11 C 16,13 15.5,15.5 12,17.5 C 8.5,15.5 8,13 8,11 C 8,8.8 9.8,7 12,7 Z",
    // 3: Bespoke Villa Residence
    "M 12,2.5 C 17.5,6.5 20.5,9 20.5,13.5 C 20.5,18.5 16.5,21.5 12,21.5 C 7.5,21.5 3.5,18.5 3.5,13.5 C 3.5,9 6.5,6.5 12,2.5 Z M 12,8 C 14.5,10 15.5,12 15.5,14.5 C 15.5,16.5 14,17.5 12,17.5 C 10,17.5 8.5,16.5 8.5,14.5 C 8.5,12 9.5,10 12,8 Z"
  ];

  const outerAnimRef = useRef(null);
  const innerAnimRef = useRef(null);

  const prevStepRef = useRef(stepIndex);
  const currentPath = liquidShapes[stepIndex % liquidShapes.length];
  const prevPath = liquidShapes[prevStepRef.current % liquidShapes.length];

  useEffect(() => {
    if (prevStepRef.current !== stepIndex) {
      if (outerAnimRef.current && innerAnimRef.current) {
        outerAnimRef.current.beginElement();
        innerAnimRef.current.beginElement();
      }
      prevStepRef.current = stepIndex;
    }
  }, [stepIndex]);

  return (
    <div className="morph-stage-wrapper">
      <div className="morph-fixed-icon-box">
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

          {/* Outer Ambient Glow Line with SVG SMIL Liquid Morphing */}
          <path
            d={currentPath}
            stroke="url(#liquidGoldGrad)"
            strokeWidth="2.2"
            fill="rgba(229, 193, 88, 0.08)"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#liquidGlow)"
          >
            <animate
              ref={outerAnimRef}
              attributeName="d"
              from={prevPath}
              to={currentPath}
              dur="0.55s"
              fill="freeze"
              calcMode="spline"
              keySplines="0.4 0 0.2 1"
            />
          </path>

          {/* Inner Pure Silk Ribbon Line */}
          <path
            d={currentPath}
            stroke="#FFFFFF"
            strokeWidth="0.8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.85"
          >
            <animate
              ref={innerAnimRef}
              attributeName="d"
              from={prevPath}
              to={currentPath}
              dur="0.55s"
              fill="freeze"
              calcMode="spline"
              keySplines="0.4 0 0.2 1"
            />
          </path>
        </svg>
      </div>
    </div>
  );
}
