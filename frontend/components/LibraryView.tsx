
import React from 'react';
import { ProjectDimensions } from '../types';

interface LibraryViewProps {
  onSelectTemplate: (dimensions: ProjectDimensions) => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({ onSelectTemplate }) => {
  const categories = ['Favoritos', 'Caixas', 'Organizadores', 'Brinquedos', 'Decoração'];
  const templates = [
    { name: 'Caixa com Encaixe de Dente', cat: 'Caixas', diff: 'Iniciante', dims: { width: 100, height: 100, depth: 100 } },
    { name: 'Porta Canetas Modular', cat: 'Organizadores', diff: 'Intermediário', dims: { width: 250, height: 120, depth: 60 } },
    { name: 'Abajur Origami MDF', cat: 'Decoração', diff: 'Avançado', dims: { width: 180, height: 180, depth: 250 } },
    { name: 'Puzzle 3D Dinossauro', cat: 'Brinquedos', diff: 'Intermediário', dims: { width: 300, height: 200, depth: 5 } },
    { name: 'Suporte para Monitor', cat: 'Organizadores', diff: 'Iniciante', dims: { width: 450, height: 300, depth: 100 } },
    { name: 'Gaveteiro Mini', cat: 'Caixas', diff: 'Intermediário', dims: { width: 150, height: 250, depth: 150 } },
  ];

  return (
    <div className="flex-1 overflow-auto p-8 animate-fade-in bg-background-light dark:bg-background-dark">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Biblioteca de Templates</h1>
          <p className="text-slate-500 dark:text-slate-400">Inspire-se e comece com modelos pré-configurados.</p>
        </div>

        <div className="flex gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat, i) => (
            <button 
              key={cat} 
              className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-bold transition-all ${
                i === 1 ? 'bg-primary text-white shadow-md' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((t, i) => (
            <div 
              key={i} 
              onClick={() => onSelectTemplate(t.dims)}
              className="flex gap-4 p-4 bg-white dark:bg-[#1e2736] rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-primary transition-all cursor-pointer group shadow-sm active:scale-[0.98]"
            >
              <div className="size-24 flex-none bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-3xl group-hover:scale-105 transition-transform">
                ✨
              </div>
              <div className="flex flex-col justify-between py-1">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{t.name}</h3>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{t.cat}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                    t.diff === 'Iniciante' ? 'bg-green-100 text-green-600' :
                    t.diff === 'Intermediário' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
                  }`}>
                    {t.diff}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
