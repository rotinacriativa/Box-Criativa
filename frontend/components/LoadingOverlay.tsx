
import React from 'react';

interface LoadingOverlayProps {
  message: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ message }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 dark:bg-[#0f1520]/80 backdrop-blur-sm transition-all duration-300 animate-fade-in">
      <div className="bg-white/95 dark:bg-[#1e2736]/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-8 w-full max-w-sm mx-4 transform transition-all">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4 group">
            <div className="relative flex items-center justify-center size-10 flex-none">
              <div className="absolute inset-0 bg-blue-600/10 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="material-symbols-outlined text-blue-600 !text-[20px]">auto_awesome</span>
            </div>
            <div className="flex flex-col">
              <span className="text-slate-900 dark:text-white font-bold text-lg leading-tight tracking-tight">Otimizando Modelo</span>
              <span className="text-blue-600 text-xs font-semibold animate-pulse mt-0.5">{message}</span>
            </div>
          </div>
        </div>
        <div className="mt-8 h-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 w-[60%] rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
