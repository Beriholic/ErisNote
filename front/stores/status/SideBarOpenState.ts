import { create } from "zustand";

interface SideBarOpenState {
  open: boolean;
  toggle: () => void;
}

const useSideBarOpenState = create<SideBarOpenState>((set) => ({
  open: true,
  toggle: () => set((stats) => ({ open: !stats.open })),
}));

export default useSideBarOpenState;
