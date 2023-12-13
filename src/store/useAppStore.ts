import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { Preference } from "@/components/Preference";

export type ZustandSetter<T> = (partial: Partial<T>, replace?: boolean | undefined) => void;

export type ZustandGetter<T> = () => T;

export type StoreActions<T, R> = (set: ZustandSetter<T>, get: ZustandGetter<T>) => R;

export interface AppModel {
  loaded: boolean;
  width: number;
  height: number;
  iconPrefix?: string;
  targetPath?: string;
}

interface Preference {
  iconPrefix?: string;
  targetPath?: string;
}

export interface AppActions {
  setLoaded: (loaded: boolean) => void;
  setWidthHeight: (width: number, height: number) => void;
  setIconPrefix: (iconPrefix?: string) => void;
  setTargetPath: (targetPath?: string) => void;
  setPreference: (preference: Preference) => void;
}

export interface AppStore extends AppModel, AppActions {}

export const appInitialState: AppModel = {
  loaded: true,
  width: 0,
  height: 0,
};

const getAppStoreActions: StoreActions<AppModel & AppActions, AppActions> = (set, get) => ({
  setLoaded: (loaded) => set({ loaded }),
  setWidthHeight: (width, height) => set({ width, height }),
  setIconPrefix: (iconPrefix) => set({ iconPrefix }),
  setTargetPath: (targetPath) => set({ targetPath }),
  setPreference: (preference) => {
    set(preference);
  },
});

export const useAppStore = create<AppStore>(
  persist(
    (set, get) => ({
      ...appInitialState,
      ...getAppStoreActions(set, get),
    }),
    {
      name: "app-store", // name of the item in the storage (must be unique)
    },
  ) as StateCreator<AppStore>,
);
