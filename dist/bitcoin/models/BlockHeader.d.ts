export declare type BlockHeader = {
    version: number;
    previousBlockHeaderHash: string;
    merkleRootHash: string;
    time: number;
    nBits: number;
    nonce: number;
};
