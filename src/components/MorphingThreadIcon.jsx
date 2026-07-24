import React, { useState, useEffect } from 'react';

export default function MorphingThreadIcon({ stepIndex = 0 }) {
  // 4 Continuous Geometric String Path Definitions (Brain -> Map Pin -> Shield -> Home)
  const paths = [
    // Shape 0: Continuous Neural Brain / Eye Node
    "M 12,4 C 7,4 3,8 3,12 C 3,16 7,20 12,20 C 17,20 21,16 21,12 C 21,8 17,4 12,4 Z M 12,8 C 14.2,8 16,9.8 16,12 C 16,14.2 14.2,16 12,16 C 9.8,16 8,14.2 8,12 C 8,9.8 9.8,8 12,8 Z",
    
    // Shape 1: Continuous Geometric Location Pin
    "M 12,2 C 7.5,2 4,5.5 4,10 C 4,16 12,22 12,22 C 12,22 20,16 20,10 C 20,5.5 16.5,2 12,2 Z M 12,7 C 13.65,7 15,8.35 15,10 C 15,11.65 13.65,13 12,13 C 10.35,13 9,11.65 9,10 C 9,8.35 10.35,7 12,7 Z",
    
    // Shape 2: Continuous Sacred Shield / Security Lock
    "M 12,2 L 4,5 V 11 C 4,16.5 7.4,21.7 12,23 C 16.6,21.7 20,16.5 20,11 V 5 L 12,2 Z M 12,7 C 13.7,7 15,8.3 15,10 V 12 L 16,12 V 17 L 8,17 V 12 L 9,12 V 10 C 9,8.3 10.3,7 12,7 Z",

    // Shape 3: Continuous Futuristic Diamond Residence / Home
    "M 12,3 L 21,10 L 18,21 L 6,21 L 3,10 Z M 12,8 L 16,12 L 14,18 L 10,18 L 8,12 Z"
  ];

  const currentPath = paths[stepIndex % paths.length];

  return (
    <div className="morph-thread-wrapper">
      <svg
        viewBox="0 0 24 24"
        className="morph-thread-svg"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="threadGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E5C158" />
            <stop offset="50%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#F3D379" />
          </linearGradient>
          <filter id="threadGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Continuous Rotating Laser Orbit */}
        <circle
          cx="12"
          cy="12"
          r="10.5"
          stroke="url(#threadGoldGradient)"
          strokeWidth="0.8"
          strokeDasharray="12 18"
          className="orbit-laser-ring"
        />

        {/* Main Morphing Continuous String Path */}
        <path
          d={currentPath}
          stroke="url(#threadGoldGradient)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#threadGlow)"
          className="continuous-string-path"
        />

        {/* Leading Laser Stardust Tip Follower */}
        <circle cx="12" cy="12" r="1.8" fill="#E5C158" className="stardust-lead-tip" />
      </svg>
    </div>
  );
}
