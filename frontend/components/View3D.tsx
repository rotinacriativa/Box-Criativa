
import React, { useState, useRef, useEffect } from 'react';
import { ProjectDimensions } from '../types';

interface View3DProps {
  dimensions: ProjectDimensions;
  lidOpen: boolean;
}

export const View3D: React.FC<View3DProps> = ({ dimensions, lidOpen }) => {
  const { width, height, depth } = dimensions;
  
  // Estados para rotação e zoom
  const [rotation, setRotation] = useState({ x: -15, y: 25 });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const baseScale = Math.min(250 / Math.max(width, height, depth), 1.5);
  const w = width * baseScale;
  const h = height * baseScale;
  const d = depth * baseScale;

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleWheel = (e: React.WheelEvent) => {
    // Zoom in/out suave com o scroll
    const zoomDelta = e.deltaY * -0.001;
    setZoom(prev => Math.min(Math.max(prev + zoomDelta, 0.5), 3));
  };

  const adjustZoom = (delta: number) => {
    setZoom(prev => Math.min(Math.max(prev + delta, 0.5), 3));
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaX = e.clientX - lastMousePos.current.x;
      const deltaY = e.clientY - lastMousePos.current.y;

      setRotation(prev => ({
        x: prev.x - deltaY * 0.5,
        y: prev.y + deltaX * 0.5
      }));

      lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-[#1e2736] dark:to-[#151c2a] relative select-none touch-none overflow-hidden"
      onMouseDown={handleMouseDown}
      onWheel={handleWheel}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      <div className="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      
      {/* Controles de Zoom Flutuantes */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
        <button 
          onClick={() => adjustZoom(0.2)}
          className="size-10 flex items-center justify-center bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm text-slate-600 dark:text-slate-300 hover:text-primary transition-colors active:scale-90"
        >
          <span className="material-symbols-outlined">zoom_in</span>
        </button>
        <button 
          onClick={() => setZoom(1)}
          className="size-10 flex items-center justify-center bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm text-slate-600 dark:text-slate-300 hover:text-primary transition-colors active:scale-90"
        >
          <span className="material-symbols-outlined text-sm">restart_alt</span>
        </button>
        <button 
          onClick={() => adjustZoom(-0.2)}
          className="size-10 flex items-center justify-center bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm text-slate-600 dark:text-slate-300 hover:text-primary transition-colors active:scale-90"
        >
          <span className="material-symbols-outlined">zoom_out</span>
        </button>
      </div>

      <div 
        className="relative preserve-3d transition-transform duration-100 ease-out"
        style={{ 
          width: `${w}px`, 
          height: `${h}px`,
          transform: `scale(${zoom}) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` 
        }}
      >
        {/* Face Frontal */}
        <div 
          className="absolute inset-0 bg-blue-500/10 border-2 border-blue-500 rounded flex items-center justify-center backdrop-blur-sm shadow-[0_0_15px_rgba(39,98,236,0.3)]"
          style={{ transform: `translateZ(${d/2}px)` }}
        >
          <span className="text-blue-600 font-mono text-[10px] font-bold opacity-50">FRENTE</span>
        </div>
        
        {/* Face Traseira */}
        <div 
          className="absolute inset-0 bg-blue-400/5 border border-blue-400/30 rounded"
          style={{ transform: `translateZ(-${d/2}px) rotateY(180deg)` }}
        ></div>
        
        {/* Lado Direito */}
        <div 
          className="absolute inset-y-0 right-0 bg-blue-600/10 border-2 border-blue-600 rounded origin-right"
          style={{ width: `${d}px`, transform: `rotateY(90deg) translateZ(0px)` }}
        ></div>
        
        {/* Lado Esquerdo */}
        <div 
          className="absolute inset-y-0 left-0 bg-blue-600/5 border border-blue-600/30 rounded origin-left"
          style={{ width: `${d}px`, transform: `rotateY(-90deg) translateZ(0px)` }}
        ></div>
        
        {/* Tampa (Topo) */}
        <div 
          className="absolute inset-x-0 top-0 bg-blue-400/20 border-2 border-blue-400 rounded origin-top transition-transform duration-700 ease-in-out"
          style={{ 
            height: `${d}px`, 
            transform: lidOpen 
              ? `rotateX(110deg) translateZ(0px)` 
              : `rotateX(90deg) translateZ(0px)` 
          }}
        ></div>
        
        {/* Base (Fundo) */}
        <div 
          className="absolute inset-x-0 bottom-0 bg-blue-800/10 border-2 border-blue-800 rounded origin-bottom"
          style={{ height: `${d}px`, transform: `rotateX(-90deg) translateZ(0px)` }}
        ></div>

        {/* Indicadores de Medida */}
        <div 
          className="absolute -bottom-10 left-0 w-full flex items-center justify-center border-t border-slate-400 text-slate-500 text-xs pt-1"
          style={{ transform: `translateZ(${d/2}px)` }}
        >
          {width}mm
        </div>
        <div 
          className="absolute top-0 -left-12 h-full flex flex-col items-center justify-center border-r border-slate-400 text-slate-500 text-xs pr-1"
          style={{ transform: `translateZ(${d/2}px)` }}
        >
          {height}mm
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-6 px-4 py-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md rounded-full border border-slate-200 dark:border-slate-700 text-[10px] text-slate-500 font-bold uppercase tracking-widest pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined !text-sm">mouse</span>
          Arraste para girar
        </div>
        <div className="w-px h-3 bg-slate-300 dark:bg-slate-600"></div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined !text-sm">expand</span>
          Scroll para zoom
        </div>
      </div>
    </div>
  );
};
