import { BlockHeaderBase } from "./BlockHeader";
import { TxStandart, TxSegwit } from "./Tx";
export interface Block extends BlockHeaderBase {
    txns: TxStandart[] | TxSegwit[];
}
