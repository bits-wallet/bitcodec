/// <reference types="node" />
import { IBitcodec } from "../models/IBitcodec";
export declare class WitnessLocktimeCodec implements IBitcodec<{
    witness: string[][];
    locktime: number;
}> {
    private witnessLocktimeData;
    private inputsCount;
    encodeBytes: number;
    decodeBytes: number;
    encodingLength: (t?: any) => number;
    constructor(inputsCount: number);
    encode: (value: any, buffer?: Buffer | undefined, offset?: number | undefined) => Buffer;
    decode: (buffer: Buffer, offset?: number | undefined, end?: number | undefined) => {
        witness: string[][];
        locktime: number;
    };
}
