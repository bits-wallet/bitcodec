/// <reference types="node" />
import { IBitcodec } from "../models/IBitcodec";
export declare class CVarBuffer implements IBitcodec<any> {
    private anyCodec;
    encodingLength: (buffer?: Buffer) => number;
    encodeBytes: number;
    decodeBytes: number;
    constructor(anyCodec: IBitcodec<any>);
    encode: (value: Buffer, buffer?: Buffer | undefined, offset?: number) => Buffer;
    decode: (buffer: Buffer, offset?: number, end?: number | undefined) => Buffer;
}
