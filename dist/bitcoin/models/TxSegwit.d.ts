export declare type TxSegwit = {
    version: number;
    marker: number;
    flag: number;
    inputs: {
        hash: string;
        index: number;
        script: string;
        witness: string[];
        sequence: number;
    }[];
    outputs: {
        value: number;
        script: string;
    }[];
    locktime: number;
};
