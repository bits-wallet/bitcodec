import bitcodec from "..";
import { buffer2hex, hex2buffer } from "./helper";
import { BlockHeaders } from "./models/BlockHeaders";

const blockHeader = bitcodec.Object([
  ["version", bitcodec.Number.Int32LE],
  ["prevHash", bitcodec.Buffer(32)],
  ["merkleRoot", bitcodec.Buffer(32)],
  ["timestamp", bitcodec.Number.UInt32LE],
  ["bits", bitcodec.Number.UInt32LE],
  ["nonce", bitcodec.Number.UInt32LE],
]);

const blockHeaderObject = bitcodec.Object([
  { name: "headers", type: blockHeader },
  { name: "count", type: bitcodec.Number.UInt32LE },
]);

const _BlockHeaderCodec = bitcodec.VarArray(bitcodec.VarUIntBitcoin, blockHeaderObject);

export const BlockHeaderCodec = {
  decode: (hex: string): BlockHeaders => {
    return buffer2hex(_BlockHeaderCodec.decode(hex2buffer(hex)));
  },

  encode: (obj: BlockHeaders): string => {
    return buffer2hex(_BlockHeaderCodec.encode(hex2buffer(obj)));
  },
};
