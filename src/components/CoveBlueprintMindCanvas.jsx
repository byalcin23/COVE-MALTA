import React, { useEffect, useRef } from 'react';

export default function CoveBlueprintMindCanvas({ isCanvasExpanded = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    // Pool of 6 Malta Architectural Blueprint Schematics
    const schematics = [
      {
        id: 'CAD-88',
        type: 'floorplan',
        title: 'SLIEMA SEAFRONT PENTHOUSE // CAD-88',
        xRatio: 0.15,
        yRatio: 0.28,
        scale: 0.88,
        rot: -0.04,
        specs: ['145 m²', '3 BEDS', 'ESCROW VERIFIED'],
        logs: ['▶ SYNCHRONIZING ESCROW LEASE CONTRACT', '▶ COMPUTING SEA VIEW AFFINITY (98.6%)']
      },
      {
        id: 'CAD-14',
        type: 'elevation',
        title: 'VALLETTA HERITAGE PALAZZO // CAD-14',
        xRatio: 0.84,
        yRatio: 0.26,
        scale: 0.84,
        rot: 0.03,
        specs: ['HISTORIC BALCONY', '35.8983° N', 'AFFINITY 99.1%'],
        logs: ['▶ SCANNING ARCHITECTURAL BALCONY SPECS', '▶ VERIFYING DIRECT LANDLORD IDENTITY']
      },
      {
        id: 'CAD-03',
        type: 'villa',
        title: 'GOZO SANCTUARY VILLA // CAD-03',
        xRatio: 0.52,
        yRatio: 0.78,
        scale: 0.9,
        rot: -0.02,
        specs: ['280 m²', 'PRIVATE POOL', 'ESCROW READY'],
        logs: ['▶ UPDATING GOZO SANCTUARY AVAILABILITY', '▶ INDEXING PRIVATE POOL & TERRACE SPECS']
      },
      {
        id: 'CAD-42',
        type: 'citadel',
        title: 'MDINA CITADEL APARTMENT // CAD-42',
        xRatio: 0.22,
        yRatio: 0.74,
        scale: 0.82,
        rot: 0.02,
        specs: ['STONE ARCH', '110 m²', 'QUIET STREET'],
        logs: ['▶ INDEXING MDINA HISTORIC STONE ARCH', '▶ VERIFYING ESCROW SECURITY DEPOSIT']
      },
      {
        id: 'CAD-67',
        type: 'duplex',
        title: 'ST. JULIAN\'S SEAFRONT DUPLEX // CAD-67',
        xRatio: 0.78,
        yRatio: 0.72,
        scale: 0.85,
        rot: -0.03,
        specs: ['BAY VIEW', '2 BEDS', 'GARAGE INCLUDED'],
        logs: ['▶ VERIFYING GARAGE & MARINA PARKING', '▶ MATCHING SEA VIEW INQUIRY TOKENS']
      },
      {
        id: 'CAD-29',
        type: 'suite',
        title: 'MELLIEĦA BAY LUXURY SUITE // CAD-29',
        xRatio: 0.48,
        yRatio: 0.22,
        scale: 0.84,
        rot: 0.01,
        specs: ['160 m²', 'SANDY BEACH', 'PANORAMA'],
        logs: ['▶ INDEXING MELLIEĦA BAY PANORAMA', '▶ SYNCHRONIZING LANDLORD VERIFICATION']
      }
    ];

    const verifiedNodes = new Set(['CAD-88', 'CAD-14']);

    // Organic Deep-Water Buoyant Synaptic Tendrils
    const tendrilCount = 5;
    const tendrils = [];

    for (let i = 0; i < tendrilCount; i++) {
      tendrils.push({
        baseX: (i / (tendrilCount - 1)) * 0.8 + 0.1,
        speed: 0.00015 + Math.random() * 0.0002,
        phaseOffset: Math.random() * Math.PI * 2,
        waveFreq: 0.5 + Math.random() * 0.5,
        targetSchematicIdx: i % schematics.length,
        biolumPulse: Math.random(),
        pulseSpeed: 0.003 + Math.random() * 0.003
      });
    }

    // Ambient Floating Neural Particles
    const nodesCount = 18;
    const nodes = [];
    for (let i = 0; i < nodesCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
        radius: Math.random() * 1.8 + 0.8,
        pulse: Math.random() * Math.PI * 2
      });
    }

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);

    // Draw Vector Floorplan
    const drawFloorplan = (cx, cy, s) => {
      ctx.beginPath();
      ctx.rect(cx - 85 * s, cy - 55 * s, 170 * s, 110 * s);
      ctx.moveTo(cx - 25 * s, cy - 55 * s);
      ctx.lineTo(cx - 25 * s, cy + 55 * s);
      ctx.moveTo(cx + 85 * s, cy - 55 * s);
      ctx.lineTo(cx + 110 * s, cy - 55 * s);
      ctx.lineTo(cx + 110 * s, cy + 55 * s);
      ctx.lineTo(cx + 85 * s, cy + 55 * s);
      ctx.arc(cx - 25 * s, cy + 18 * s, 18 * s, 0, Math.PI / 2);
      ctx.stroke();
    };

    // Draw Vector Elevation
    const drawElevation = (cx, cy, s) => {
      ctx.beginPath();
      ctx.rect(cx - 75 * s, cy - 28 * s, 150 * s, 65 * s);
      ctx.moveTo(cx - 85 * s, cy - 28 * s);
      ctx.lineTo(cx, cy - 65 * s);
      ctx.lineTo(cx + 85 * s, cy - 28 * s);
      ctx.rect(cx - 45 * s, cy - 8 * s, 22 * s, 32 * s);
      ctx.rect(cx + 22 * s, cy - 8 * s, 22 * s, 32 * s);
      ctx.stroke();
    };

    // Main 60FPS Render Loop
    let time = 0;
    const render = () => {
      // PERMANENT CONSTANT PEACEFUL FLOW SPEED
      const timeIncrement = 0.004;
      time += timeIncrement;

      // Detect current theme mode from DOM data-theme attribute
      const rootElem = document.querySelector('.app-container');
      const currentTheme = rootElem ? rootElem.getAttribute('data-theme') : 'porcelain-light';
      const isLightMode = currentTheme && currentTheme.includes('light');

      // Adaptive Color & Stroke Scheme (INTENSIFIES DURING SYNTHESIS MODE)
      const colors = isLightMode ? {
        grid: isCanvasExpanded ? 'rgba(5, 150, 105, 0.18)' : 'rgba(15, 23, 42, 0.09)',
        tendril: isCanvasExpanded ? 'rgba(5, 150, 105, 0.85)' : 'rgba(5, 150, 105, 0.55)',
        orb: isCanvasExpanded ? '#059669' : 'rgba(5, 150, 105, 0.9)',
        badge: 'rgba(5, 150, 105, 0.9)',
        strokeVerified: isCanvasExpanded ? 'rgba(5, 150, 105, 0.9)' : 'rgba(5, 150, 105, 0.65)',
        strokeUnverified: isCanvasExpanded ? 'rgba(5, 150, 105, 0.5)' : 'rgba(15, 23, 42, 0.35)',
        titleVerified: 'rgba(5, 150, 105, 1)',
        titleUnverified: 'rgba(15, 23, 42, 0.65)',
        log: 'rgba(15, 23, 42, 0.85)',
        spec: 'rgba(15, 23, 42, 0.55)',
        particle: isCanvasExpanded ? '#059669' : 'rgba(5, 150, 105, 0.35)'
      } : {
        grid: isCanvasExpanded ? 'rgba(229, 193, 88, 0.12)' : 'rgba(56, 189, 248, 0.03)',
        tendril: isCanvasExpanded ? 'rgba(229, 193, 88, 0.75)' : 'rgba(56, 189, 248, 0.2)',
        orb: isCanvasExpanded ? '#E5C158' : 'rgba(229, 193, 88, 0.85)',
        badge: 'rgba(56, 189, 248, 0.5)',
        strokeVerified: isCanvasExpanded ? 'rgba(229, 193, 88, 0.75)' : 'rgba(56, 189, 248, 0.25)',
        strokeUnverified: isCanvasExpanded ? 'rgba(229, 193, 88, 0.4)' : 'rgba(56, 189, 248, 0.1)',
        titleVerified: 'rgba(229, 193, 88, 0.85)',
        titleUnverified: 'rgba(56, 189, 248, 0.3)',
        log: 'rgba(56, 189, 248, 0.55)',
        spec: 'rgba(255, 255, 255, 0.16)',
        particle: 'rgba(229, 193, 88, 0.35)'
      };

      // Parallax lerp calculation
      mouse.x += (mouse.targetX - mouse.x) * 0.025;
      mouse.y += (mouse.targetY - mouse.y) * 0.025;

      const offsetX = (mouse.x - width / 2) * 0.02;
      const offsetY = (mouse.y - height / 2) * 0.02;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw CAD Blueprint Grid Lines
      const gridStep = 54;
      ctx.lineWidth = isLightMode ? 0.8 : 0.6;
      ctx.strokeStyle = colors.grid;

      for (let x = (offsetX % gridStep); x < width; x += gridStep) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = (offsetY % gridStep); y < height; y += gridStep) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Render Fluid Synaptic Tendrils with Accelerated Waves during Search Synthesis
      tendrils.forEach((t, idx) => {
        t.biolumPulse += t.pulseSpeed * (isCanvasExpanded ? 3 : 1);

        const startX = t.baseX * width + offsetX * 0.4;
        const startY = height + 40;

        const sch = schematics[t.targetSchematicIdx];
        const destX = sch.xRatio * width + offsetX * (sch.scale * 1.2);
        const destY = sch.yRatio * height + offsetY * (sch.scale * 1.2);

        // Accelerated wave undulation during search
        const waveMultiplier = isCanvasExpanded ? 2.5 : 1;
        const cp1x = startX + Math.sin(time * t.waveFreq * waveMultiplier + t.phaseOffset) * (isCanvasExpanded ? 75 : 45);
        const cp1y = startY - (height * 0.4);
        const cp2x = destX + Math.cos(time * t.waveFreq * 0.8 * waveMultiplier + t.phaseOffset) * (isCanvasExpanded ? 75 : 45);
        const cp2y = destY + (height * 0.3);

        ctx.save();
        ctx.strokeStyle = colors.tendril;
        ctx.lineWidth = isCanvasExpanded ? (isLightMode ? 2.8 : 2.0) : (isLightMode ? 1.8 : 1.2);
        ctx.setLineDash([8, 6]);

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, destX, destY);
        ctx.stroke();
        ctx.restore();

        // Rapid Bioluminescent Energy Orbs
        const speedMultiplier = isCanvasExpanded ? 1.8 : 0.4;
        const tParam = (Math.sin(time * speedMultiplier + idx) + 1) / 2;
        const oneMinusT = 1 - tParam;
        
        const orbX = Math.pow(oneMinusT, 3) * startX +
                     3 * Math.pow(oneMinusT, 2) * tParam * cp1x +
                     3 * oneMinusT * Math.pow(tParam, 2) * cp2x +
                     Math.pow(tParam, 3) * destX;

        const orbY = Math.pow(oneMinusT, 3) * startY +
                     3 * Math.pow(oneMinusT, 2) * tParam * cp1y +
                     3 * oneMinusT * Math.pow(tParam, 2) * cp2y +
                     Math.pow(tParam, 3) * destY;

        ctx.beginPath();
        ctx.fillStyle = colors.orb;
        ctx.arc(orbX, orbY, isCanvasExpanded ? 5.5 : (isLightMode ? 3.8 : 3.0), 0, Math.PI * 2);
        ctx.fill();

        if (tParam > 0.85) {
          verifiedNodes.add(sch.id);
        }
      });

      // 3. Render Architectural Blueprints with Accelerated Vectors
      schematics.forEach((sch, idx) => {
        const isVerified = verifiedNodes.has(sch.id);

        const driftX = Math.sin(time * (isCanvasExpanded ? 0.2 : 0.05) + idx) * (isCanvasExpanded ? 8 : 4);
        const driftY = Math.cos(time * (isCanvasExpanded ? 0.16 : 0.04) + idx) * (isCanvasExpanded ? 6 : 3);

        const cx = sch.xRatio * width + offsetX * (sch.scale * 1.2) + driftX;
        const cy = sch.yRatio * height + offsetY * (sch.scale * 1.2) + driftY;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(sch.rot);

        // Permanent Verified Badge
        if (isVerified || isCanvasExpanded) {
          ctx.fillStyle = colors.badge;
          ctx.font = isLightMode ? 'bold 9.5px "JetBrains Mono", monospace' : '8.5px "JetBrains Mono", monospace';
          ctx.textAlign = 'center';
          ctx.fillText(`[ ✔ INDEXED & ESCROW READY ]`, 0, -95 * sch.scale);
        }

        // Blueprint Vector Stroke
        ctx.strokeStyle = (isVerified || isCanvasExpanded) ? colors.strokeVerified : colors.strokeUnverified;
        ctx.lineWidth = (isVerified || isCanvasExpanded) ? (isLightMode ? 2.4 : 1.6) : (isLightMode ? 1.8 : 1.0);
        ctx.setLineDash([4, 4]);

        if (sch.type === 'floorplan' || sch.type === 'duplex') {
          drawFloorplan(0, 0, sch.scale);
        } else if (sch.type === 'elevation' || sch.type === 'citadel') {
          drawElevation(0, 0, sch.scale);
        } else {
          drawFloorplan(0, 0, sch.scale * 0.85);
        }

        ctx.setLineDash([]);

        // Blueprint Title
        ctx.font = isLightMode ? 'bold 10.5px "JetBrains Mono", monospace' : '9.5px "JetBrains Mono", monospace';
        ctx.fillStyle = (isVerified || isCanvasExpanded) ? colors.titleVerified : colors.titleUnverified;
        ctx.textAlign = 'left';
        ctx.fillText(sch.title, -85 * sch.scale, -65 * sch.scale);

        // Technical Specs / Real-Time Live Logs
        if (isVerified || isCanvasExpanded) {
          sch.logs.forEach((logLine, logIdx) => {
            ctx.fillStyle = colors.log;
            ctx.fillText(logLine, -85 * sch.scale, 75 * sch.scale + logIdx * 12);
          });
        } else {
          sch.specs.forEach((sp, specIdx) => {
            ctx.fillStyle = colors.spec;
            ctx.fillText(`• ${sp}`, -85 * sch.scale, 75 * sch.scale + specIdx * 12);
          });
        }

        ctx.restore();
      });

      // 4. Render Ambient AI Particles
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx * (isCanvasExpanded ? 4 : 1);
        n.y += n.vy * (isCanvasExpanded ? 4 : 1);
        n.pulse += isCanvasExpanded ? 0.04 : 0.008;

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        const pulseScale = Math.sin(n.pulse) * 0.3 + 1;

        ctx.beginPath();
        ctx.fillStyle = colors.particle;
        ctx.arc(n.x + offsetX, n.y + offsetY, n.radius * pulseScale * (isCanvasExpanded ? 1.5 : 1), 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [isCanvasExpanded]);

  return <canvas ref={canvasRef} className={`spacetime-canvas ${isCanvasExpanded ? 'is-synthesizing' : ''}`} />;
}
