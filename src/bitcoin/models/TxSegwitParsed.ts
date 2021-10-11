import { TxStandart } from "./TxStandart";

export interface TxSegwitParsed extends TxStandart {
  // segwit
  marker: number;
  // segwit
  flag: number;
  // helps witness length with txIn count
  witnessScriptsArray: string[][];
}
