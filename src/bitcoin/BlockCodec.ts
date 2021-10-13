/* import bitcodec from "..";
import { buffer2hex, hex2buffer } from "./helper";
import { BlockPayload } from "./models/Block";
import { blockHeader, Tx } from "./someCodecs";

const _BlockCodec = bitcodec.Object([
  ["blockHeader", blockHeader],
  // ["txnCount", bitcodec.Number.UInt32LE],
  ["txns", bitcodec.VarArray(bitcodec.VarUIntBitcoin, Tx)],
]);

export const BlockCodec = {
  decode: (hex: string): BlockPayload => {
    return buffer2hex(_BlockCodec.decode(hex2buffer(hex)));
  },

  encode: (obj: BlockPayload): string => {
    return buffer2hex(_BlockCodec.encode(hex2buffer(obj)));
  },
};
 */
