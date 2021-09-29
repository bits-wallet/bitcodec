import * as util from "../util";
import { IBitcodec } from "../models/IBitcodec";
import { CBuffer } from "./CBuffer";

export class CVarArray implements IBitcodec<any[]> {
  private length: number = -1;
  private lengthType: IBitcodec<any>;
  private anyCodec: IBitcodec<any>;

  private calcLength = (items: any[]) => {
    return util.size(items, this.anyCodec.encodingLength, this.lengthType.encodingLength(items.length));
  };

  encodingLength = (array?: any[]): number => {
    if (array === undefined) throw new TypeError("value must be an Array instance");
    return this.calcLength(array);
  };

  encodeBytes: number = -1;
  decodeBytes: number = -1;

  constructor(lengthType: IBitcodec<any>, anyCodec: IBitcodec<any>) {
    this.lengthType = lengthType;
    this.anyCodec = anyCodec;
  }

  encode = (value: any[], buffer?: Buffer, offset = 0): Buffer => {
    if (!buffer) buffer = Buffer.allocUnsafe(this.calcLength(value));

    this.lengthType.encode(value.length, buffer, offset);

    const typeEncode = this.anyCodec.encode;
    const typeEncodeBytes = this.anyCodec.encodeBytes;
    const lengthTypeEncodeBytes = this.lengthType.encodeBytes;

    this.encodeBytes =
      util.size(
        value,
        (item, index, loffset) => {
          typeEncode(item, buffer, loffset);
          return typeEncodeBytes;
        },
        lengthTypeEncodeBytes + offset
      ) - offset;

    return buffer;
  };

  decode = (buffer: Buffer, offset = 0, end?: number): any[] => {
    if (!offset) offset = 0;
    const items = new Array(this.lengthType.decode(buffer, offset, end));

    const typeDecode = this.anyCodec.decode;
    const typeDecodeBytes = this.anyCodec.decodeBytes;
    const lengthTypeDecodeBytes = this.lengthType.decodeBytes;

    this.decodeBytes =
      util.size(
        items,
        (item, index, loffset) => {
          items[index || 0] = typeDecode(buffer, loffset, end);
          return typeDecodeBytes;
        },
        lengthTypeDecodeBytes + offset
      ) - offset;
    return items;
  };
}
