import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { ApiError } from "@/service/ApiError";
import { Config, StoreActions } from "@/types";

export interface AppModel {
  loaded: boolean;
  width: number;
  height: number;
  config?: Config;
  configOpen?: boolean;
  errors?: ApiError[];
}

export interface AppActions {
  setLoaded: (loaded: boolean) => void;
  setWidthHeight: (width: number, height: number) => void;
  setConfig: (configs: Config) => void;
  setConfigOpen: (open: boolean) => void;
  setErrors: (errors: ApiError[]) => void;
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
  setConfig: (config) => {
    set({ config });
  },
  setConfigOpen: (open) => set({ configOpen: open }),
  setErrors: (errors) => set({ errors }),
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
