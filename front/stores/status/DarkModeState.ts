import { create } from "zustand";

interface DarkModeState {
  enable: boolean;
  toggle: () => void;
}

const useDarkModeState = create<DarkModeState>((set) => ({
  enable: false,
  toggle: () => {
    set((state) => ({ enable: !state.enable }));
  },
}));

export default useDarkModeState;
