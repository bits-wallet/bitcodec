import { IBitcodec } from "./IBitcodec";

export type BitcodecItem = { name: string; type: IBitcodec<any> } | [name: string, type: IBitcodec<any>];
