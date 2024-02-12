import { number } from "zod";

export interface ComponentProps {
    name                : string;
    type                : string;
    id                  : number;
    height?              : number;
    width?               : number;
    z_index             : number;
    color               : string;
    image?              : string;
    opacity?            : string;
    padding?            : number;
    font?               : number;
    title?              : string;
    weight?             : number;
    left?               : number;
    top?                : number;
    rotate?             : number;
    resizeElement?      :(id:string,currentInfo:ComponentProps)=>void;
    rotateElement?      :(id:string,currentInfo:ComponentProps)=>void;
    moveElement?        :(id:string,currentInfo:ComponentProps)=>void;
    setWeight?          :(data:number)=>void;
    setFont?            :(data:number)=>void;
    setCurrentComponent : (a: any) => void;
};