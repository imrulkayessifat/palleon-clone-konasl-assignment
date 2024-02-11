export interface ComponentProps {
    name: string;
    type: string;
    id: number;
    height: number;
    width: number;
    z_index: number;
    color: string;
    image?: string;
    opacity?: number;
    left?: number;
    top?: number;
    rotate?: number;
    setCurrentComponent: (a: any) => void;
};