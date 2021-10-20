import { checkLength, checkBufferLengthForEncode, checkBufferLengthForDecode } from "../errors";
import { IBitcodec } from "../models/IBitcodec";

export class CBuffer implements IBitcodec<Buffer> {
  private codecName = "Buffer";
  private length: number;
  encodingLength = (): number => this.length;

  encodeBytes: number;
  decodeBytes: number;

  constructor(length: number) {
    this.length = length;
    this.encodeBytes = length;
    this.decodeBytes = length;
  }

  encode = (value: Buffer, buffer?: Buffer, offset = 0): Buffer => {
    checkLength(this.codecName, value.length, this.length);

    if (!buffer) return Buffer.from(value);
    checkBufferLengthForEncode(this.codecName, buffer, offset, this.length);

    value.copy(buffer, offset);
    return buffer;
  };

  decode = (buffer: Buffer, offset = 0, end?: number): Buffer => {
    if (!end) end = buffer.length;
    checkBufferLengthForDecode(this.codecName, offset, end, this.length);

    return Buffer.from(buffer.slice(offset, offset + this.length));
  };
}
