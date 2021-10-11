import { TxCodec } from "./bitcoin/TxCodec";
declare const HeaderCodec: {
    decode: (hex: string) => any;
    encode: (obj: any) => any;
};
export { HeaderCodec, TxCodec, };
