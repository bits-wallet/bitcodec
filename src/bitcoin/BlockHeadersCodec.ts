import bitcodec from "..";

export const BlockHeaderCodec = bitcodec.Object([
  ["version", bitcodec.Number.Int32LE],
  ["prevBlock", bitcodec.Buffer(32)],
  ["merkleRoot", bitcodec.Buffer(32)],
  ["timestamp", bitcodec.Number.UInt32LE],
  ["bits", bitcodec.Number.UInt32LE],
  ["nonce", bitcodec.Number.UInt32LE],
  ["txnCount", bitcodec.Number.UInt8],
]);

export const BlockHeaderArrayCodec = bitcodec.VarArray(bitcodec.VarUIntBitcoin, BlockHeaderCodec);
