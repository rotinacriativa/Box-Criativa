
export enum TabType {
  VIEW_3D = '3D View',
  SCHEME_2D = '2D Scheme',
  CODE_XML = 'Code (XML)'
}

export enum AppView {
  EDITOR = 'Editor',
  PROJECTS = 'Projects',
  LIBRARY = 'Library',
  SETTINGS = 'Settings'
}

export type Thickness = 3 | 4 | 6;

export interface ProjectDimensions {
  width: number;
  height: number;
  depth: number;
}

export interface AppState {
  view: AppView;
  dimensions: ProjectDimensions;
  thickness: Thickness;
  lidOpen: boolean;
  activeTab: TabType;
  isGenerating: boolean;
  loadingMessage: string;
}
