import { BlockHeader } from "./BlockHeader";
import { TxStandart, TxSegwit } from "./Tx";

// https://en.bitcoin.it/wiki/Protocol_documentation#block
export interface Block extends BlockHeader {
  txns: TxStandart[] | TxSegwit[];
}
