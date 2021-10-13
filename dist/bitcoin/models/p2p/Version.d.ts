/// <reference types="node" />
import { MessageStructure } from "./MessageStructure";
declare type Addr = {
    services: Buffer;
    iPAddress: string;
    port: number;
};
export declare type Version = {
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
export interface VersionMessage extends MessageStructure<Version> {
}
export {};
