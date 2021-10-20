import * as util from "../util";
import { IBitcodec } from "../models/IBitcodec";
import { CBuffer } from "./CBuffer";
import { checkDefined } from "../errors";

export class CVarArray implements IBitcodec<any[]> {
  private codecName = "CVarArray";
  private length: number = -1;
  private lengthType: IBitcodec<any>;
  private anyCodec: IBitcodec<any>;

  private calcLength = (items: any[]) => {
    return util.calcAllLength(items, this.anyCodec.encodingLength, this.lengthType.encodingLength(items.length));
  };

  encodingLength = (array?: any[]): number => {
    checkDefined(this.codecName, array, "array");
    if (array === undefined) return 0; // never
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

    /* this.encodeBytes =
      value.reduce((previusValue, currentItem, _) => {
        this.anyCodec.encode(currentItem, buffer, previusValue);
        const newAnyCodecEncodeBytes = this.anyCodec.encodeBytes;
        return previusValue + newAnyCodecEncodeBytes;
      }, this.lengthType.encodeBytes + offset) - offset; */

    this.encodeBytes =
      util.calcAllLength(
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

    /* this.decodeBytes =
      items.reduce((previusValue, currentItem, currentIndex) => {
        items[currentIndex] = this.anyCodec.decode(buffer, previusValue, end);
        const newAnyCodecDecodeBytes = this.anyCodec.decodeBytes;
        return previusValue + newAnyCodecDecodeBytes;
      }, this.lengthType.decodeBytes + offset) - offset; */

    this.decodeBytes =
      util.calcAllLength(
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
