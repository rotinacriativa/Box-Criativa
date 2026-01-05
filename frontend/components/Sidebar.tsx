

import React from 'react';
import { ProjectDimensions, Thickness } from '../types';

interface SidebarProps {
  dimensions: ProjectDimensions;
  thickness: Thickness;
  lidOpen: boolean;
  onDimensionChange: (key: keyof ProjectDimensions, value: number) => void;
  onThicknessChange: (value: Thickness) => void;
  onLidToggle: () => void;
  onGenerateBox: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  dimensions,
  thickness,
  lidOpen,
  onDimensionChange,
  onThicknessChange,
  onLidToggle,
  onGenerateBox
}) => {
  return (
    <aside className="flex-none w-[320px] bg-white dark:bg-[#151c2a] border-r border-slate-200 dark:border-slate-800 flex flex-col overflow-y-auto z-10">
      <div className="p-6 flex flex-col gap-8">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary !text-[20px]">straighten</span>
            <h3 className="text-slate-900 dark:text-white text-base font-bold">Dimensões do Modelo</h3>
          </div>

          {(Object.keys(dimensions) as Array<keyof ProjectDimensions>).map((key) => (
            <div key={key} className="flex flex-col gap-2 group">
              <div className="flex justify-between items-center">
                <label className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
                  {key === 'width' ? 'Largura' : key === 'height' ? 'Altura' : 'Profundidade'} (mm)
                </label>
                <input
                  className="w-16 h-7 text-right text-sm font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 border-none rounded focus:ring-1 focus:ring-primary p-1"
                  type="number"
                  value={dimensions[key]}
                  onChange={(e) => onDimensionChange(key, parseInt(e.target.value) || 0)}
                />
              </div>
              <input
                type="range"
                min="10"
                max="500"
                value={dimensions[key]}
                onChange={(e) => onDimensionChange(key, parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>
          ))}
        </div>

        <hr className="border-slate-100 dark:border-slate-800" />

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary !text-[20px]">layers</span>
            <h3 className="text-slate-900 dark:text-white text-base font-bold">Espessura (MDF/Acrílico)</h3>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[3, 4, 6].map((t) => (
              <button
                key={t}
                onClick={() => onThicknessChange(t as Thickness)}
                className={`flex flex-col items-center justify-center gap-1 p-2 rounded-lg border-2 transition-all ${thickness === t
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
              >
                <span className="text-sm font-bold">{t}mm</span>
              </button>
            ))}
          </div>
        </div>

        <hr className="border-slate-100 dark:border-slate-800" />

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary !text-[20px]">settings_accessibility</span>
            <h3 className="text-slate-900 dark:text-white text-base font-bold">Interatividade</h3>
          </div>
          <button
            onClick={onLidToggle}
            className="flex w-full items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-primary transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="bg-white dark:bg-slate-700 p-1.5 rounded-md shadow-sm text-slate-500 group-hover:text-primary transition-colors">
                <span className="material-symbols-outlined !text-[20px]">
                  {lidOpen ? 'lock_open' : 'lock'}
                </span>
              </div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                {lidOpen ? 'Fechar Tampa' : 'Abrir Tampa'}
              </span>
            </div>
            <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${lidOpen ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-600'}`}>
              <span className={`inline-block size-4 transform rounded-full bg-white transition-transform ${lidOpen ? 'translate-x-6' : 'translate-x-1'}`}></span>
            </div>
          </button>
        </div>
      </div>

      <div className="mt-auto p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#121824]">
        <button
          onClick={onGenerateBox}
          className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-[1px] shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-shadow"
        >
          <div className="relative flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-white transition-all hover:bg-opacity-90">
            <span className="material-symbols-outlined">dataset</span>
            <span className="font-bold tracking-wide">Gerar Caixa</span>
          </div>
        </button>
      </div>
    </aside>
  );
};
