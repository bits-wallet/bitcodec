import { BlockHeader } from "./BlockHeader";
import { TxStandart, TxSegwit } from "./Tx";
export declare type Block = {
    blockHeader: BlockHeader;
    txns: TxStandart[] | TxSegwit[];
};
