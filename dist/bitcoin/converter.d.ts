import { TxSegwit, TxSegwitBase, TxSegwitParsed } from "./models/Tx";
export declare const toTxSegwit: (txSegwitParsed: TxSegwitParsed) => TxSegwit;
export declare const toTxSegwitParsed: (txSegwit: TxSegwit) => TxSegwitParsed;
export declare const toTxSegwitBase: (txSegwit: TxSegwit, witnessLocktimeHex: string) => TxSegwitBase;
