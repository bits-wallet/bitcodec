import { checkBufferLengthForDecode, checkBufferLengthForEncode, checkLength } from "../errors";
import { EncodingType } from "../models/EncodingType";
import { IBitcodec } from "../models/IBitcodec";
import { CBuffer } from "./CBuffer";

// https://en.bitcoin.it/wiki/Protocol_documentation#Variable_length_string
export class CString implements IBitcodec<string> {
  private codecName = "String";
  private length: number;
  private bufferCodec: IBitcodec<Buffer>;
  private encodingType: EncodingType;

  encodingLength = (value?: string) => this.length;

  encodeBytes: number;
  decodeBytes: number;

  constructor(length: number, encodingType: EncodingType = "utf8") {
    this.length = length;
    this.encodingType = encodingType;
    this.bufferCodec = new CBuffer(this.length);

    this.encodeBytes = length;
    this.decodeBytes = length;
  }

  encode = (value: string, buffer?: Buffer, offset = 0): Buffer => {
    checkLength(this.codecName, Buffer.byteLength(value, this.encodingType), this.length);

    if (!buffer) return Buffer.from(value, this.encodingType);
    checkBufferLengthForEncode(this.codecName, buffer, offset, this.length);

    buffer.write(value, offset, length, this.encodingType);
    return buffer;
  };

  decode = (buffer: Buffer, offset = 0, end?: number): string => {
    checkBufferLengthForDecode(this.codecName, offset, end || buffer.length, this.length);
    return this.bufferCodec.decode(buffer, offset, end).toString(this.encodingType);
  };
}
