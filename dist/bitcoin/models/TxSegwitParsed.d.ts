import { TxStandart } from "./TxStandart";
export interface TxSegwitParsed extends TxStandart {
    marker: number;
    flag: number;
    witnessScriptsArray: string[][];
}
