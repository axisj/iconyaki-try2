import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { Config, StoreActions } from "../types";
import { getPersistSerializer } from "./getPersistSerializer.ts";

interface Project {
  label: string;
  value: string;
}

export interface AppModel {
  loaded: boolean;
  width: number;
  height: number;
  currentProject?: string;
  projects?: Project[];
}

export interface AppActions {
  setLoaded: (loaded: boolean) => void;
  setWidthHeight: (width: number, height: number) => void;
  setProjects: (projects: Project[]) => void;
  setCurrentProject: (project?: string) => void;
}

export interface AppStore extends AppModel, AppActions {}

export const appInitialState: AppModel = {
  loaded: true,
  width: 0,
  height: 0,
};

const getAppStoreActions: StoreActions<AppModel & AppActions, AppActions> = (
  set,
  get,
) => ({
  setLoaded: (loaded) => set({ loaded }),
  setWidthHeight: (width, height) => set({ width, height }),
  setProjects: (projects) => {
    set({ projects });
  },
  setCurrentProject: (project) => {
    set({ currentProject: project });
  },
});

export const useAppStore = create<AppStore>(
  persist(
    (set, get) => ({
      ...appInitialState,
      ...getAppStoreActions(set, get),
    }),
    getPersistSerializer<AppStore>("app", 1),
  ) as StateCreator<AppStore>,
);
