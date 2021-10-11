import bitcodec from "../";

const txVersion = bitcodec.Number.UInt32LE; // int32_t
const txInItemPreviousOutput = bitcodec.Object([
  { name: "hash", type: bitcodec.Buffer(32) },
  { name: "index", type: bitcodec.Number.UInt32LE },
]);
const txInItem = bitcodec.Object([
  { name: "previousOutput", type: txInItemPreviousOutput },
  { name: "signatureScript", type: bitcodec.VarBuffer(bitcodec.VarUIntBitcoin) },
  { name: "sequence", type: bitcodec.Number.UInt32LE }, // uint32_t
]);
const txIn = bitcodec.VarArray(bitcodec.VarUIntBitcoin, txInItem);
const txOutItem = bitcodec.Object([
  { name: "value", type: bitcodec.Number.UInt64LE }, // int64_t
  { name: "pkScript", type: bitcodec.VarBuffer(bitcodec.VarUIntBitcoin) },
]);
const txOut = bitcodec.VarArray(bitcodec.VarUIntBitcoin, txOutItem);
const txLockTime = bitcodec.Number.UInt32LE; // uint32_t
export const Tx = bitcodec.Object([
  { name: "version", type: txVersion },
  { name: "txIn", type: txIn }, // compactSize uint
  { name: "txOut", type: txOut }, // compactSize uint
  { name: "lockTime", type: txLockTime },
]);
export const TxWitnessBase = bitcodec.Object([
  { name: "version", type: txVersion },
  { name: "marker", type: bitcodec.Byte },
  { name: "flag", type: bitcodec.Byte },
  { name: "txIn", type: txIn },
  { name: "txOut", type: txOut },
  { name: "witnessScripts_lockTime", type: bitcodec.AllBuffer },
]);
