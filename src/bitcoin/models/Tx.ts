// https://developer.bitcoin.org/reference/transactions.html#raw-transaction-format
export interface TxStandart {
  version: number;
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

export interface TxSegwit {
  version: number;
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

export interface TxSegwitBase extends TxStandart {
  // segwit
  marker: number;
  // segwit
  flag: number;
  // helps witness length with txIn count
  witnessScripts_lockTime: string;
}

export interface TxSegwitParsed extends TxStandart {
  // segwit
  marker: number;
  // segwit
  flag: number;
  // helps witness length with txIn count
  witnessScriptsArray: string[][];
}
