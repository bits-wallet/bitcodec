import { IBitcodec } from "../models/IBitcodec";
export declare class CArray implements IBitcodec<any[]> {
    private length;
    private anyCodec;
    private calcLength;
    encodingLength: (array?: any[] | undefined) => number;
    encodeBytes: number;
    decodeBytes: number;
    constructor(length: number, anyCodec: IBitcodec<any>);
    encode: (value: any[], buffer?: Buffer | undefined, offset?: number) => Buffer;
    decode: (buffer: Buffer, offset?: number, end?: number | undefined) => any[];
}
