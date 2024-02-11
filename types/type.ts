export interface ComponentProps {
    name: string;
    type: string;
    id: number;
    height: number;
    width: number;
    z_index: number;
    color: string;
    image: string;
    setCurrentComponent: (a: any) => void;
};