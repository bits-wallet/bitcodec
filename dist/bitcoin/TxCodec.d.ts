import { TxSegwit } from "./models/TxSegwit";
import { TxStandart } from "./models/TxStandart";
export declare const TxCodec: {
    encode: (txObject: TxStandart | TxSegwit) => string;
    decode: (txHex: string) => TxStandart | TxSegwit;
};
