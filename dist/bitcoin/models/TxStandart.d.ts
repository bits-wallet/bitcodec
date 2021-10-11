import { StartString } from "./StartString";
export interface TxStandart {
    version: StartString;
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
