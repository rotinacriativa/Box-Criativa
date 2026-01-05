
import React from 'react';
import { ProjectDimensions } from '../types';

interface ProjectsViewProps {
  onNewProject: () => void;
  onSelectProject: (dimensions: ProjectDimensions) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ onNewProject, onSelectProject }) => {
  const projects = [
    { id: 1, name: 'Caixa de Presente Luxo', dims: '200x200x100mm', dimsObj: { width: 200, height: 200, depth: 100 }, date: '2 horas atrás', thumb: '📦' },
    { id: 2, name: 'Organizador de Mesa', dims: '300x150x50mm', dimsObj: { width: 300, height: 150, depth: 50 }, date: 'Ontem', thumb: '📂' },
    { id: 3, name: 'Luminária Geométrica', dims: '150x150x150mm', dimsObj: { width: 150, height: 150, depth: 150 }, date: '3 dias atrás', thumb: '💡' },
    { id: 4, name: 'Case para Arduino Uno', dims: '80x60x30mm', dimsObj: { width: 80, height: 60, depth: 30 }, date: '1 semana atrás', thumb: '🤖' },
  ];

  return (
    <div className="flex-1 overflow-auto p-8 animate-fade-in bg-background-light dark:bg-background-dark">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Meus Projetos</h1>
            <p className="text-slate-500 dark:text-slate-400">Gerencie seus designs salvos na nuvem.</p>
          </div>
          <button 
            onClick={onNewProject}
            className="flex items-center gap-2 bg-primary hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95"
          >
            <span className="material-symbols-outlined">add</span>
            Novo Projeto
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((p) => (
            <div 
              key={p.id} 
              onClick={() => onSelectProject(p.dimsObj)}
              className="group bg-white dark:bg-[#1e2736] rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
            >
              <div className="aspect-video bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform">
                {p.thumb}
              </div>
              <div className="p-5">
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">{p.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">{p.dims}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{p.date}</span>
                  <div className="flex gap-1">
                    <button className="size-8 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400">
                      <span className="material-symbols-outlined !text-lg">edit</span>
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); /* delete logic */ }}
                      className="size-8 flex items-center justify-center rounded-lg hover:bg-red-50 hover:text-red-500 text-slate-400 transition-colors"
                    >
                      <span className="material-symbols-outlined !text-lg">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
