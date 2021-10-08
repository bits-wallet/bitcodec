import { EncodingType } from "../models/EncodingType";
import { IBitcodec } from "../models/IBitcodec";
export declare class CString implements IBitcodec<string> {
    private length;
    private bufferCodec;
    private encodingType;
    encodingLength: (value?: string) => number;
    encodeBytes: number;
    decodeBytes: number;
    constructor(length: number, encodingType?: EncodingType);
    encode: (value: string, buffer?: Buffer | undefined, offset?: number) => Buffer;
    decode: (buffer: Buffer, offset?: number, end?: number | undefined) => string;
}
