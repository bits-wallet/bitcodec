/// <reference types="node" />
import { IBitcodec } from "../models/IBitcodec";
import { CNumber } from "./CNumber";
import { CVarUIntBitcoin } from "./CVarUIntBitcoin";
export declare class CVarBuffer implements IBitcodec<any> {
    private codecName;
    private anyCodec;
    encodingLength: (buffer?: Buffer) => number;
    encodeBytes: number;
    decodeBytes: number;
    constructor(anyCodec: IBitcodec<CNumber | CVarUIntBitcoin>);
    encode: (value: Buffer, buffer?: Buffer | undefined, offset?: number) => Buffer;
    decode: (buffer: Buffer, offset?: number, end?: number | undefined) => Buffer;
}
