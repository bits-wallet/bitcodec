import { checkBufferLengthForEncode, checkDefined } from "../errors";
import { BitcodecItem } from "../models/BitcodecItem";
import { IBitcodec } from "../models/IBitcodec";

export class CObject implements IBitcodec<object> {
  private codecName = "CObject";
  private items: { name: string; type: IBitcodec<any> }[];

  encodeBytes: number;
  decodeBytes: number;
  encodingLength: (t?: object) => number;

  constructor(items: BitcodecItem[]) {
    this.items = items.map((item: BitcodecItem) => (Array.isArray(item) ? { name: item[0], type: item[1] } : item));

    this.encodeBytes = 0;
    this.decodeBytes = 0;

    this.encodingLength = (o?: object): number => {
      checkDefined(this.codecName, o, "object");
      if (o === undefined) return 0; // never

      return this.items.reduce((previousValue: number, currentValue: { name: string; type: IBitcodec<any> }) => {
        const value = (o as any)[currentValue.name];
        return previousValue + currentValue.type.encodingLength(value);
      }, 0);
    };
  }

  encode = (object: object, buffer?: Buffer, offset = 0): Buffer => {
    const start = offset;
    const bytes = this.encodingLength(object);
    if (buffer === undefined) buffer = Buffer.allocUnsafe(bytes);
    else checkBufferLengthForEncode(this.codecName, buffer, offset, bytes);

    this.items.forEach((item) => {
      const value = (object as any)[item.name];
      item.type.encode(value, buffer, offset);
      offset += item.type.encodeBytes;
    });
    this.encodeBytes = offset - start;
    return buffer;
  };

  decode = (buffer: Buffer, offset: number = 0, end?: number | undefined): object => {
    let result = {};
    const start = offset;

    this.items.forEach((item) => {
      const value = item.type.decode(buffer, offset, end);
      offset += item.type.decodeBytes;
      (result as any)[item.name] = value;
    });
    this.decodeBytes = offset - start;

    return result;
  };
}
