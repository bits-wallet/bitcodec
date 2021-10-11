import { TxCodec } from "./bitcoin/TxCodec";
declare const HeaderCodec: {
    decode: (hex: string) => import("./bitcoin/models/MessageHeader").MessageHeader;
    encode: (obj: import("./bitcoin/models/MessageHeader").MessageHeader) => string;
};
export { HeaderCodec, TxCodec, };
