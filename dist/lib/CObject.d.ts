import { BitcodecItem } from "../models/BitcodecItem";
import { IBitcodec } from "../models/IBitcodec";
export declare class CObject implements IBitcodec<object> {
    private codecName;
    private items;
    encodeBytes: number;
    decodeBytes: number;
    encodingLength: (t?: object) => number;
    constructor(items: BitcodecItem[]);
    encode: (object: object, buffer?: Buffer | undefined, offset?: number) => Buffer;
    decode: (buffer: Buffer, offset?: number, end?: number | undefined) => object;
}
