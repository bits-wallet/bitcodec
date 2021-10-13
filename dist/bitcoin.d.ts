import { VersionCodec } from "./bitcoin/VersionCodec";
import { TxCodec } from "./bitcoin/TxCodec";
declare const HeaderCodec: {
    decode: (hex: string) => import("./bitcoin/models/p2p/MessageHeader").MessageHeader<string>;
    encode: (obj: import("./bitcoin/models/p2p/MessageHeader").MessageHeader<string>) => string;
};
export { /* BlockCodec, BlockHeaderCodec, */ HeaderCodec, VersionCodec, TxCodec };
