export declare type TxStandart = {
    version: number;
    inputs: {
        hash: string;
        index: number;
        script: string;
        sequence: number;
    }[];
    outputs: {
        value: number;
        script: string;
    }[];
    locktime: number;
};
