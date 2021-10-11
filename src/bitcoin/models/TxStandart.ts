import { StartString } from "./StartString";

// https://developer.bitcoin.org/reference/transactions.html#raw-transaction-format
export interface TxStandart {
  version: StartString;
  // https://developer.bitcoin.org/reference/transactions.html#txin-a-transaction-input-non-coinbase
  txIn: {
    // https://developer.bitcoin.org/reference/transactions.html#outpoint-the-specific-part-of-a-specific-output
    previousOutput: {
      hash: string;
      index: number;
    };
    signatureScript: string;
    sequence: number;
  }[];
  // https://developer.bitcoin.org/reference/transactions.html#txout-a-transaction-output
  txOut: {
    value: number;
    pkScript: string;
  }[];
  lockTime: number;
}
