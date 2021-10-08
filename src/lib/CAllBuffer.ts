import { IBitcodec } from "../models/IBitcodec";

export class CAllBuffer implements IBitcodec<Buffer> {
  private length: number;
  encodingLength = (): number => this.length;

  encodeBytes: number;
  decodeBytes: number;

  constructor() {
    this.length = 0;
    this.encodeBytes = 0;
    this.decodeBytes = 0;
  }

  encode = (value: Buffer, buffer?: Buffer, offset = 0): Buffer => {
    if (!Buffer.isBuffer(value)) throw new TypeError("value must be a Buffer instance"); // for CArray encode iter
    this.length = value.length - offset;
    if (!buffer) return Buffer.from(value);
    if (offset + this.length > buffer.length) throw new RangeError("destination buffer is too small");
    value.copy(buffer, offset);
    return buffer;
  };

  decode = (buffer: Buffer, offset = 0, end?: number): Buffer => {
    if (!end) end = buffer.length;
    this.length = buffer.length - offset;
    if (offset + this.length > end) throw new RangeError("not enough data for decode");
    return Buffer.from(buffer.slice(offset, offset + this.length));
  };
}
