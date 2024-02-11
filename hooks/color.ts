import { create } from 'zustand';

interface ColorStoreProps {
    color: string;
    setColor: (color: string) => void;
};

export const useColorStore = create<ColorStoreProps>((set) => ({
    color: '#ffbe6f',
    setColor: (color) => set(() => ({ color })),
}));
