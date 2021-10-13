/// <reference types="node" />
import { MessageHeader } from "./MessageHeader";
export declare type PingPongPayload = {
    nonce: Buffer;
};
export interface PingPongMessage extends MessageHeader<PingPongPayload> {
}
