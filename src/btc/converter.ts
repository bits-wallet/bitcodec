import { TxSegwit } from "./models/TxSegwit";
import { TxSegwitParsed } from "./models/TxSegwitParsed";

export const toTxSegwit = (txSegwitParsed: TxSegwitParsed): TxSegwit => {
  const txSegwit: TxSegwit = {
    version: txSegwitParsed.version,
    marker: txSegwitParsed.marker,
    flag: txSegwitParsed.flag,
    inputs: [],
    outputs: txSegwitParsed.outputs,
  };

  txSegwitParsed.inputs.forEach((input, index) => {
    txSegwit.inputs.push({
      hash: input.hash,
      index: input.index,
      script: input.script,
      witness: txSegwitParsed.witness[index],
      sequence: input.sequence,
    });
  });

  return txSegwit;
};

export const toTxSegwitParsed = (txSegwit: TxSegwit): TxSegwitParsed => {
  const txSegwitParsed: TxSegwitParsed = {
    version: txSegwit.version,
    marker: txSegwit.marker,
    flag: txSegwit.flag,
    inputs: [],
    outputs: txSegwit.outputs,
    witness: [],
  };

  txSegwit.inputs.forEach((input, index) => {
    txSegwitParsed.inputs.push({
      hash: input.hash,
      index: input.index,
      script: input.script,
      sequence: input.sequence,
    });

    txSegwitParsed.witness.push(txSegwitParsed.witness[index]);
  });

  return txSegwitParsed;
};
