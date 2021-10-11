import { StartString } from "./StartString";
export interface TxSegwit {
    version: StartString;
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
