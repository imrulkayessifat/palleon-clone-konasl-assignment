import { create } from 'zustand';

interface FontFamilyProps {
    fontFamily: string;
    setFontFamily: (font: string) => void;
}

export const useFontFamilyStore = create<FontFamilyProps>((set) => ({
    fontFamily: 'font-sans',
    setFontFamily: (font) => set({ fontFamily: font }),
}));
