import { Int53Type, toDouble } from "./common";

export const read = (int53Type: Int53Type, buffer: Buffer, offset = 0): number => {
  const BE = int53Type.endsWith("BE");
  const [high, low] = BE ? [buffer.readUInt32BE(offset), buffer.readUInt32BE(offset + 4)] : [buffer.readUInt32LE(offset + 4), buffer.readUInt32LE(offset)];
  const signed = int53Type.startsWith("Int");
  return toDouble(high, low, signed);
};
