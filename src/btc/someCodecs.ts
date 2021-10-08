import bitcodec from "../index";

const TxVersion = bitcodec.Number.UInt32LE; // int32_t
const TxInput = bitcodec.Object([
  { name: "hash", type: bitcodec.Buffer(32) },
  { name: "index", type: bitcodec.Number.UInt32LE },
  { name: "script", type: bitcodec.VarBuffer(bitcodec.VarUIntBitcoin) },
  { name: "sequence", type: bitcodec.Number.UInt32LE }, // uint32_t
]);
const TxInputs = bitcodec.VarArray(bitcodec.VarUIntBitcoin, TxInput);
const TxOutput = bitcodec.Object([
  { name: "value", type: bitcodec.Number.UInt64LE }, // int64_t
  { name: "script", type: bitcodec.VarBuffer(bitcodec.VarUIntBitcoin) },
]);
const TxOutputs = bitcodec.VarArray(bitcodec.VarUIntBitcoin, TxOutput);
const TxLocktime = bitcodec.Number.UInt32LE; // uint32_t
export const Tx = bitcodec.Object([
  { name: "version", type: TxVersion },
  { name: "inputs", type: TxInputs }, // compactSize uint
  { name: "outputs", type: TxOutputs }, // compactSize uint
  { name: "locktime", type: TxLocktime },
]);
export const TxWitnessBase = bitcodec.Object([
  { name: "version", type: TxVersion },
  { name: "marker", type: bitcodec.Byte },
  { name: "flag", type: bitcodec.Byte },
  { name: "inputs", type: TxInputs },
  { name: "outputs", type: TxOutputs },
  { name: "witness_locktime", type: bitcodec.AllBuffer },
]);
export const TxWitness = bitcodec.Object([
  { name: "version", type: TxVersion },
  { name: "marker", type: bitcodec.Byte },
  { name: "flag", type: bitcodec.Byte },
  { name: "inputs", type: TxInputs },
  { name: "outputs", type: TxOutputs },
  { name: "witness", type: bitcodec.Buffer(324) },
  { name: "locktime", type: TxLocktime },
]);

// export const WitnessData = bitcodec.VarArray(bitcodec.VarUIntBitcoin, bitcodec.VarArray(bitcodec.VarUIntBitcoin, bitcodec.VarBuffer(bitcodec.VarUIntBitcoin)));
