import { Magic } from "./Magic";
export interface TxStandart {
  version: Magic;
  txIn: {
    previousOutput: {
      hash: string;
      index: number;
    };
    signatureScript: string;
    sequence: number;
  }[];
  txOut: {
    value: number;
    pkScript: string;
  }[];
  lockTime: number;
}
