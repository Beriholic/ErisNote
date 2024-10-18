import { create } from "zustand";

interface SideBarOptionState {
  option: string;
  change: (value: string) => void;
}

const useSideBarOptionState = create<SideBarOptionState>((set) => ({
  option: "note",
  change: (value) => set({ option: value }),
}));

export default useSideBarOptionState;
