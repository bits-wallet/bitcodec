import { MessageStructure } from "./models/p2p/MessageStructure";
export declare const MessageStructureCodec: {
    decode: (hex: string) => MessageStructure<string>;
    encode: (obj: MessageStructure<string>) => string;
};
