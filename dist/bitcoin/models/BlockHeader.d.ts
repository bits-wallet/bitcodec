export declare type BlockHeader = {
    version: number;
    prevBlock: string;
    merkleRoot: string;
    timestamp: number;
    bits: number;
    nonce: number;
    txnCount: number;
};
