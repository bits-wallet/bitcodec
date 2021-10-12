import { MessageHeader } from "./MessageHeader";

// https://developer.bitcoin.org/reference/block_chain.html#block-headers

export type BlockHeader = {
  version: number;
  previousBlockHeaderHash: string;
  merkleRootHash: string;
  time: number;
  nBits: number;
  nonce: number;
};

// https://developer.bitcoin.org/reference/p2p_networking.html#getheaders

export type BlockHeadersPayload = {
  headers: BlockHeader;
  count: number;
};

export interface BlockHeaders extends MessageHeader<BlockHeadersPayload[]> {}
