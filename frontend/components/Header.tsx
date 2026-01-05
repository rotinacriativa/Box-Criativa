
import React from 'react';
import { AppView } from '../types';

interface HeaderProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  return (
    <header className="flex-none flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-[#151c2a] px-6 py-3 z-20 shadow-sm">
      <div 
        className="flex items-center gap-4 text-slate-900 dark:text-white cursor-pointer group"
        onClick={() => onNavigate(AppView.EDITOR)}
      >
        <div className="size-8 flex items-center justify-center bg-primary rounded-lg text-white group-hover:scale-105 transition-transform">
          <span className="material-symbols-outlined !text-[20px]">view_in_ar</span>
        </div>
        <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">Rotina Criativa PRO</h2>
      </div>
      
      <div className="flex items-center gap-8">
        <nav className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => onNavigate(AppView.PROJECTS)}
            className={`text-sm font-medium transition-colors ${currentView === AppView.PROJECTS ? 'text-primary' : 'text-slate-600 dark:text-slate-300 hover:text-primary'}`}
          >
            Projetos
          </button>
          <button 
            onClick={() => onNavigate(AppView.LIBRARY)}
            className={`text-sm font-medium transition-colors ${currentView === AppView.LIBRARY ? 'text-primary' : 'text-slate-600 dark:text-slate-300 hover:text-primary'}`}
          >
            Biblioteca
          </button>
          <button 
            onClick={() => onNavigate(AppView.SETTINGS)}
            className={`text-sm font-medium transition-colors ${currentView === AppView.SETTINGS ? 'text-primary' : 'text-slate-600 dark:text-slate-300 hover:text-primary'}`}
          >
            Configurações
          </button>
        </nav>
        
        <div className="flex gap-3">
          <button className="hidden sm:flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-9 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-sm font-bold transition-colors">
            <span className="truncate">Salvar</span>
          </button>
          <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-9 px-4 bg-primary hover:bg-blue-700 text-white text-sm font-bold transition-colors shadow-lg shadow-blue-500/20">
            <span className="truncate">Exportar</span>
          </button>
        </div>
        
        <div className="relative group cursor-pointer" onClick={() => onNavigate(AppView.SETTINGS)}>
          <div 
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-9 border-2 border-slate-100 dark:border-slate-700" 
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100")' }}
          ></div>
          <div className="absolute top-0 right-0 size-2.5 bg-green-500 rounded-full border border-white dark:border-[#151c2a]"></div>
        </div>
      </div>
    </header>
  );
};
