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

    this.encodeBytes =
      util.size(
        value,
        (item, index, loffset) => {
          this.anyCodec.encode(item, buffer, loffset);
          return this.anyCodec.encodeBytes;
        },
        this.lengthType.encodeBytes + offset
      ) - offset;

    return buffer;
  };

  decode = (buffer: Buffer, offset = 0, end?: number): any[] => {
    if (!offset) offset = 0;
    const items = new Array(this.lengthType.decode(buffer, offset, end));

    this.decodeBytes =
      util.size(
        items,
        (item, index, loffset) => {
          items[index || 0] = this.anyCodec.decode(buffer, loffset, end);
          return this.anyCodec.decodeBytes;
        },
        this.lengthType.decodeBytes + offset
      ) - offset;
    return items;
  };
}
