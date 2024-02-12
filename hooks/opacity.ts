import { create } from 'zustand';

interface OpacityStoreProps {
    opacity: string;
    setOpacity: (opacity: string) => void;
};

export const useOpacityStore = create<OpacityStoreProps>((set) => ({
    opacity: '',
    setOpacity: (opacity) => set(() => ({ opacity })),
}));
