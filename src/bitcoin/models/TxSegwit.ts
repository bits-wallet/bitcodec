import { StartString } from "./StartString";

export interface TxSegwit {
  version: StartString;
  // segwit
  marker: number;
  // segwit
  flag: number;
  // https://developer.bitcoin.org/reference/transactions.html#txin-a-transaction-input-non-coinbase
  txIn: {
    // https://developer.bitcoin.org/reference/transactions.html#outpoint-the-specific-part-of-a-specific-output
    previousOutput: {
      hash: string;
      index: number;
    };
    signatureScript: string;
    // segwit
    witnessScripts: string[];
    sequence: number;
  }[];
  // https://developer.bitcoin.org/reference/transactions.html#txout-a-transaction-output
  txOut: {
    value: number;
    pkScript: string;
  }[];
  lockTime: number;
}
