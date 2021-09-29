import { IBitcodec } from "../models/IBitcodec";

export class CVarBuffer implements IBitcodec<any> {
  private anyCodec: IBitcodec<any>;
  encodingLength: (buffer?: Buffer) => number;

  encodeBytes: number;
  decodeBytes: number;

  constructor(anyCodec: IBitcodec<any>) {
    this.anyCodec = anyCodec;
    this.encodeBytes = 0;
    this.decodeBytes = 0;

    this.encodingLength = (buffer?: Buffer) => {
      if (buffer === undefined) throw new TypeError("value must be a Buffer instance"); // for CArray encode iter
      return this.anyCodec.encodingLength(buffer.length) + buffer.length;
    };
  }

  encode = (value: Buffer, buffer?: Buffer, offset = 0): Buffer => {
    const bytes = this.encodingLength(value);
    if (!buffer) buffer = Buffer.allocUnsafe(bytes);
    else if (buffer.length - offset < bytes) throw new RangeError("destination buffer is too small");

    this.anyCodec.encode(value.length, buffer, offset);
    offset += this.anyCodec.encodeBytes;

    value.copy(buffer, offset);
    this.encodeBytes = bytes;

    return buffer;
  };

  decode = (buffer: Buffer, offset = 0, end?: number): Buffer => {
    if (end === undefined) end = buffer.length;
    const start = offset;

    const length = this.anyCodec.decode(buffer, offset, end);
    offset += this.anyCodec.decodeBytes;

    if (offset + length > end) throw new RangeError("not enough data for decode");

    this.decodeBytes = offset + length - start;
    return Buffer.from(buffer.slice(offset, offset + length));
  };
}
