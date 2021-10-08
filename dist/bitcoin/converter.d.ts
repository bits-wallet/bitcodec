import { TxSegwit } from "./models/TxSegwit";
import { TxSegwitBase } from "./models/TxSegwitBase";
import { TxSegwitParsed } from "./models/TxSegwitParsed";
export declare const toTxSegwit: (txSegwitParsed: TxSegwitParsed) => TxSegwit;
export declare const toTxSegwitParsed: (txSegwit: TxSegwit) => TxSegwitParsed;
export declare const toTxSegwitBase: (txSegwit: TxSegwit, witnessLocktimeHex: string) => TxSegwitBase;
