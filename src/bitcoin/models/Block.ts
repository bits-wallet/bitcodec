import { BlockHeader } from "./BlockHeader";
import { TxStandart, TxSegwit } from "./Tx";

// https://developer.bitcoin.org/reference/block_chain.html#serialized-blocks
export type Block = {
  blockHeader: BlockHeader;
  // txnCount: number;
  txns: TxStandart[] | TxSegwit[];
};
