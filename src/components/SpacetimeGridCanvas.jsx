import React, { useEffect, useRef } from 'react';

export default function SpacetimeGridCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse positions (real vs lerp smooth)
    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2, active: false };

    const GRID_SPACING = 42; // Grid cell size
    const WARP_RADIUS = 200; // Gravitational warp influence radius
    const WARP_FORCE = 38;   // Maximum displacement pixels

    let gridNodes = [];

    // Initialize Spacetime Grid Nodes
    const initGrid = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      gridNodes = [];

      const cols = Math.ceil(width / GRID_SPACING) + 2;
      const rows = Math.ceil(height / GRID_SPACING) + 2;

      for (let r = -1; r < rows; r++) {
        for (let c = -1; c < cols; c++) {
          const baseX = c * GRID_SPACING;
          const baseY = r * GRID_SPACING;
          gridNodes.push({
            baseX,
            baseY,
            x: baseX,
            y: baseY,
            vx: 0,
            vy: 0,
            r,
            c
          });
        }
      }
    };

    initGrid();

    // Mouse Listeners
    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const handleResize = () => {
      initGrid();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    // 60FPS Physics Simulation Loop
    const render = () => {
      // Smooth lerp mouse target
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      ctx.clearRect(0, 0, width, height);

      // Update node positions with Spacetime Warp physics
      for (let i = 0; i < gridNodes.length; i++) {
        const node = gridNodes[i];

        const dx = mouse.x - node.baseX;
        const dy = mouse.y - node.baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let targetX = node.baseX;
        let targetY = node.baseY;

        if (mouse.active && dist < WARP_RADIUS) {
          // Gravitational warp factor (quadratic falloff)
          const factor = (1 - dist / WARP_RADIUS);
          const angle = Math.atan2(dy, dx);
          // Push grid nodes outward smoothly
          const pushAmount = factor * factor * WARP_FORCE;

          targetX = node.baseX - Math.cos(angle) * pushAmount;
          targetY = node.baseY - Math.sin(angle) * pushAmount;
        }

        // Spring return physics towards target
        node.x += (targetX - node.x) * 0.08;
        node.y += (targetY - node.y) * 0.08;
      }

      // Render Subtle Grid Lines & Nodes
      const cols = Math.ceil(width / GRID_SPACING) + 2;

      // Draw subtle grid mesh connections
      ctx.lineWidth = 0.5;

      for (let i = 0; i < gridNodes.length; i++) {
        const node = gridNodes[i];

        // Draw horizontal line to right neighbor
        if (i % cols !== cols - 1 && i + 1 < gridNodes.length) {
          const rightNode = gridNodes[i + 1];
          const distMouse = Math.hypot(mouse.x - node.x, mouse.y - node.y);
          const opacity = Math.max(0.03, Math.min(0.22, 1 - distMouse / 280)) * 0.45;

          ctx.beginPath();
          ctx.strokeStyle = `rgba(212, 175, 55, ${opacity})`;
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(rightNode.x, rightNode.y);
          ctx.stroke();
        }

        // Draw vertical line to bottom neighbor
        if (i + cols < gridNodes.length) {
          const bottomNode = gridNodes[i + cols];
          const distMouse = Math.hypot(mouse.x - node.x, mouse.y - node.y);
          const opacity = Math.max(0.03, Math.min(0.22, 1 - distMouse / 280)) * 0.45;

          ctx.beginPath();
          ctx.strokeStyle = `rgba(212, 175, 55, ${opacity})`;
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(bottomNode.x, bottomNode.y);
          ctx.stroke();
        }

        // Draw node dot
        const distMouse = Math.hypot(mouse.x - node.x, mouse.y - node.y);
        const isNear = mouse.active && distMouse < WARP_RADIUS;

        const dotRadius = isNear ? 2.2 : 1.2;
        const dotOpacity = isNear ? 0.38 : 0.09;

        ctx.beginPath();
        ctx.fillStyle = isNear ? `rgba(229, 193, 88, ${dotOpacity})` : `rgba(255, 255, 255, ${dotOpacity})`;
        ctx.arc(node.x, node.y, dotRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="spacetime-canvas" />;
}
