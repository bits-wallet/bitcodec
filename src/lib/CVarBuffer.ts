import { checkBufferLengthForDecode, checkBufferLengthForEncode, checkDefined } from "../errors";
import { IBitcodec } from "../models/IBitcodec";
import { CNumber } from "./CNumber";
import { CVarUIntBitcoin } from "./CVarUIntBitcoin";

export class CVarBuffer implements IBitcodec<any> {
  private codecName = "VarBuffer";
  private anyCodec: IBitcodec<any>;
  encodingLength: (buffer?: Buffer) => number;

  encodeBytes: number;
  decodeBytes: number;

  constructor(anyCodec: IBitcodec<CNumber | CVarUIntBitcoin>) {
    this.anyCodec = anyCodec;
    this.encodeBytes = 0;
    this.decodeBytes = 0;

    this.encodingLength = (buffer?: Buffer) => {
      checkDefined(this.codecName, buffer, "buffer"); // for CArray encode iter
      if (buffer !== undefined) return this.anyCodec.encodingLength(buffer.length) + buffer.length;
      return 0; // never
    };
  }

  encode = (value: Buffer, buffer?: Buffer, offset = 0): Buffer => {
    const bytes = this.encodingLength(value);
    if (!buffer) buffer = Buffer.allocUnsafe(bytes);
    else checkBufferLengthForEncode(this.codecName, buffer, offset, bytes);

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
    checkBufferLengthForDecode(this.codecName, offset, end, length);

    this.decodeBytes = offset + length - start;
    return Buffer.from(buffer.slice(offset, offset + length));
  };
}
