/// <reference types="node" />
import { IBitcodec } from "../models/IBitcodec";
export declare class CBuffer implements IBitcodec<Buffer> {
    private length;
    encodingLength: () => number;
    encodeBytes: number;
    decodeBytes: number;
    constructor(length: number);
    encode: (value: Buffer, buffer?: Buffer | undefined, offset?: number) => Buffer;
    decode: (buffer: Buffer, offset?: number, end?: number | undefined) => Buffer;
}
