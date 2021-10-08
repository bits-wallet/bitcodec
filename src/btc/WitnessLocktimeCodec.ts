import bitcodec from "../";
import { IBitcodec } from "../models/IBitcodec";
import { buffer2hex, hex2buffer } from "./helper";

export class WitnessLocktimeCodec implements IBitcodec<{ witness: string[][]; locktime: number }> {
  private witnessLocktimeData = bitcodec.Object([
    ["witness", bitcodec.VarArray(bitcodec.VarUIntBitcoin, bitcodec.VarArray(bitcodec.VarUIntBitcoin, bitcodec.VarBuffer(bitcodec.VarUIntBitcoin)))],
    ["locktime", bitcodec.Number.UInt32LE],
  ]);
  private inputsCount;

  encodeBytes: number;
  decodeBytes: number;
  encodingLength: (t?: any) => number;

  constructor(inputsCount: number) {
    this.inputsCount = inputsCount;
    this.encodeBytes = this.witnessLocktimeData.encodeBytes;
    this.decodeBytes = this.witnessLocktimeData.decodeBytes;
    this.encodingLength = this.witnessLocktimeData.encodingLength;
  }

  encode = (value: any, buffer?: Buffer | undefined, offset?: number | undefined): Buffer => {
    const result = this.witnessLocktimeData.encode(value, buffer, offset).slice(1);

    this.encodeBytes = this.witnessLocktimeData.encodeBytes;
    this.decodeBytes = this.witnessLocktimeData.decodeBytes;
    this.encodingLength = this.witnessLocktimeData.encodingLength;

    return result;
  };

  decode = (buffer: Buffer, offset?: number | undefined, end?: number | undefined): { witness: string[][]; locktime: number } => {
    const inputCountHex = this.inputsCount.toString(16).padStart(2, "0");
    const bufferHex = buffer2hex(buffer);
    const newBuffer = hex2buffer(inputCountHex + bufferHex);
    const result = this.witnessLocktimeData.decode(newBuffer, offset, end);

    this.encodeBytes = this.witnessLocktimeData.encodeBytes;
    this.decodeBytes = this.witnessLocktimeData.decodeBytes;
    this.encodingLength = this.witnessLocktimeData.encodingLength;

    return result as { witness: string[][]; locktime: number };
  };
}
