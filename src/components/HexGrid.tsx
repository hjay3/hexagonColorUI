import React, { useEffect, useRef } from 'react';
import { Cpu } from 'lucide-react';
import { Hexagon } from './Hexagon';

const HexGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      containerRef.current.style.setProperty('--mouse-x', x.toString());
      containerRef.current.style.setProperty('--mouse-y', y.toString());
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-blue-900/20 to-purple-900/20 animate-gradient-shift" />
      <div className="hex-grid">
        {[...Array(150)].map((_, i) => (
          <Hexagon
            key={i}
            delay={Math.random() * 5}
            scale={0.8 + Math.random() * 0.4}
            position={{
              x: Math.random() * 100,
              y: Math.random() * 100
            }}
            colorOffset={i * 2.4}
          />
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center z-10 backdrop-blur-sm bg-black/20 p-8 rounded-2xl border border-cyan-500/30">
          <Cpu className="w-16 h-16 text-cyan-400 animate-pulse mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 animate-gradient tracking-wider mb-2">
            SYSTEM ACTIVE
          </h1>
          <p className="text-cyan-300/80 tracking-widest text-sm">
            GRID INITIALIZATION COMPLETE
          </p>
        </div>
      </div>
    </div>
  );
};

export default HexGrid;