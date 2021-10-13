import { BlockHeader } from "./BlockHeader";
import { TxStandart, TxSegwit } from "./Tx";
export interface Block extends BlockHeader {
    txns: TxStandart[] | TxSegwit[];
}
