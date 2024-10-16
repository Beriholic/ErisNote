import { create } from "zustand";
import { persist } from "zustand/middleware";

const useDarkModeState = create(
  persist(
    (set, get) => ({
      enable: false,
      toggle: () => {
        set({ enable: !get().enable });
      },
    }),
    {
      name: "dark-mode",
    }
  )
);

export default useDarkModeState;
