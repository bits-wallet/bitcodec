import { MessageHeader } from "./MessageHeader";

export type BlockHeader = {
  version: number;
  prevHash: string;
  merkleRoot: string;
  timestamp: number;
  bits: number;
  nonce: number;
};

export type BlockHeadersPayload = {
  header: BlockHeader;
  count: number;
};

export interface BlockHeaders extends MessageHeader<BlockHeadersPayload[]> {}
