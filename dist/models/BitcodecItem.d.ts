import { IBitcodec } from "./IBitcodec";
export declare type BitcodecItem = {
    name: string;
    type: IBitcodec<any>;
} | [name: string, type: IBitcodec<any>];
