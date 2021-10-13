import { Magic } from "./Magic";
export interface TxSegwit {
  version: Magic;
  marker: number;
  flag: number;
  txIn: {
    previousOutput: {
      hash: string;
      index: number;
    };
    signatureScript: string;
    witnessScripts: string[];
    sequence: number;
  }[];
  txOut: {
    value: number;
    pkScript: string;
  }[];
  lockTime: number;
}
