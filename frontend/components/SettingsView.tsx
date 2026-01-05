
import React, { useState, useEffect } from 'react';

export const SettingsView: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>(() => {
    return (document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  });

  const toggleTheme = (newTheme: 'light' | 'dark' | 'auto') => {
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else if (newTheme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      // Auto logic simplified: based on system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  return (
    <div className="flex-1 overflow-auto p-8 animate-fade-in bg-background-light dark:bg-background-dark">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Configurações</h1>
          <p className="text-slate-500 dark:text-slate-400">Personalize sua experiência no Rotina Criativa PRO.</p>
        </div>

        <div className="space-y-6">
          {/* Perfil */}
          <div className="bg-white dark:bg-[#1e2736] rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800">
              <h2 className="font-bold text-slate-900 dark:text-white">Perfil do Usuário</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-6">
                <div className="size-20 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center relative group cursor-pointer">
                  <span className="material-symbols-outlined text-3xl text-slate-400">person</span>
                  <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <span className="material-symbols-outlined text-white text-xl">photo_camera</span>
                  </div>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Nome Completo</label>
                    <input type="text" defaultValue="Usuário Criativo" className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm px-4 py-2 focus:ring-2 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">E-mail</label>
                    <input type="email" defaultValue="contato@rotinacriativa.com" className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm px-4 py-2 focus:ring-2 focus:ring-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preferências */}
          <div className="bg-white dark:bg-[#1e2736] rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800">
              <h2 className="font-bold text-slate-900 dark:text-white">Preferências do Sistema</h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Unidade Padrão</h4>
                  <p className="text-xs text-slate-500">Escolha como as medidas serão exibidas.</p>
                </div>
                <select className="bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm font-bold px-4 py-2">
                  <option>Milímetros (mm)</option>
                  <option>Centímetros (cm)</option>
                  <option>Polegadas (in)</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Tema da Interface</h4>
                  <p className="text-xs text-slate-500">Alterne entre o modo claro e escuro.</p>
                </div>
                <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <button 
                    onClick={() => toggleTheme('auto')}
                    className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${theme === 'auto' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500'}`}
                  >
                    Auto
                  </button>
                  <button 
                    onClick={() => toggleTheme('light')}
                    className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${theme === 'light' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500'}`}
                  >
                    Light
                  </button>
                  <button 
                    onClick={() => toggleTheme('dark')}
                    className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${theme === 'dark' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500'}`}
                  >
                    Dark
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Renderização HD</h4>
                  <p className="text-xs text-slate-500">Melhora a qualidade visual (exige mais processamento).</p>
                </div>
                <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary cursor-pointer">
                  <span className="inline-block size-4 transform rounded-full bg-white translate-x-6"></span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button className="bg-primary hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-lg shadow-blue-500/20">
              Salvar Alterações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
