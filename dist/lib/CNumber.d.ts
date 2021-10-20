import { IBitcodec } from "../models/IBitcodec";
import { NumberTypes } from "../models/NumberTypes";
export declare class CNumber implements IBitcodec<number> {
    private length;
    private write;
    private read;
    encodingLength: (number?: number | undefined) => number;
    encodeBytes: number;
    decodeBytes: number;
    constructor(numberType: NumberTypes, length: number);
    encode: (value: number, buffer?: Buffer | undefined, offset?: number) => Buffer;
    decode: (buffer: Buffer, offset?: number, end?: number | undefined) => number;
}
