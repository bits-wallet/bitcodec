import { IBitcodec } from "../models/IBitcodec";
import { CVarBuffer } from "./CVarBuffer";

type Encodings = "ascii" | "utf8" | "utf16le" | "ucs2" | "base64" | "hex";

export class CVarString implements IBitcodec<string> {
  private anyCodec: IBitcodec<any>;
  private encoding: Encodings;
  private varBufferCodec: CVarBuffer;
  encodingLength: (value?: string) => number;

  encodeBytes: number;
  decodeBytes: number;

  constructor(anyCodec: IBitcodec<any>, encoding: Encodings = "utf8") {
    this.anyCodec = anyCodec;
    this.encoding = encoding;
    this.varBufferCodec = new CVarBuffer(anyCodec);

    this.encodeBytes = 0;
    this.decodeBytes = 0;

    this.encodingLength = (value?: string) => {
      if (value === undefined) throw new TypeError("value must be a string");
      const valueLength = Buffer.byteLength(value, this.encoding);
      return this.anyCodec.encodingLength(value.length) + valueLength;
    };
  }

  encode = (value: string, buffer?: Buffer, offset = 0): Buffer => {
    const valueLength = Buffer.byteLength(value, this.encoding);
    const bytes = this.anyCodec.encodingLength(value.length) + valueLength;

    if (!buffer) buffer = Buffer.allocUnsafe(bytes);
    if (offset + bytes > buffer.length) throw new RangeError("destination buffer is too small");

    this.anyCodec.encode(valueLength, buffer, offset);
    offset += this.anyCodec.encodeBytes;
    buffer.write(value, offset, valueLength, this.encoding);

    this.encodeBytes = bytes;
    return buffer;
  };

  decode = (buffer: Buffer, offset = 0, end?: number): string => {
    const str = this.varBufferCodec.decode(buffer, offset, end).toString(this.encoding);
    this.decodeBytes = this.varBufferCodec.decodeBytes;
    return str;
  };
}
