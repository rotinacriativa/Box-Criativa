
import React from 'react';
import { ProjectDimensions, Thickness } from '../types';

interface ViewCodeProps {
  dimensions: ProjectDimensions;
  thickness: Thickness;
}

export const ViewCode: React.FC<ViewCodeProps> = ({ dimensions, thickness }) => {
  const xmlCode = `<!-- Rotina Criativa PRO: Generated SVG Model -->
<!-- Dimensions: ${dimensions.width}mm x ${dimensions.height}mm x ${dimensions.depth}mm | Mat: ${thickness}mm -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800mm" height="600mm">
  <metadata>
    <rc:settings>
        <rc:joints type="finger" tolerance="0.15mm" />
    </rc:settings>
  </metadata>
  
  <g id="base_panel" transform="translate(10, 10)">
    <path d="M0,0 h${dimensions.width} v${thickness} h3 v-3 h10 ..." 
          fill="none" 
          stroke="#ff0000" 
          stroke-width="0.1" />
    <text x="${dimensions.width/2}" y="40" fill="blue">BOTTOM</text>
  </g>
</svg>`;

  return (
    <div className="flex-1 overflow-hidden flex flex-col bg-slate-100 dark:bg-[#111620]">
      <div className="flex-none h-14 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-6 bg-white dark:bg-[#1e2736] z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2 py-1 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span className="material-symbols-outlined text-slate-400 !text-[16px]">code</span>
            <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300">box_model_preview.svg</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center justify-center size-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined !text-[18px]">content_copy</span>
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto code-scroll p-6">
        <pre className="text-sm font-mono leading-7 text-slate-900 dark:text-slate-300">
          <code>{xmlCode}</code>
        </pre>
      </div>
    </div>
  );
};
