/// <reference types="node" />
import { IBitcodec } from "../models/IBitcodec";
export declare class CAllBuffer implements IBitcodec<Buffer> {
    private length;
    encodingLength: (buffer?: Buffer | undefined) => number;
    encodeBytes: number;
    decodeBytes: number;
    constructor();
    encode: (value: Buffer, buffer?: Buffer | undefined, offset?: number) => Buffer;
    decode: (buffer: Buffer, offset?: number, end?: number | undefined) => Buffer;
}
