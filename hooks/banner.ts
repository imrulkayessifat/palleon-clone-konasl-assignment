import { create } from 'zustand';

interface BannerImageStoreProps {
    image: string;
    setImage: (color: string) => void;
};

export const useBannerImageStore = create<BannerImageStoreProps>((set) => ({
    image: '',
    setImage: (image) => set(() => ({ image })),
}));
