/// <reference types="node" />
export declare type Version = {
    version: number;
    services: Buffer;
    timestamp: number;
    addrRecvServices: Buffer;
    addrRecvIPAddress: string;
    addrRecvPort: number;
    addrTransServices: Buffer;
    addrTransIPAddress: string;
    addrTransPort: number;
    nonce: number;
    userAgent: string;
    startHeight: number;
    relay: boolean;
};
