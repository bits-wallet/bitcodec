/// <reference types="node" />
import { MessageHeader } from "./MessageHeader";
declare type Addr = {
    services: Buffer;
    iPAddress: string;
    port: number;
};
export declare type VersionPayload = {
    version: number;
    services: Buffer;
    timestamp: number;
    addrRecv: Addr;
    addrTrans: Addr;
    nonce: Buffer;
    userAgent: string;
    startHeight: number;
    relay: boolean;
};
export interface VersionMessage extends MessageHeader<VersionPayload> {
}
export {};
