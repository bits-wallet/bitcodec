/// <reference types="node" />
export interface IBitcodec<T> {
    encodeBytes: number;
    decodeBytes: number;
    encodingLength: (t?: T) => number;
    encode: (value: T, buffer?: Buffer, offset?: number) => Buffer;
    decode: (buffer: Buffer, offset?: number, end?: number) => T;
}
