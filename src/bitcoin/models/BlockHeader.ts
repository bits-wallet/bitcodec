// https://developer.bitcoin.org/reference/block_chain.html#block-headers
export type BlockHeader = {
  version: number;
  previousBlockHeaderHash: string;
  merkleRootHash: string;
  time: number;
  nBits: number;
  nonce: number;
};
