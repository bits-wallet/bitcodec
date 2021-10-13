import { BlockHeader } from "./BlockHeaders";
import { MessageHeader } from "./MessageHeader";
import { TxSegwit } from "./TxSegwit";
import { TxStandart } from "./TxStandart";

// https://developer.bitcoin.org/reference/block_chain.html#serialized-blocks

export type BlockPayload = {
  blockHeader: BlockHeader;
  // txnCount: number;
  txns: TxStandart[] | TxSegwit[];
};

export interface Block extends MessageHeader<BlockPayload> {}
