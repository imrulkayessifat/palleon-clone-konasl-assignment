import { create } from 'zustand';

interface ZindexStoreProps {
    zindex: string;
    setZIndex: (zindex: string) => void;
};

export const useZIndexStore = create<ZindexStoreProps>((set) => ({
    zindex: '1',
    setZIndex: (zindex) => set(() => ({ zindex })),
}));
