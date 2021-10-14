import { TxStandart, TxSegwit } from "../models/Tx";
export declare const TxCodec: {
    encode: (txObject: TxStandart | TxSegwit) => string;
    decode: (txHex: string) => TxStandart | TxSegwit;
};
