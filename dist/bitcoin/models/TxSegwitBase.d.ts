import { TxStandart } from "./TxStandart";
export interface TxSegwitBase extends TxStandart {
    marker: number;
    flag: number;
    witnessScripts_lockTime: string;
}
