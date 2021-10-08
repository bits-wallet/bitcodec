import { IBitcodec } from "../models/IBitcodec";
export declare class CVarUIntBitcoin implements IBitcodec<number> {
    private MAX_SAFE_INTEGER;
    private checkUInt53;
    encodeBytes: number;
    decodeBytes: number;
    encodingLength: (t?: number | undefined) => number;
    constructor();
    encode: (value: number, buffer?: Buffer | undefined, offset?: number) => Buffer;
    decode: (buffer: Buffer, offset?: number, end?: number | undefined) => number;
}
