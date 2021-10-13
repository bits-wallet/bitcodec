import bitcodec from "..";

const blockHeader = bitcodec.Object([
  ["version", bitcodec.Number.Int32LE],
  ["prevBlock", bitcodec.Buffer(32)],
  ["merkleRoot", bitcodec.Buffer(32)],
  ["timestamp", bitcodec.Number.UInt32LE],
  ["bits", bitcodec.Number.UInt32LE],
  ["nonce", bitcodec.Number.UInt32LE],
  ["txnCount", bitcodec.Number.UInt8],
]);

const blockHeaderObject = bitcodec.Object([{ name: "headers", type: blockHeader }]);

export const BlockHeadersCodec = bitcodec.VarArray(bitcodec.VarUIntBitcoin, blockHeaderObject);

// export const BlockMessageStructureCodec = {
//   decode: (hex: string): BlockHeader => {
//     return buffer2hex(_BlockMessageStructureCodec.decode(hex2buffer(hex)));
//   },

//   encode: (obj: BlockHeader): string => {
//     return buffer2hex(_BlockMessageStructureCodec.encode(hex2buffer(obj)));
//   },
// };
