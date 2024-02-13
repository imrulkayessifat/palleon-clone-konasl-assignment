import { create } from 'zustand';

interface RadiusStoreProps {
    radius: number;
    setRadius: (radius: number) => void;
};

export const useRadiusStore = create<RadiusStoreProps>((set) => ({
    radius: 0,
    setRadius: (radius) => set(() => ({ radius })),
}));
