import * as util from "../util";
import { IBitcodec } from "../models/IBitcodec";
import { checkDefined, checkLength } from "../errors";

export class CArray implements IBitcodec<any[]> {
  private codecName = "CArray";
  private length: number;
  private anyCodec: IBitcodec<any>;

  private calcLength = (items: any[]) => {
    return util.calcAllLength(items, this.anyCodec.encodingLength);
  };

  encodingLength = (array?: any[]): number => {
    checkDefined(this.codecName, array, "array");
    if (array === undefined) return 0; // never
    checkLength(this.codecName, array.length, this.length);
    return this.calcLength(array);
  };

  encodeBytes: number;
  decodeBytes: number;

  constructor(length: number, anyCodec: IBitcodec<any>) {
    this.length = length;
    this.anyCodec = anyCodec;
    this.encodeBytes = length;
    this.decodeBytes = length;
  }

  encode = (value: any[], buffer?: Buffer, offset = 0): Buffer => {
    checkLength(this.codecName, value.length, this.length);

    if (!buffer) buffer = Buffer.allocUnsafe(this.calcLength(value));
    const typeEncode = this.anyCodec.encode;
    const typeEncodeBytes = this.anyCodec.encodeBytes;

    /* this.encodeBytes =
      value.reduce((previusValue, currentItem, _) => {
        this.anyCodec.encode(currentItem, buffer, previusValue);
        const newAnyCodecEncodeBytes = this.anyCodec.encodeBytes;
        return previusValue + newAnyCodecEncodeBytes;
      }, offset) - offset; */

    this.encodeBytes =
      util.calcAllLength(
        value,
        function (item, index, loffset) {
          typeEncode(item, buffer, loffset);
          return typeEncodeBytes;
        },
        offset
      ) - offset;
    return buffer;
  };

  decode = (buffer: Buffer, offset = 0, end?: number): any[] => {
    if (!offset) offset = 0;
    const items = new Array(this.length);

    const typeDecode = this.anyCodec.decode;
    const typeDecodeBytes = this.anyCodec.decodeBytes;

    /* this.decodeBytes =
      items.reduce((previusValue, currentItem, currentIndex) => {
        items[currentIndex] = this.anyCodec.decode(buffer, previusValue, end);
        const newAnyCodecDecodeBytes = this.anyCodec.decodeBytes;
        return previusValue + newAnyCodecDecodeBytes;
      }, offset + offset) - offset; */

    this.decodeBytes =
      util.calcAllLength(
        items,
        function (item, index, loffset) {
          items[index || 0] = typeDecode(buffer, loffset, end);
          return typeDecodeBytes;
        },
        offset
      ) - offset;
    return items;
  };
}
