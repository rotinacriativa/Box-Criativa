
import React from 'react';
import { ProjectDimensions, Thickness } from '../types';

interface View2DProps {
  dimensions: ProjectDimensions;
  thickness: Thickness;
}

export const View2D: React.FC<View2DProps> = ({ dimensions, thickness }) => {
  const { width, height, depth } = dimensions;
  
  const padding = 50;
  const viewBoxWidth = width + depth * 2 + padding * 2;
  const viewBoxHeight = height + depth * 2 + padding * 2;

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-[#1e2736] dark:to-[#151c2a] p-12 overflow-auto">
      <div className="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm pointer-events-none">
          <div className="size-2 rounded-full bg-blue-600 animate-pulse"></div>
          <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wide">MDF {thickness}mm • Plano de Corte</span>
        </div>

        <svg 
          className="w-full h-full max-w-3xl drop-shadow-2xl" 
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform={`translate(${padding}, ${padding})`}>
            <rect x={depth} y={depth} width={width} height={height} className="stroke-blue-600 dark:stroke-blue-500 stroke-2" />
            <text x={depth + width/2} y={depth + height/2} className="fill-slate-400 text-[10px]" textAnchor="middle">BASE</text>
            
            <rect x={depth} y={0} width={width} height={depth} className="stroke-blue-600 dark:stroke-blue-500 stroke-2" />
            <text x={depth + width/2} y={depth/2} className="fill-slate-400 text-[8px]" textAnchor="middle">TOPO</text>
            
            <rect x={depth} y={depth + height} width={width} height={depth} className="stroke-blue-600 dark:stroke-blue-500 stroke-2" />
            <text x={depth + width/2} y={depth + height + depth/2} className="fill-slate-400 text-[8px]" textAnchor="middle">FUNDO</text>
            
            <rect x={0} y={depth} width={depth} height={height} className="stroke-blue-600 dark:stroke-blue-500 stroke-2" />
            <text x={depth/2} y={depth + height/2} className="fill-slate-400 text-[8px]" textAnchor="middle" transform={`rotate(-90 ${depth/2} ${depth + height/2})`}>LADO E</text>
            
            <rect x={depth + width} y={depth} width={depth} height={height} className="stroke-blue-600 dark:stroke-blue-500 stroke-2" />
            <text x={depth + width + depth/2} y={depth + height/2} className="fill-slate-400 text-[8px]" textAnchor="middle" transform={`rotate(90 ${depth + width + depth/2} ${depth + height/2})`}>LADO D</text>

            <line x1={depth} y1={viewBoxHeight - padding*1.5} x2={depth + width} y2={viewBoxHeight - padding*1.5} className="stroke-slate-400" />
            <text x={depth + width/2} y={viewBoxHeight - padding*1.3} className="fill-slate-500 text-[8px]" textAnchor="middle">{width}mm</text>
          </g>
        </svg>
      </div>
    </div>
  );
};
