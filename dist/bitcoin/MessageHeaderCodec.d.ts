import { MessageHeader } from "./models/p2p/MessageHeader";
export declare const MessageHeaderCodec: {
    decode: (hex: string) => MessageHeader<string>;
    encode: (obj: MessageHeader<string>) => string;
};
