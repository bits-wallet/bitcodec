import { EncodingType } from "../models/EncodingType";
import { IBitcodec } from "../models/IBitcodec";
export declare class CVarString implements IBitcodec<string> {
    private codecName;
    private anyCodec;
    private encodingType;
    private varBufferCodec;
    encodingLength: (value?: string) => number;
    encodeBytes: number;
    decodeBytes: number;
    constructor(anyCodec: IBitcodec<any>, encodingType?: EncodingType);
    encode: (value: string, buffer?: Buffer | undefined, offset?: number) => Buffer;
    decode: (buffer: Buffer, offset?: number, end?: number | undefined) => string;
}
