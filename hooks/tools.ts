import { create } from 'zustand';

type ToolsProps = {
    state: boolean;
    name?: string;
    setElements: (state: boolean, name?: string) => void;
};

export const useToolStore = create<ToolsProps>(set => ({
    state: false,
    name: '',
    setElements: (state, name = '') => set(data => ({ state, name })),
}));