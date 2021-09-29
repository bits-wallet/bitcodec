import * as util from "../util";
import { IBitcodec } from "../models/IBitcodec";
import { CBuffer } from "./CBuffer";

export class CArray implements IBitcodec<any[]> {
  private length: number;
  private cBuffer: CBuffer;

  private calcLength = (items: any[]) => {
    return util.size(items, this.cBuffer.encodingLength);
  };

  encodingLength = (array?: any[]): number => {
    if (array === undefined) throw new TypeError("value must be an Array instance");
    if (array.length !== this.length) throw new RangeError("value.length is out of bounds");
    return this.calcLength(array);
  };

  encodeBytes: number;
  decodeBytes: number;

  constructor(length: number, cBuffer: CBuffer) {
    this.length = length;
    this.cBuffer = cBuffer;
    this.encodeBytes = length;
    this.decodeBytes = length;
  }

  encode = (value: any[], buffer?: Buffer, offset = 0): Buffer => {
    if (value.length !== this.length) throw new RangeError("value.length is out of bounds");
    if (!buffer) buffer = Buffer.allocUnsafe(this.calcLength(value));

    const typeEncode = this.cBuffer.encode;
    const typeEncodeBytes = this.cBuffer.encodeBytes;

    this.encodeBytes =
      util.size(
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

    const typeDecode = this.cBuffer.decode;
    const typeDecodeBytes = this.cBuffer.decodeBytes;

    this.decodeBytes =
      util.size(
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
