import { Int53Type, readInt53, writeInt53 } from "@bitmatrix/int53";
import { IBitcodec } from "../models/IBitcodec";
import { NumberTypes } from "../models/NumberTypes";

export class CNumber implements IBitcodec<number> {
  private length: number;
  private write: (buffer: Buffer, value: number, offset?: number) => void;
  private read: (buffer: Buffer, offset?: number | undefined) => number;

  encodingLength = (): number => this.length;

  encodeBytes: number;
  decodeBytes: number;

  constructor(numberType: NumberTypes, length: number) {
    this.length = length;
    this.encodeBytes = length;
    this.decodeBytes = length;

    if (Buffer.prototype["write" + numberType]) {
      this.write = (buffer: Buffer, value: number, offset?: number) => {
        return (buffer as any)["write" + numberType](value, offset);
      };
    } else {
      this.write = (buffer: Buffer, value: number, offset?: number) => {
        return writeInt53(numberType as unknown as Int53Type, value, buffer, offset);
      };
    }

    if (Buffer.prototype["read" + numberType]) {
      this.read = (buffer: Buffer, offset?: number) => {
        return (buffer as any)["read" + numberType](offset);
      };
    } else {
      this.read = (buffer: Buffer, offset?: number) => {
        return readInt53(numberType as unknown as Int53Type, buffer, offset);
      };
    }
  }

  encode = (value: number, buffer?: Buffer, offset = 0): Buffer => {
    buffer = buffer || Buffer.allocUnsafe(this.length);

    this.write(buffer, value, offset);
    return buffer;
  };

  decode = (buffer: Buffer, offset = 0, end?: number): number => {
    if (!end) return this.read(buffer, offset);
    return this.read(buffer.slice(offset, end), 0);
  };
}
