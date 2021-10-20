import { IBitcodec } from "../models/IBitcodec";
export declare class CVarArray implements IBitcodec<any[]> {
    private codecName;
    private length;
    private lengthType;
    private anyCodec;
    private calcLength;
    encodingLength: (array?: any[] | undefined) => number;
    encodeBytes: number;
    decodeBytes: number;
    constructor(lengthType: IBitcodec<any>, anyCodec: IBitcodec<any>);
    encode: (value: any[], buffer?: Buffer | undefined, offset?: number) => Buffer;
    decode: (buffer: Buffer, offset?: number, end?: number | undefined) => any[];
}
