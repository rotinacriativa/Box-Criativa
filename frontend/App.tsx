
import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { View3D } from './components/View3D';
import { View2D } from './components/View2D';
import { ViewCode } from './components/ViewCode';
import { ProjectsView } from './components/ProjectsView';
import { LibraryView } from './components/LibraryView';
import { SettingsView } from './components/SettingsView';
import { LoadingOverlay } from './components/LoadingOverlay';
import { TabType, AppView, ProjectDimensions, Thickness, AppState } from './types';

const DEFAULT_DIMENSIONS: ProjectDimensions = {
  width: 150,
  height: 100,
  depth: 80
};

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    view: AppView.EDITOR,
    dimensions: { ...DEFAULT_DIMENSIONS },
    thickness: 3,
    lidOpen: false,
    activeTab: TabType.VIEW_3D,
    isGenerating: false,
    loadingMessage: "Calculando encaixes..."
  });

  const [generatedSvgPath, setGeneratedSvgPath] = useState<string | null>(null);

  const handleNavigate = (view: AppView) => {
    setState(prev => ({ ...prev, view }));
  };

  const handleNewProject = () => {
    setState(prev => ({
      ...prev,
      view: AppView.EDITOR,
      dimensions: { ...DEFAULT_DIMENSIONS },
      lidOpen: false,
      activeTab: TabType.VIEW_3D
    }));
    setGeneratedSvgPath(null);
  };

  const handleDimensionChange = (key: keyof ProjectDimensions, value: number) => {
    setState(prev => ({
      ...prev,
      dimensions: { ...prev.dimensions, [key]: value }
    }));
  };

  const handleThicknessChange = (value: Thickness) => {
    setState(prev => ({ ...prev, thickness: value }));
  };

  const handleLidToggle = () => {
    setState(prev => ({ ...prev, lidOpen: !prev.lidOpen }));
  };

  const handleGenerateBox = async () => {
    setState(prev => ({ ...prev, isGenerating: true, loadingMessage: "Gerando arquivo de corte..." }));
    try {
      const response = await fetch('http://localhost:8000/generate-box', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          width: state.dimensions.width,
          height: state.dimensions.height,
          depth: state.dimensions.depth,
          thickness: state.thickness
        })
      });

      if (!response.ok) {
        throw new Error('Falha na comunicação com o servidor');
      }

      const data = await response.json();

      if (data.svg_path) {
        const downloadUrl = `http://localhost:8000/${data.svg_path}`;
        setGeneratedSvgPath(data.svg_path);

        // Fetch the file as a blob to force download and avoid navigation/panel closing
        try {
          const fileResponse = await fetch(downloadUrl);
          const blob = await fileResponse.blob();
          const blobUrl = window.URL.createObjectURL(blob);

          const link = document.createElement('a');
          link.href = blobUrl;
          link.download = data.svg_path.split('/').pop() || 'box.svg';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          // Clean up the blob URL
          window.URL.revokeObjectURL(blobUrl);

        } catch (downloadError) {
          console.error("Erro ao baixar o arquivo:", downloadError);
          alert("Erro ao baixar o arquivo gerado.");
        }

        console.log("Download iniciado:", downloadUrl);
      }

    } catch (error) {
      console.error("Erro ao gerar caixa:", error);
      alert("Erro ao conectar com o backend. Verifique se use 'uvicorn main:app' está rodando.");
    } finally {
      setState(prev => ({ ...prev, isGenerating: false }));
    }
  };

  const renderEditor = () => {
    const renderActiveTab = () => {
      switch (state.activeTab) {
        case TabType.VIEW_3D:
          return <View3D dimensions={state.dimensions} lidOpen={state.lidOpen} />;
        case TabType.SCHEME_2D:
          return <View2D dimensions={state.dimensions} thickness={state.thickness} />;
        case TabType.CODE_XML:
          return <ViewCode dimensions={state.dimensions} thickness={state.thickness} />;
      }
    };

    return (
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          dimensions={state.dimensions}
          thickness={state.thickness}
          lidOpen={state.lidOpen}
          onDimensionChange={handleDimensionChange}
          onThicknessChange={handleThicknessChange}
          onLidToggle={handleLidToggle}
          onGenerateBox={handleGenerateBox}
        />

        <main className="flex-1 flex flex-col min-w-0 bg-background-light dark:bg-background-dark relative">
          <div className="flex-1 p-6 flex flex-col h-full overflow-hidden">
            <div className="flex-1 bg-white dark:bg-[#1e2736] rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden group">
              {renderActiveTab()}
            </div>

            <div className="mt-4 flex justify-center">
              <div className="inline-flex p-1 bg-white dark:bg-[#1e2736] rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                {Object.values(TabType).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setState(prev => ({ ...prev, activeTab: tab }))}
                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${state.activeTab === tab
                      ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white font-bold shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined !text-[18px]">
                        {tab === TabType.VIEW_3D ? 'view_in_ar' : tab === TabType.SCHEME_2D ? 'architecture' : 'code'}
                      </span>
                      {tab}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  };

  const renderContent = () => {
    switch (state.view) {
      case AppView.PROJECTS:
        return <ProjectsView onNewProject={handleNewProject} onSelectProject={(dims) => setState(prev => ({ ...prev, dimensions: dims, view: AppView.EDITOR }))} />;
      case AppView.LIBRARY:
        return <LibraryView onSelectTemplate={(dims) => setState(prev => ({ ...prev, dimensions: dims, view: AppView.EDITOR }))} />;
      case AppView.SETTINGS:
        return <SettingsView />;
      case AppView.EDITOR:
      default:
        return renderEditor();
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header currentView={state.view} onNavigate={handleNavigate} />
      {renderContent()}
      {state.isGenerating && <LoadingOverlay message={state.loadingMessage} />}
    </div>
  );
};

export default App;
