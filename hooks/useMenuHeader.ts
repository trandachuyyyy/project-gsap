import { create } from "zustand";

// resize responsive
interface IHeader {
    openMenu: boolean;
    setOpenMenu: (state: boolean) => void;
}

export const useHeader = create<IHeader>((set) => ({
    openMenu: false,
    setOpenMenu: (state: boolean) => set({ openMenu: state }),
}));
