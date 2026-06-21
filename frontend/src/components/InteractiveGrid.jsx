import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const InteractiveGrid = () => {
  const containerRef = useRef(null);
  const glowRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const glow = glowRef.current;
    const grid = gridRef.current;
    if (!container || !glow) return;

    // Track mouse position and animate spotlight with smooth lag (momentum)
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { x: mouse.x, y: mouse.y };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseEnter = () => {
      gsap.to(glow, { opacity: 1, duration: 0.3, ease: 'power2.out' });
    };

    const handleMouseLeave = () => {
      gsap.to(glow, { opacity: 0, duration: 0.4, ease: 'power2.out' });
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Ticker to animate the glow following mouse with lerp (linear interpolation)
    const updateGlow = () => {
      // Lerp logic for smooth momentum
      pos.x += (mouse.x - pos.x) * 0.1;
      pos.y += (mouse.y - pos.y) * 0.1;

      if (glow) {
        gsap.set(glow, {
          x: pos.x - 300, // offset half of glow width (600px)
          y: pos.y - 300, // offset half of glow height (600px)
        });
      }
    };

    gsap.ticker.add(updateGlow);

    // Initial fade in for the grid
    gsap.fromTo(
      grid,
      { opacity: 0 },
      { opacity: 0.5, duration: 2, ease: 'power2.out' }
    );
    
    // Initial fade in of the glow
    gsap.fromTo(
      glow,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out' }
    );

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      gsap.ticker.remove(updateGlow);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full overflow-hidden bg-[#07080a] -z-10 pointer-events-none"
    >
      {/* Radial Gradient Ambient Background (Deep forest green color base) */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle 800px at 50% -200px, rgba(16, 185, 129, 0.08), transparent 70%)',
        }}
      />

      {/* Grid Lines Pattern */}
      <div
        ref={gridRef}
        className="absolute inset-0 w-full h-full opacity-45"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(16, 185, 129, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(16, 185, 129, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glowing circular spotlight following mouse */}
      <div
        ref={glowRef}
        className="absolute w-[600px] h-[600px] rounded-full blur-[100px] pointer-events-none opacity-0"
        style={{
          background: 'radial-gradient(circle, rgba(0, 255, 136, 0.22) 0%, rgba(16, 185, 129, 0.08) 40%, rgba(5, 150, 105, 0.02) 70%, transparent 100%)',
          transform: 'translate3d(0, 0, 0)',
          willChange: 'transform',
        }}
      />

      {/* Modern subtle ambient bottom grid-blend */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#07080a] to-transparent pointer-events-none" />
    </div>
  );
};

export default InteractiveGrid;
