import { MessageHeader } from "./models/MessageHeader";
export declare const MessageHeaderCodec: {
    decode: (hex: string) => MessageHeader;
    encode: (obj: MessageHeader) => string;
};
