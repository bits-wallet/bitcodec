// https://en.bitcoin.it/wiki/Protocol_documentation#Block_Headers
export type BlockHeader = {
  version: number;
  prevBlock: string;
  merkleRoot: string;
  timestamp: number;
  bits: number;
  nonce: number;
  txnCount: number;
};
