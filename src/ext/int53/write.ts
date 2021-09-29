import { Int53Type, intHighLow, uintHighLow } from "./common";

export const write = (int53Type: Int53Type, number: number, buffer: Buffer, offset = 0): void => {
  const signed = int53Type.startsWith("Int");
  const hl = signed ? intHighLow(number) : uintHighLow(number);
  const BE = int53Type.endsWith("BE");
  if (BE) {
    buffer.writeUInt32BE(hl[0], offset);
    buffer.writeUInt32BE(hl[1], offset + 4);
  } else {
    buffer.writeUInt32LE(hl[1], offset);
    buffer.writeUInt32LE(hl[0], offset + 4);
  }
};
