import { EncodingType } from "../models/EncodingType";
import { IBitcodec } from "../models/IBitcodec";
import { CBuffer } from "./CBuffer";

// https://en.bitcoin.it/wiki/Protocol_documentation#Variable_length_string
export class CString implements IBitcodec<string> {
  private length: number;
  private bufferCodec: IBitcodec<Buffer>;
  private encodingType: EncodingType;

  encodingLength: (value?: string) => number;

  encodeBytes: number;
  decodeBytes: number;

  constructor(length: number, encodingType: EncodingType = "utf8") {
    this.length = length;
    this.encodingType = encodingType;
    this.bufferCodec = new CBuffer(this.length);

    this.encodeBytes = length;
    this.decodeBytes = length;

    this.encodingLength = (value?: string) => this.length;
  }

  encode = (value: string, buffer?: Buffer, offset = 0): Buffer => {
    if (Buffer.byteLength(value, this.encodingType) !== this.length) throw new RangeError("value.length is out of bounds");
    if (!buffer) return Buffer.from(value, this.encodingType);
    if (offset + this.length > buffer.length) throw new RangeError("destination buffer is too small");

    buffer.write(value, offset, length, this.encodingType);
    return buffer;
  };

  decode = (buffer: Buffer, offset = 0, end?: number): string => this.bufferCodec.decode(buffer, offset, end).toString(this.encodingType);
}
