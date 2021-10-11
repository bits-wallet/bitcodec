import { TxStandart } from "./TxStandart";

export interface TxSegwitBase extends TxStandart {
  // segwit
  marker: number;
  // segwit
  flag: number;
  // helps witness length with txIn count
  witnessScripts_lockTime: string;
}
