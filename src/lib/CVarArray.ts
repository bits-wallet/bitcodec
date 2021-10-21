import * as util from "../util";
import { IBitcodec } from "../models/IBitcodec";
import { checkDefined } from "../errors";

export class CVarArray implements IBitcodec<any[]> {
  private codecName = "CVarArray";
  private length: number = -1;
  private lengthCodec: IBitcodec<any>;
  private itemCodec: IBitcodec<any>;

  private calcLength = (items: any[]) => {
    return util.calcAllLength(items, this.itemCodec.encodingLength, this.lengthCodec.encodingLength(items.length));
  };

  encodingLength = (array?: any[]): number => {
    checkDefined(this.codecName, array, "array");
    if (array === undefined) return 0; // never
    return this.calcLength(array);
  };

  encodeBytes: number = -1;
  decodeBytes: number = -1;

  constructor(lengthCodec: IBitcodec<any>, itemCodec: IBitcodec<any>) {
    this.lengthCodec = lengthCodec;
    this.itemCodec = itemCodec;
  }

  encode = (value: any[], buffer?: Buffer, offset = 0): Buffer => {
    if (!buffer) buffer = Buffer.allocUnsafe(this.calcLength(value));

    this.lengthCodec.encode(value.length, buffer, offset);

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
          this.itemCodec.encode(item, buffer, loffset);
          return this.itemCodec.encodeBytes;
        },
        this.lengthCodec.encodeBytes + offset
      ) - offset;

    return buffer;
  };

  decode = (buffer: Buffer, offset = 0, end?: number): any[] => {
    if (!offset) offset = 0;
    const items = new Array(this.lengthCodec.decode(buffer, offset, end));

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
          items[index || 0] = this.itemCodec.decode(buffer, loffset, end);
          return this.itemCodec.decodeBytes;
        },
        this.lengthCodec.decodeBytes + offset
      ) - offset;
    return items;
  };
}
